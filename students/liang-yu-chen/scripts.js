/**
 * === 家教基本資料設定區 ===
 */
const STUDENT_NAME = '陳亮宇'; // 學生姓名，請自行修改

// 上個月的家教費是否已經收到款項？
// 收到款項後手動改成 true；進入下一個月開始請款時，再把新的「上個月」改回 false
const LAST_MONTH_PAID = true;

/**
 * === 上課紀錄區 ===
 * 每次上完課，在陣列後面新增一筆紀錄即可，順序不影響顯示（會自動依日期排序）
 * date:     上課日期 (格式 YYYY-MM-DD)
 * timeSlot: 上課時段 (例如 '19:00 - 21:00')
 * hours:    上課時數
 * mode:     'onsite' (實體) 或 'online' (線上)
 * price:    該堂課的價格 (元)
 */
const LESSON_RECORDS = [
    { date: '2026-06-25', timeSlot: '19:40 - 21:10', hours: 1.5, mode: 'onsite', price: 975 },
    { date: '2026-07-11', timeSlot: '19:00 - 21:00', hours: 2, mode: 'online', price: 1300 },
    { date: '2026-07-20', timeSlot: '19:00 - 21:00', hours: 2, mode: 'online', price: 1300 },
];

const MODE_LABEL = { onsite: '實體', online: '線上' };

function getMonthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthTitle(date) {
    return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
}

function formatDateShort(dateStr) {
    const [, m, d] = dateStr.split('-');
    return `${m}/${d}`;
}

function sumHours(records) {
    return records.reduce((acc, r) => acc + r.hours, 0);
}

function sumPrice(records) {
    return records.reduce((acc, r) => acc + r.price, 0);
}

function renderLessonList(containerId, records) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (records.length === 0) {
        container.innerHTML = `<div class="list-empty">尚無上課紀錄</div>`;
        return;
    }

    records.forEach(r => {
        const row = document.createElement('div');
        row.className = 'list-row';
        row.innerHTML = `
            <div class="cell cell-date">${formatDateShort(r.date)}</div>
            <div class="cell cell-time">${r.timeSlot}</div>
            <div class="cell cell-hours">${r.hours} 小時</div>
            <div class="cell cell-mode"><span class="mode-tag ${r.mode}">${MODE_LABEL[r.mode] || r.mode}</span></div>
            <div class="cell cell-price">${r.price.toLocaleString()} 元</div>
        `;
        container.appendChild(row);
    });
}

function calculateDashboard() {
    document.getElementById('student-name').innerText = STUDENT_NAME;
    document.title = `課程時數紀錄 - ${STUDENT_NAME}`;

    const now = new Date();
    const thisMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthKey = getMonthKey(thisMonthDate);
    const lastMonthKey = getMonthKey(lastMonthDate);

    const parsedRecords = LESSON_RECORDS
        .map(r => ({ ...r, _date: new Date(r.date) }))
        .sort((a, b) => a.date.localeCompare(b.date));

    const thisMonthRecords = parsedRecords.filter(r => getMonthKey(r._date) === thisMonthKey);
    const lastMonthRecords = parsedRecords.filter(r => getMonthKey(r._date) === lastMonthKey);

    const thisMonthHours = sumHours(thisMonthRecords);
    const lastMonthHours = sumHours(lastMonthRecords);
    const thisMonthAmount = sumPrice(thisMonthRecords);
    const lastMonthAmount = sumPrice(lastMonthRecords);

    // 這個月還在進行中，還沒有到請款的時候；上個月則依 LAST_MONTH_PAID 顯示已付款/未付款
    const thisMonthStatusText = '進行中';
    const thisMonthStatusClass = 'progress';
    const lastMonthStatusText = LAST_MONTH_PAID ? '已付款' : '未付款';
    const lastMonthStatusClass = LAST_MONTH_PAID ? 'paid' : 'unpaid';

    // 更新 Header 區塊
    document.getElementById('this-month-hours').innerText = `${thisMonthHours} 小時`;
    document.getElementById('last-month-hours').innerText = `${lastMonthHours} 小時`;
    document.getElementById('this-month-amount').innerText = `${thisMonthAmount.toLocaleString()} 元`;
    document.getElementById('last-month-amount').innerText = `${lastMonthAmount.toLocaleString()} 元`;
    document.getElementById('this-month-status-hero').innerHTML =
        `<span class="status-badge ${thisMonthStatusClass}">${thisMonthStatusText}</span>`;
    document.getElementById('last-month-status-hero').innerHTML =
        `<span class="status-badge ${lastMonthStatusClass}">${lastMonthStatusText}</span>`;

    // 更新這個月明細
    document.getElementById('this-month-title').innerText = getMonthTitle(thisMonthDate);
    document.getElementById('this-month-total-hours').innerText = thisMonthHours;
    document.getElementById('this-month-total-amount').innerText = thisMonthAmount.toLocaleString();
    document.getElementById('this-month-status-badge').innerHTML =
        `<span class="status-badge ${thisMonthStatusClass}">${thisMonthStatusText}</span>`;
    renderLessonList('this-month-list', thisMonthRecords);

    // 更新上個月明細
    document.getElementById('last-month-title').innerText = getMonthTitle(lastMonthDate);
    document.getElementById('last-month-total-hours').innerText = lastMonthHours;
    document.getElementById('last-month-total-amount').innerText = lastMonthAmount.toLocaleString();
    document.getElementById('last-month-status-badge').innerHTML =
        `<span class="status-badge ${lastMonthStatusClass}">${lastMonthStatusText}</span>`;
    renderLessonList('last-month-list', lastMonthRecords);
}

/**
 * 主題切換邏輯
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? '' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    calculateDashboard();
});