const STORAGE_KEY = 'ledgerApiUrl';
let API_URL = localStorage.getItem(STORAGE_KEY) || '';
let latestData = null;

// ---- 日期欄位（年／月／日 顯示順序）----
// 年：使用者自行輸入西元年，送出前驗證是合理的 4 位數字
// 月：1–12 下拉選單
// 日：下拉選單，選項會依照當前年份／月份動態調整（例如 2 月只給 28 或 29 天），避免選出不存在的日期
function daysInMonth(year, month){
    // month 是 1–12；用「下個月第 0 天」取得當月最後一天，會自動處理閏年
    return new Date(year, month, 0).getDate();
}

function populateDateSelects(){
    const monthSel = document.getElementById('f-month');
    monthSel.innerHTML = '';
    for (let m = 1; m <= 12; m++){
        const opt = document.createElement('option');
        opt.value = String(m).padStart(2,'0');
        opt.textContent = m + '月';
        monthSel.appendChild(opt);
    }

    refreshDayOptions();

    document.getElementById('f-year').addEventListener('input', refreshDayOptions);
    monthSel.addEventListener('change', refreshDayOptions);
}

// 依目前年／月重新產生「日」的選項，並盡量保留使用者原本選的日期
function refreshDayOptions(){
    const daySel = document.getElementById('f-day');
    const yearVal = parseInt(document.getElementById('f-year').value, 10);
    const monthVal = parseInt(document.getElementById('f-month').value, 10) || 1;
    const year = (yearVal && yearVal > 0) ? yearVal : new Date().getFullYear();
    const maxDay = daysInMonth(year, monthVal);
    const prevSelected = parseInt(daySel.value, 10) || 0;

    daySel.innerHTML = '';
    for (let d = 1; d <= maxDay; d++){
        const opt = document.createElement('option');
        opt.value = String(d).padStart(2,'0');
        opt.textContent = d + '日';
        daySel.appendChild(opt);
    }
    daySel.value = String(Math.min(prevSelected || 1, maxDay)).padStart(2,'0');
}

function setDateSelects(dateStr){
    // dateStr 格式 YYYY-MM-DD
    const parts = (dateStr || '').split('-');
    if (parts.length !== 3) return;
    document.getElementById('f-year').value = parseInt(parts[0], 10);
    document.getElementById('f-month').value = parts[1];
    refreshDayOptions();
    document.getElementById('f-day').value = parts[2];
}

// 回傳 { value, error }：value 是 YYYY-MM-DD 純文字（失敗時為 null），error 是要顯示的錯誤訊息
function getDateValue(){
    const yearRaw = document.getElementById('f-year').value.trim();
    const m = document.getElementById('f-month').value;
    const d = document.getElementById('f-day').value;

    if (!yearRaw || !/^\d{4}$/.test(yearRaw)){
        return { value: null, error: '年份請輸入 4 位數字（例如 2026）' };
    }
    const year = parseInt(yearRaw, 10);
    if (year < 1970 || year > 2200){
        return { value: null, error: '年份看起來不太合理，請確認一下' };
    }
    if (!m || !d){
        return { value: null, error: '請選擇月份與日期' };
    }
    return { value: year + '-' + m + '-' + d, error: null };
}

function fmtMoney(n){
    if (n === '' || n === null || n === undefined || isNaN(n)) return '—';
    return Number(n).toLocaleString('en-US', {maximumFractionDigits:2});
}
function fmtPct(n){
    if (n === '' || n === null || n === undefined || isNaN(n)) return '—';
    const v = Number(n) * 100;
    const sign = v > 0 ? '+' : '';
    return sign + v.toFixed(1) + '%';
}
function fmtReturnCombo(amount, rate){
    if (amount === null || amount === undefined || isNaN(amount) ||
        rate === null || rate === undefined || rate === '' || isNaN(rate)) return '—';
    const sign = amount > 0 ? '+' : '';
    const amtStr = sign + Number(amount).toLocaleString('en-US', {maximumFractionDigits:2});
    return amtStr + ' (' + fmtPct(rate) + ')';
}

function init(){
    populateDateSelects();
    setDateSelects(new Date().toISOString().slice(0,10));
    if (!API_URL){
        document.getElementById('gate').hidden = false;
        return;
    }
    document.getElementById('app').hidden = false;
    loadData();
}

function saveApiUrl(){
    const val = document.getElementById('gate-input').value.trim();
    const errEl = document.getElementById('gate-err');
    if (!val || !val.includes('script.google') || !val.endsWith('/exec')){
        errEl.classList.add('show');
        return;
    }
    errEl.classList.remove('show');
    localStorage.setItem(STORAGE_KEY, val);
    API_URL = val;
    document.getElementById('gate').hidden = true;
    document.getElementById('app').hidden = false;
    loadData();
}

function changeSource(){
    document.getElementById('app').hidden = true;
    document.getElementById('gate-input').value = API_URL;
    document.getElementById('gate').hidden = false;
}

function updateBodyScrollLock(){
    const addOpen = document.getElementById('add-overlay').classList.contains('open');
    const statusOpen = document.getElementById('status-overlay').classList.contains('open');
    document.body.style.overflow = (addOpen || statusOpen) ? 'hidden' : '';
}

function openAddPanel(){
    const overlay = document.getElementById('add-overlay');
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        overlay.classList.add('open');
        updateBodyScrollLock();
        });
    });
    setTimeout(() => document.getElementById('f-year').focus(), 60);
}

function closeAddPanel(){
    const overlay = document.getElementById('add-overlay');
    overlay.classList.remove('open');
    updateBodyScrollLock();
    setTimeout(() => { overlay.style.display = 'none'; }, 180);
}

function handleBackdropClick(e){
    if (e.target.id === 'add-overlay') closeAddPanel();
}

document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && document.getElementById('add-overlay').classList.contains('open')){
        closeAddPanel();
    }
    if (e.key === 'Escape' && document.getElementById('status-overlay').classList.contains('open') && statusState !== 'loading'){
        closeStatusModal();
    }
});

// ---- 狀態彈窗（確認 / 進度中 / 成功 / 錯誤）共用元件 ----
let statusState = null;
let statusAutoCloseTimer = null;

function showStatusModal(state, opts){
    opts = opts || {};
    clearTimeout(statusAutoCloseTimer);
    statusState = state;
    const overlay = document.getElementById('status-overlay');
    const panel = document.getElementById('status-panel');

    if (state === 'confirm'){
        panel.innerHTML =
        '<div class="status-icon warn">!</div>' +
        '<h2>' + (opts.title || '確定嗎？') + '</h2>' +
        '<p class="status-message">' + (opts.message || '') + '</p>' +
        '<div class="status-actions">' +
            '<button class="status-btn-secondary" id="status-cancel-btn">取消</button>' +
            '<button class="status-btn-danger" id="status-confirm-btn">' + (opts.confirmLabel || '確定') + '</button>' +
        '</div>';
        document.getElementById('status-cancel-btn').onclick = closeStatusModal;
        document.getElementById('status-confirm-btn').onclick = function(){
        if (opts.onConfirm) opts.onConfirm();
        };
    } else if (state === 'loading'){
        panel.innerHTML =
        '<div class="spinner"></div>' +
        '<p class="status-message">' + (opts.message || '處理中…') + '</p>';
    } else if (state === 'success'){
        panel.innerHTML =
        '<div class="status-icon success">✓</div>' +
        '<p class="status-message">' + (opts.message || '完成') + '</p>';
        statusAutoCloseTimer = setTimeout(closeStatusModal, 1100);
    } else if (state === 'error'){
        panel.innerHTML =
        '<div class="status-icon error">✕</div>' +
        '<p class="status-message">' + (opts.message || '發生錯誤，請稍後再試。') + '</p>' +
        '<div class="status-actions">' +
            '<button class="status-btn-secondary" id="status-ok-btn">知道了</button>' +
        '</div>';
        document.getElementById('status-ok-btn').onclick = closeStatusModal;
    }

    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        overlay.classList.add('open');
        updateBodyScrollLock();
        });
    });
}

function closeStatusModal(){
    clearTimeout(statusAutoCloseTimer);
    statusState = null;
    const overlay = document.getElementById('status-overlay');
    overlay.classList.remove('open');
    updateBodyScrollLock();
    setTimeout(() => { overlay.style.display = 'none'; }, 180);
}

function handleStatusBackdropClick(e){
    if (e.target.id !== 'status-overlay') return;
    if (statusState === 'loading') return; // 進行中不給從背景關閉
    closeStatusModal();
}

// ---- 刪除模式 ----
let deleteMode = false;

function enterDeleteMode(){
    deleteMode = true;
    document.body.classList.add('delete-mode');
    document.getElementById('delete-toggle').classList.add('active');
}

function exitDeleteMode(){
    if (!deleteMode) return;
    deleteMode = false;
    document.body.classList.remove('delete-mode');
    document.getElementById('delete-toggle').classList.remove('active');
}

function toggleDeleteMode(){
    if (deleteMode) exitDeleteMode();
    else enterDeleteMode();
}

// 點空白處（不是卡片、不是刪除按鈕、不是切換鈕本身）就退出刪除模式
document.addEventListener('click', function(e){
    if (!deleteMode) return;
    if (e.target.closest('.row, .row-delete-btn, #delete-toggle')) return;
    exitDeleteMode();
});

function deleteRecord(date, day){
    showStatusModal('confirm', {
        title: '刪除這筆紀錄？',
        message: '第 ' + day + ' 天（' + date + '）刪除後無法復原。',
        confirmLabel: '刪除',
        onConfirm: function(){ performDelete(date); }
    });
}

async function performDelete(date){
    showStatusModal('loading', { message: '刪除中…' });
    try{
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify({action: 'delete', date: date})
        });
        const result = await res.json();
        if (!result.success){
        showStatusModal('error', { message: result.error || '刪除失敗，請稍後再試。' });
        return;
        }
        await loadData();
        exitDeleteMode();
        showStatusModal('success', { message: '刪除成功' });
    }catch(err){
        showStatusModal('error', { message: '連不上你的 Apps Script，確認網址跟網路連線。' });
    }
}

async function loadData(){
    const rowsEl = document.getElementById('rows');
    rowsEl.innerHTML = '<div class="state">正在核對帳冊…</div>';
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        latestData = data;
        render(data);
    }catch(err){
        rowsEl.innerHTML = '<div class="state"><div class="big">讀取失敗</div>連不上你的 Apps Script 網址，確認網址正確、且部署權限是「Anyone」。</div>';
    }
}

function render(data){
    const init = data.init || {};
    const dailyRate = (init.dailyTargetRate === null || init.dailyTargetRate === undefined || init.dailyTargetRate === '')
        ? null : Number(init.dailyTargetRate);
    const records = (data.records || []).slice();
    const rowsEl = document.getElementById('rows');
    const rowCountEl = document.getElementById('row-count');

    if (records.length === 0){
        document.getElementById('day-eyebrow').textContent = '尚未開帳';
        document.getElementById('s-current').textContent = '—';
        document.getElementById('s-target').textContent = '—';
        document.getElementById('s-actual-return').textContent = '—';
        document.getElementById('s-target-return').textContent = '—';
        rowsEl.innerHTML = '<div class="state"><div class="big">還沒有任何紀錄</div>用上面的表單新增第一筆，帳本就會開始累積。</div>';
        rowCountEl.textContent = '';
        return;
    }

    // 由天數由小到大排序，第一筆的開合資產視為起始資產，最後一筆視為最新
    records.sort((a,b) => Number(a.day) - Number(b.day));
    const startingAsset = Number(records[0].openAsset) || null;

    // 每筆紀錄的累計目標資產／報酬率：起始資產 * (1 + 每日目標報酬率) ^ 天數
    // 這一步在前端算，後端只存原始資料
    const computed = records.map(r => {
        const day = Number(r.day);
        const targetAsset = (startingAsset && dailyRate != null)
        ? startingAsset * Math.pow(1 + dailyRate, day) : null;
        const targetReturnRate = (targetAsset != null && startingAsset)
        ? (targetAsset / startingAsset - 1) : null;
        return Object.assign({}, r, { targetAsset, targetReturnRate });
    });

    const latest = computed[computed.length - 1];

    document.getElementById('day-eyebrow').textContent = '第 ' + latest.day + ' 天';
    document.getElementById('s-current').textContent = fmtMoney(latest.closeAsset);
    document.getElementById('s-target').textContent = fmtMoney(latest.targetAsset);

    const actualReturn = startingAsset ? (Number(latest.closeAsset) / startingAsset - 1) : null;
    const targetReturnVal = latest.targetReturnRate;
    const actualAmount = startingAsset ? (Number(latest.closeAsset) - startingAsset) : null;
    const targetAmount = (startingAsset && latest.targetAsset != null) ? (latest.targetAsset - startingAsset) : null;

    const actualEl = document.getElementById('s-actual-return');
    actualEl.textContent = fmtReturnCombo(actualAmount, actualReturn);
    actualEl.className = 'value combo ' + (actualReturn == null ? '' : (actualReturn >= (targetReturnVal||0) ? 'jade' : 'brick'));

    document.getElementById('s-target-return').textContent = fmtReturnCombo(targetAmount, targetReturnVal);

    // 表單「開合資產」帶入最新一筆的結清資產
    const openField = document.getElementById('f-open');
    if (!openField.dataset.touched){
        openField.value = latest.closeAsset;
    }

    // 由新到舊呈現
    const display = computed.slice().reverse();
    rowCountEl.textContent = '共 ' + display.length + ' 筆';
    rowsEl.innerHTML = '';
    display.forEach((r, i) => {
        const dailyReturn = (Number(r.closeAsset) / Number(r.openAsset) - 1);
        const dailyAmount = Number(r.closeAsset) - Number(r.openAsset);
        const rowActual = startingAsset ? (Number(r.closeAsset) / startingAsset - 1) : null;
        const rowTarget = r.targetReturnRate;

        let vsClass = 'flat', vsText = '—';
        if (rowActual != null && rowTarget != null){
        const diff = rowActual - rowTarget;
        vsClass = diff >= 0 ? 'jade' : 'brick';
        vsText = (diff >= 0 ? '超前目標 ' : '落後目標 ') + Math.abs(diff*100).toFixed(1) + '%';
        }

        const wrap = document.createElement('div');
        wrap.className = 'row-wrap';
        wrap.style.animationDelay = (i * 0.02) + 's';
        wrap.innerHTML =
        '<button class="row-delete-btn" onclick="deleteRecord(\'' + r.date + '\', ' + r.day + ')">刪除</button>' +
        '<div class="row">' +
            '<div class="stamp">No.' + String(r.day).padStart(3,'0') + '</div>' +
            '<div class="date">' + r.date + '</div>' +
            '<div class="assets"><span class="assets-label">資產變化</span><span class="assets-value">' + fmtMoney(r.openAsset) + '<span class="arrow">→</span>' + fmtMoney(r.closeAsset) + '</span></div>' +
            '<div class="row-footer">' +
            '<div class="daily ' + (dailyReturn >= 0 ? 'jade' : 'brick') + '">' + fmtReturnCombo(dailyAmount, dailyReturn) + '</div>' +
            '<div class="vs-target ' + vsClass + '">' + vsText + '</div>' +
            '</div>' +
        '</div>';
        rowsEl.appendChild(wrap);
    });
    }

    document.getElementById('f-open').addEventListener('input', function(){
    this.dataset.touched = '1';
    });

    async function submitRecord(){
    const dateResult = getDateValue();
    const open = document.getElementById('f-open').value;
    const close = document.getElementById('f-close').value;
    const msg = document.getElementById('form-msg');

    msg.className = 'form-msg';
    if (dateResult.error){
        msg.textContent = dateResult.error;
        msg.classList.add('show','error');
        return;
    }
    if (open === '' || close === ''){
        msg.textContent = '開合資產、結清資產都要填。';
        msg.classList.add('show','error');
        return;
    }
    const date = dateResult.value;

    showStatusModal('loading', { message: '新增中…' });

    try{
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify({action: 'add', date: date, openAsset: Number(open), closeAsset: Number(close)})
        });
        const result = await res.json();

        if (!result.success){
        showStatusModal('error', { message: result.error || '寫入失敗，請稍後再試。' });
        return;
        }

        document.getElementById('f-close').value = '';
        document.getElementById('f-open').dataset.touched = '';
        await loadData();
        showStatusModal('success', { message: '第 ' + result.day + ' 天已記入帳本' });
        closeAddPanel();
    }catch(err){
        showStatusModal('error', { message: '連不上你的 Apps Script，確認網址跟網路連線。' });
    }
}

init();