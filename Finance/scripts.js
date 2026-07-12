// ============================================
//  主題切換（深色 / 白天）
// ============================================
function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'light' ? '' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ============================================
//  全域狀態
// ============================================
let stocks = [];

// ============================================
//  抓取股票資料
// ============================================
async function fetchStockData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_repo.txt');
        const data = await response.json();

        stocks = [];
        for (let market in data) {
            for (let stockCode in data[market]) {
                const stock = data[market][stockCode];
                stocks.push({
                    name: stock.Name,
                    code: stockCode,
                    shares: stock.Shares,
                    currentPrice: stock.CurrentPrice,
                    cost: stock.Cost,
                    market: market
                });
            }
        }

        updateDashboard();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// ============================================
//  抓取最後更新時間
// ============================================
async function fetchLastUpdateTime() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_repo_log.txt');
        const data = await response.text();
        const cleanData = data.replace('\n', '').replace(' ', ' ');
        document.getElementById('last-update-time').textContent = `Updated ${cleanData}`;
    } catch (error) {
        console.error('Error fetching update time:', error);
    }
}

// ============================================
//  更新總覽（Hero）
// ============================================
function updateDashboard() {
    let totalMarketValue = 0;
    let totalCost = 0;

    stocks.forEach(stock => {
        totalMarketValue += stock.shares * stock.currentPrice;
        totalCost += stock.shares * stock.cost;
    });

    const totalReturn = totalMarketValue - totalCost;
    const returnPercentage = totalCost > 0 ? ((totalReturn / totalCost) * 100).toFixed(2) : 0;
    const gainClass = totalReturn >= 0 ? 'profit' : 'loss';

    // 總市值
    document.getElementById('total-market-value').textContent = `$${formatNumber(totalMarketValue)}`;

    // 總成本
    document.getElementById('total-cost').textContent = `$${formatNumber(totalCost)}`;

    // 報酬總額（括號內附報酬率）
    const returnEl = document.getElementById('total-return');
    returnEl.innerHTML = `$${formatNumber(totalReturn)} <span class="stat-sub">(${formatNumber(returnPercentage, 2)}%)</span>`;
    returnEl.className = `stat-value ${gainClass}`;

    updateAllocation(totalMarketValue);
    updateHoldingsList();
}

// ============================================
//  更新投資比重（總覽）
// ============================================
function updateAllocation(totalMarketValue) {
    const bar = document.getElementById('allocation-bar');
    const legend = document.getElementById('allocation-legend');
    bar.innerHTML = '';
    legend.innerHTML = '';

    if (totalMarketValue <= 0) return;

    const sorted = [...stocks]
        .map(s => ({
            code: s.code,
            name: s.name,
            weight: (s.shares * s.currentPrice / totalMarketValue) * 100
        }))
        .sort((a, b) => b.weight - a.weight);

    sorted.forEach((item, i) => {
        // 橘 → 金 之間插值：比重最大的最接近主色橘
        const color = rampColor(i, sorted.length);

        const seg = document.createElement('span');
        seg.className = 'allocation-seg';
        seg.style.width = `${item.weight}%`;
        seg.style.background = color;
        seg.title = `${item.name} ${item.weight.toFixed(1)}%`;
        bar.appendChild(seg);

        const tag = document.createElement('span');
        tag.className = 'legend-item';
        tag.innerHTML = `
            <i style="background: ${color}"></i>
            <b>${item.code}</b>
            <em>${formatNumber(item.weight, 1)}%</em>
        `;
        legend.appendChild(tag);
    });
}

// 在 bird-orange (#FF4500) 與 bird-gold (#FFB300) 之間取色
function rampColor(index, total) {
    const t = total <= 1 ? 0 : index / (total - 1);
    const from = [255, 69, 0];
    const to = [255, 179, 0];
    const rgb = from.map((c, i) => Math.round(c + (to[i] - c) * t));
    return `rgb(${rgb.join(', ')})`;
}

// ============================================
//  更新持股列表
//  階層：市值（主） → 報酬（次） → 股數/現價/成本（輔）
// ============================================
function updateHoldingsList() {
    const holdingsList = document.getElementById('holdings-list');
    holdingsList.innerHTML = '';

    // 依市值由大到小排序，重點部位自然排在最上面
    const sorted = [...stocks].sort(
        (a, b) => b.shares * b.currentPrice - a.shares * a.currentPrice
    );

    sorted.forEach(stock => {
        const marketValue = stock.shares * stock.currentPrice;
        const cost = stock.shares * stock.cost;
        const profitLoss = marketValue - cost;
        const profitLossPct = cost > 0 ? (profitLoss / cost) * 100 : 0;
        const gainClass = profitLoss >= 0 ? 'profit' : 'loss';

        const card = document.createElement('div');
        card.className = 'holding-card';
        card.innerHTML = `
            <div class="row-label">
                <span class="market-tag">${stock.market}</span>
                <div class="holding-code">${stock.code}</div>
            </div>
            <div class="row-content">
                <h3>${stock.name}</h3>

                <div class="holding-figures">
                    <span class="holding-value">$${formatNumber(marketValue)}</span>
                    <span class="holding-return ${gainClass}">
                        ${profitLoss >= 0 ? '+' : '−'}$${formatNumber(Math.abs(profitLoss))} (${formatSigned(profitLossPct, 2)}%)
                    </span>
                </div>

                <div class="holding-meta">
                    <span><em>Shares</em>${formatNumber(stock.shares, shareDecimals(stock.market))}</span>
                    <span><em>Price</em>${formatNumber(stock.currentPrice, 2)}</span>
                    <span><em>Cost</em>${formatNumber(stock.cost, 2)}</span>
                </div>
            </div>
        `;
        holdingsList.appendChild(card);
    });
}

// 美股可有零股，股數取到小數點後兩位；台股取整數
function shareDecimals(market) {
    return String(market).toUpperCase() === 'US' ? 2 : 0;
}

// ============================================
//  數字格式化（千分位）
// ============================================
function formatNumber(number, decimals = 0) {
    return Number(number).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// 帶正負號的格式化（漲時補上 +）
function formatSigned(number, decimals = 0) {
    return Number(number).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        signDisplay: 'exceptZero'
    });
}

// ============================================
//  初始化
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    fetchStockData();
    fetchLastUpdateTime();
});