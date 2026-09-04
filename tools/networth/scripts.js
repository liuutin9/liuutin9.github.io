(function(){
  "use strict";
  const STORAGE_KEY = "assetLedger:scriptUrl";
  const NAV = [
    {id:"overview", label:"總覽", glyph:"總"},
    {id:"income", label:"收入", glyph:"收"},
    {id:"credit", label:"信用卡", glyph:"卡"},
    {id:"accounts", label:"帳戶明細", glyph:"帳"}
  ];
  const ALLOC_COLORS = {"台幣":"var(--c1)","美元":"var(--c2)","台股":"var(--c3)","美股":"var(--c4)","加密貨幣":"var(--c5)"};

  let currentUrl = null;
  let currentView = "overview";

  const el = (id) => document.getElementById(id);
  const screens = ["setupScreen","loadingScreen","errorScreen"];
  function showScreen(name){
    screens.forEach(s => el(s).classList.toggle("hidden", s !== name));
    el("shell").classList.toggle("hidden", name !== null);
  }

  async function getStoredUrl(){
    try{ const res = await window.storage.get(STORAGE_KEY, false); return res && res.value ? res.value : null; }
    catch(e){ return null; }
  }
  async function setStoredUrl(url){
    try{ await window.storage.set(STORAGE_KEY, url, false); return true; } catch(e){ return false; }
  }

  function fmtTWD(n){
    if(n === null || n === undefined || n === "") return "—";
    const v = Number(n); const sign = v < 0 ? "-" : "";
    return sign + "NT$ " + Math.abs(v).toLocaleString("zh-TW", {maximumFractionDigits:0});
  }
  function fmtUSD(n){
    if(n === null || n === undefined || n === "") return "—";
    const v = Number(n); const sign = v < 0 ? "-" : "";
    return sign + "USD " + Math.abs(v).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  function fmtPercent(n){
    if(n === null || n === undefined || n === "") return null;
    let v = Number(n); if(Math.abs(v) < 1) v = v * 100;
    return v.toFixed(2) + "%";
  }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function row(name, amountText, opts){
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.className = "row";
    const left = document.createElement("div");
    left.innerHTML = '<span class="row-name">' + escapeHtml(name) + '</span>' +
      (opts.sub ? '<span class="row-sub">' + escapeHtml(opts.sub) + '</span>' : '');
    const right = document.createElement("div");
    right.className = "row-amount" + (opts.negative ? " neg" : "");
    right.textContent = amountText;
    wrap.appendChild(left); wrap.appendChild(right);
    return wrap;
  }
  function emptyRow(text){
    const p = document.createElement("div"); p.className = "row";
    p.innerHTML = '<span class="row-sub">' + escapeHtml(text) + '</span>';
    return p;
  }

  /* ---------- 導覽 ---------- */
  function buildNav(){
    const side = el("sideNavList"); const tab = el("tabbar");
    side.innerHTML = ""; tab.innerHTML = "";
    NAV.forEach(item => {
      const b1 = document.createElement("button");
      b1.className = "navitem"; b1.dataset.view = item.id;
      b1.innerHTML = '<span class="glyph">' + item.glyph + '</span><span>' + item.label + '</span>';
      b1.addEventListener("click", () => switchView(item.id));
      side.appendChild(b1);

      const b2 = document.createElement("button");
      b2.className = "tabitem"; b2.dataset.view = item.id;
      b2.innerHTML = '<span class="glyph">' + item.glyph + '</span><span>' + item.label + '</span>';
      b2.addEventListener("click", () => switchView(item.id));
      tab.appendChild(b2);
    });
  }

  function switchView(id){
    if(!NAV.find(n => n.id === id)) id = "overview";
    currentView = id;
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("hidden", v.id !== "view-" + id));
    document.querySelectorAll(".navitem,.tabitem").forEach(b => b.classList.toggle("active", b.dataset.view === id));
    el("topTitle").textContent = NAV.find(n => n.id === id).label;
    el("topSub").textContent = topSubtitleFor(id);
    document.querySelector(".main-inner").scrollTop = 0;
    window.scrollTo(0,0);
    if(history.replaceState) history.replaceState(null, "", "#" + id);
  }

  function topSubtitleFor(id){
    if(id === "overview") return el("sideTs").textContent;
    if(id === "income") return "獨立於資產總覽";
    if(id === "credit") return "獨立於資產配置";
    return "所有帳戶原始資料";
  }

  /* ---------- 互動折線圖：可按住拖動查看歷史數字 ---------- */
  function buildInteractiveChart(opts){
    const svg = el(opts.svgId), labelsEl = el(opts.labelsId), tooltip = el(opts.tooltipId);
    const wrap = svg.closest(".spark-wrap");
    const points = opts.points, stroke = opts.stroke, area = opts.area, formatFn = opts.formatFn;
    svg.innerHTML = ""; labelsEl.innerHTML = "";
    const oldDot = wrap.querySelector(".spark-dot");
    if(oldDot) oldDot.remove();
    tooltip.classList.remove("show");
    if(!points || points.length < 2) return;

    const vb = svg.viewBox.baseVal;
    const w = vb.width || 300, h = vb.height || 56, pad = 4;
    const values = points.map(p => Number(p.value) || 0);
    const min = Math.min(...values), max = Math.max(...values);
    const range = (max - min) || 1;
    const stepX = (w - pad*2) / (values.length - 1);
    const pts = values.map((v,i) => {
      const x = pad + i*stepX;
      const y = h - pad - ((v - min) / range) * (h - pad*2);
      return {x, y, label: points[i].label, value: points[i].value};
    });

    const ns = "http://www.w3.org/2000/svg";
    const pathD = pts.map((p,i) => (i===0?"M":"L") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");

    const areaEl = document.createElementNS(ns, "path");
    areaEl.setAttribute("d", pathD + " L" + pts[pts.length-1].x.toFixed(1) + "," + h + " L" + pts[0].x.toFixed(1) + "," + h + " Z");
    areaEl.setAttribute("fill", area); areaEl.setAttribute("stroke", "none");
    svg.appendChild(areaEl);

    const lineEl = document.createElementNS(ns, "path");
    lineEl.setAttribute("d", pathD); lineEl.setAttribute("fill", "none");
    lineEl.setAttribute("stroke", stroke); lineEl.setAttribute("stroke-width", "1.6"); lineEl.setAttribute("vector-effect", "non-scaling-stroke");
    lineEl.setAttribute("stroke-linejoin", "round"); lineEl.setAttribute("stroke-linecap", "round");
    svg.appendChild(lineEl);

    const guideEl = document.createElementNS(ns, "line");
    guideEl.setAttribute("y1", pad); guideEl.setAttribute("y2", h);
    guideEl.setAttribute("stroke", stroke); guideEl.setAttribute("stroke-width", "1");
    guideEl.setAttribute("stroke-dasharray", "2,2"); guideEl.setAttribute("opacity", "0.5");
    guideEl.style.display = "none";
    svg.appendChild(guideEl);

    // 定位圓點用 HTML 覆蓋層畫（而非 SVG <circle>），因為 SVG 用 preserveAspectRatio="none"
    // 讓寬高做非等比縮放，圓形在裡面會被拉成橢圓；HTML div 用固定像素尺寸就不受影響。
    const dotEl = document.createElement("div");
    dotEl.className = "spark-dot";
    dotEl.style.background = opts.dotColor || stroke;
    wrap.appendChild(dotEl);

    function placeDot(idx){
      const p = pts[idx];
      dotEl.style.left = (p.x / w * 100) + "%";
      dotEl.style.top = (p.y / h * 100) + "%";
      return p;
    }
    placeDot(pts.length - 1);

    points.forEach((p,i) => {
      if(i !== 0 && i !== points.length - 1 && points.length > 5) return;
      const span = document.createElement("span");
      span.textContent = p.label;
      labelsEl.appendChild(span);
    });

    function updateTooltip(clientX){
      const rect = svg.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const svgX = frac * w;
      let idx = 0, best = Infinity;
      pts.forEach((p,i) => { const d = Math.abs(p.x - svgX); if(d < best){ best = d; idx = i; } });
      const p = placeDot(idx);
      guideEl.setAttribute("x1", p.x); guideEl.setAttribute("x2", p.x);
      guideEl.style.display = "block";

      tooltip.textContent = p.label + "｜" + formatFn(p.value);
      tooltip.classList.add("show");
      // 用實際像素寬度夾住位置，避免拖到最左/右時文字跑出容器外
      const wrapRect = wrap.getBoundingClientRect();
      const rawLeft = (p.x / w) * wrapRect.width;
      const half = tooltip.offsetWidth / 2;
      const clampedLeft = Math.min(wrapRect.width - half - 2, Math.max(half + 2, rawLeft));
      tooltip.style.left = clampedLeft + "px";
    }

    let dragging = false;
    svg.addEventListener("pointerdown", e => {
      dragging = true;
      try{ svg.setPointerCapture(e.pointerId); }catch(_){}
      updateTooltip(e.clientX);
    });
    svg.addEventListener("pointermove", e => { if(dragging) updateTooltip(e.clientX); });
    function endDrag(e){
      if(!dragging) return;
      dragging = false;
      try{ svg.releasePointerCapture(e.pointerId); }catch(_){}
      guideEl.style.display = "none";
      tooltip.classList.remove("show");
      placeDot(pts.length - 1);
    }
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);
  }

  /* ---------- 甜甜圈圖 ---------- */
  function buildDonut(svgId, legendId, items){
    const svg = el(svgId), legend = el(legendId);
    svg.innerHTML = ""; legend.innerHTML = "";
    if(!items.length){ legend.appendChild(emptyRow("找不到資產配置資料")); return; }

    const total = items.reduce((s,i) => s + Math.abs(i.value), 0) || 1;
    const ns = "http://www.w3.org/2000/svg";
    const cx = 60, cy = 60, r = 46, sw = 16;
    const circumference = 2 * Math.PI * r;

    const track = document.createElementNS(ns, "circle");
    track.setAttribute("cx", cx); track.setAttribute("cy", cy); track.setAttribute("r", r);
    track.setAttribute("fill", "none"); track.setAttribute("stroke", "var(--rule)"); track.setAttribute("stroke-width", sw);
    svg.appendChild(track);

    const group = document.createElementNS(ns, "g");
    group.setAttribute("transform", "rotate(-90 " + cx + " " + cy + ")");
    svg.appendChild(group);

    let cumulative = 0;
    items.forEach(item => {
      const frac = Math.abs(item.value) / total;
      const len = frac * circumference;
      const seg = document.createElementNS(ns, "circle");
      seg.setAttribute("cx", cx); seg.setAttribute("cy", cy); seg.setAttribute("r", r);
      seg.setAttribute("fill", "none"); seg.setAttribute("stroke", item.color);
      seg.setAttribute("stroke-width", sw);
      seg.setAttribute("stroke-dasharray", len.toFixed(2) + " " + (circumference - len).toFixed(2));
      seg.setAttribute("stroke-dashoffset", (-cumulative).toFixed(2));
      group.appendChild(seg);
      cumulative += len;

      const lr = document.createElement("div");
      lr.className = "legend-row";
      lr.innerHTML = '<span class="swatch" style="background:' + item.color + '"></span>' +
        '<span class="lname">' + escapeHtml(item.name) + '</span>' +
        '<span class="lamt">' + fmtTWD(item.value) + '</span>' +
        '<span class="lpct">' + (frac*100).toFixed(1) + '%</span>';
      legend.appendChild(lr);
    });
  }

  /* ---------- 信用卡使用率圓環 ---------- */
  function buildCreditGauge(cards){
    const totalSpend = cards.reduce((s,c) => s + Math.abs(Number(c["消費金額"]) || 0), 0);
    const totalLimit = cards.reduce((s,c) => s + (Number(c["額度"]) || 0), 0);
    const pct = totalLimit ? (totalSpend / totalLimit * 100) : 0;

    el("creditGaugePct").textContent = pct.toFixed(1) + "%";
    el("creditGaugeFigures").textContent = fmtTWD(totalSpend) + " / " + fmtTWD(totalLimit);

    const color = pct >= 80 ? "var(--stamp)" : pct >= 50 ? "var(--gold)" : "var(--seal)";
    const svg = el("creditGaugeSvg");
    svg.innerHTML = "";
    const ns = "http://www.w3.org/2000/svg";
    const cx = 60, cy = 60, r = 46, sw = 16;
    const circumference = 2 * Math.PI * r;
    const len = Math.min(1, pct/100) * circumference;

    const track = document.createElementNS(ns, "circle");
    track.setAttribute("cx", cx); track.setAttribute("cy", cy); track.setAttribute("r", r);
    track.setAttribute("fill", "none"); track.setAttribute("stroke", "var(--rule)"); track.setAttribute("stroke-width", sw);
    svg.appendChild(track);

    const seg = document.createElementNS(ns, "circle");
    seg.setAttribute("cx", cx); seg.setAttribute("cy", cy); seg.setAttribute("r", r);
    seg.setAttribute("fill", "none"); seg.setAttribute("stroke", color); seg.setAttribute("stroke-width", sw);
    seg.setAttribute("stroke-linecap", "round");
    seg.setAttribute("stroke-dasharray", len.toFixed(2) + " " + (circumference - len).toFixed(2));
    seg.setAttribute("transform", "rotate(-90 " + cx + " " + cy + ")");
    svg.appendChild(seg);
  }

  /* ---------- 總覽 ---------- */
  function renderOverview(overview){
    const totalEntry = (overview.assets || []).find(a => a.name === "總額");
    el("totalValue").textContent = totalEntry ? fmtTWD(totalEntry.amount) : "—";

    const monthly = overview.monthly || [];
    const lastMonth = monthly[monthly.length - 1];
    const asOf = lastMonth ? "截至 " + lastMonth.month : "—";
    el("sideTs").textContent = asOf;
    if(currentView === "overview") el("topSub").textContent = asOf;

    const deltaEl = el("totalDelta");
    if(lastMonth && lastMonth.growth !== "" && lastMonth.growth !== null && lastMonth.growth !== undefined){
      const pct = fmtPercent(lastMonth.growth);
      const num = parseFloat(pct);
      deltaEl.textContent = "較上月 " + (num > 0 ? "+" : "") + pct;
      deltaEl.className = "total-delta " + (num > 0 ? "up" : num < 0 ? "down" : "flat");
    } else {
      deltaEl.textContent = "尚無比較資料";
      deltaEl.className = "total-delta flat";
    }

    buildInteractiveChart({
      svgId:"sparkSvg", labelsId:"sparkLabels", tooltipId:"sparkTooltip",
      points: monthly.map(m => ({label: m.month, value: m.total})),
      stroke:"#E9E3CE", area:"rgba(233,227,206,0.12)", formatFn: fmtTWD
    });

    const items = (overview.assets || [])
      .filter(a => ALLOC_COLORS[a.name])
      .map(a => ({name: a.name, value: Number(a.amount) || 0, color: ALLOC_COLORS[a.name]}));
    buildDonut("donutSvg", "donutLegend", items);
  }

  /* ---------- 收入 ---------- */
  function renderIncome(income){
    const months = ((income && income.months) || []).filter(m => m.sources && m.sources.length);
    const latest = months[months.length - 1];

    buildInteractiveChart({
      svgId:"incomeSparkSvg", labelsId:"incomeSparkLabels", tooltipId:"incomeSparkTooltip",
      points: months.map(m => ({
        label: m.month,
        value: m.monthTotal !== null && m.monthTotal !== undefined ? m.monthTotal : m.sources.reduce((s,x) => s + (Number(x.amount)||0), 0)
      })),
      stroke:"#2F6F52", area:"rgba(47,111,82,0.10)", formatFn: fmtTWD
    });

    const list = el("incomeList");
    list.innerHTML = "";
    if(!latest){
      el("incomeTitle").textContent = "本月收入";
      el("incomeCurrentHeading").textContent = "本月明細";
      list.appendChild(emptyRow("本月尚無收入紀錄"));
    } else {
      el("incomeTitle").textContent = "收入（" + latest.month + "）";
      el("incomeCurrentHeading").textContent = latest.month + " 明細";
      latest.sources.forEach(s => list.appendChild(row(s.name, fmtTWD(s.amount))));
      const total = latest.monthTotal !== null && latest.monthTotal !== undefined ? latest.monthTotal : latest.sources.reduce((s,x) => s + (Number(x.amount)||0), 0);
      const totalRow = row("本月合計", fmtTWD(total));
      totalRow.style.borderTop = "1px solid var(--rule)"; totalRow.style.marginTop = "2px"; totalRow.style.fontWeight = "600";
      list.appendChild(totalRow);
    }

    const hist = el("incomeHistory");
    hist.innerHTML = "";
    if(!months.length){ hist.appendChild(emptyRow("尚無歷史紀錄")); return; }
    months.slice().reverse().forEach(m => {
      const total = m.monthTotal !== null && m.monthTotal !== undefined ? m.monthTotal : m.sources.reduce((s,x) => s + (Number(x.amount)||0), 0);
      const r = document.createElement("div");
      r.className = "history-row";
      r.innerHTML = '<span class="m">' + escapeHtml(m.month) + '</span><span class="v">' + fmtTWD(total) + '</span>';
      hist.appendChild(r);
    });
  }

  /* ---------- 信用卡 ---------- */
  function renderCredit(cards){
    cards = cards || [];
    buildCreditGauge(cards);
    const list = el("creditList");
    list.innerHTML = "";
    if(!cards.length){ list.appendChild(emptyRow("目前沒有資料")); return; }
    cards.forEach(c => {
      const name = c["銀行"];
      const spend = Number(c["消費金額"]) || 0;
      const limit = Number(c["額度"]) || 0;
      const util = c["信用額度使用率"];
      const box = document.createElement("div");
      box.appendChild(row(name, fmtTWD(spend) + (limit ? " / " + fmtTWD(limit) : ""), {negative: spend < 0}));
      const track = document.createElement("div"); track.className = "bar-track";
      const fill = document.createElement("div"); fill.className = "bar-fill";
      const pct = fmtPercent(util);
      const pctNum = pct ? parseFloat(pct) : (limit ? Math.abs(spend) / limit * 100 : 0);
      fill.style.width = Math.min(100, pctNum) + "%";
      if(pctNum >= 80) fill.style.background = "var(--stamp)";
      track.appendChild(fill); box.appendChild(track);
      list.appendChild(box);
    });
  }

  /* ---------- 帳戶明細 ---------- */
  function renderSimpleList(containerId, records, opts){
    opts = opts || {};
    const list = el(containerId);
    list.innerHTML = "";
    const totalEl = opts.totalId ? el(opts.totalId) : null;
    if(!records || !records.length){
      list.appendChild(emptyRow("目前沒有資料"));
      if(totalEl) totalEl.textContent = "—";
      return;
    }
    let sum = 0;
    records.forEach(rec => {
      const keys = Object.keys(rec);
      const nameKey = keys[0];
      const name = rec[nameKey];
      const amountKey = opts.usd ? keys.find(k => k !== nameKey) : keys[1];
      const amt = Number(rec[amountKey]) || 0;
      sum += amt;
      list.appendChild(row(name, opts.usd ? fmtUSD(amt) : fmtTWD(amt), {negative: amt < 0}));
    });
    if(totalEl) totalEl.textContent = "合計 " + (opts.usd ? fmtUSD(sum) : fmtTWD(sum));
  }

  function renderDashboard(data){
    renderOverview(data.overview || {});
    renderIncome(data.income || {});
    renderCredit(data.creditCards);
    renderSimpleList("twdList", data.twdAccounts, {totalId:"twdTotal"});
    renderSimpleList("twStockList", data.twStocks, {totalId:"twStockTotal"});
    renderSimpleList("usStockList", data.usStocks, {usd:true, totalId:"usStockTotal"});
    renderSimpleList("cryptoList", data.crypto, {usd:true, totalId:"cryptoTotal"});

    if(data.updatedAt){
      const d = new Date(data.updatedAt);
      const ts = "更新於 " + d.toLocaleString("zh-TW", {month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit"});
      document.querySelectorAll(".ts-footer").forEach(elx => elx.textContent = ts);
    }

    const hash = (location.hash || "").replace("#","");
    switchView(NAV.find(n => n.id === hash) ? hash : currentView);
    showScreen(null);
  }

  async function loadData(url){
    showScreen("loadingScreen");
    try{
      const res = await fetch(url, {method:"GET"});
      if(!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      renderDashboard(data);
    }catch(err){
      el("errorMessage").textContent = "無法從你的 Apps Script 網址取得資料，請確認已完成部署、存取權限設為「任何人」，且網址正確。";
      el("errorDetail").textContent = String(err && err.message ? err.message : err);
      el("errorDetail").classList.remove("hidden");
      showScreen("errorScreen");
    }
  }

  function init(){
    buildNav();

    el("saveUrlBtn").addEventListener("click", async () => {
      const val = el("urlInput").value.trim();
      if(!val || !/^https:\/\/script\.google(usercontent)?\.com\//.test(val)){
        el("setupHint").textContent = "這個網址看起來不太對，請確認是從「部署 → 網頁應用程式」複製來的完整網址。";
        return;
      }
      currentUrl = val;
      await setStoredUrl(val);
      loadData(val);
    });

    el("retryBtn").addEventListener("click", () => { if(currentUrl) loadData(currentUrl); });
    el("changeUrlBtn").addEventListener("click", () => {
      el("urlInput").value = currentUrl || ""; el("setupHint").textContent = ""; showScreen("setupScreen");
    });
    el("gearBtn").addEventListener("click", () => {
      el("urlInput").value = currentUrl || ""; el("setupHint").textContent = ""; showScreen("setupScreen");
    });
    el("refreshBtn").addEventListener("click", () => { if(currentUrl) loadData(currentUrl); });

    getStoredUrl().then(url => {
      if(url){ currentUrl = url; loadData(url); } else { showScreen("setupScreen"); }
    });
  }

  init();
})();
