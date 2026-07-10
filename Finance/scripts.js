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

    // 報酬總額
    const returnEl = document.getElementById('total-return');
    returnEl.textContent = `$${formatNumber(totalReturn)}`;
    returnEl.className = `stat-value ${gainClass}`;

    // 報酬率
    const pctEl = document.getElementById('total-profit-loss-percentage');
    pctEl.textContent = `${formatNumber(returnPercentage, 2)}%`;
    pctEl.className = `stat-value ${gainClass}`;

    updateHoldingsList();
}

// ============================================
//  更新持股列表
// ============================================
function updateHoldingsList() {
    const holdingsList = document.getElementById('holdings-list');
    holdingsList.innerHTML = '';

    stocks.forEach(stock => {
        const marketValue = stock.shares * stock.currentPrice;
        const cost = stock.shares * stock.cost;
        const profitLoss = marketValue - cost;
        const profitLossPercentage = cost > 0 ? ((profitLoss / cost) * 100).toFixed(2) : 0;
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
                <div class="metrics-grid">
                    <div class="metric">
                        <span class="metric-label">Market Value</span>
                        <span class="metric-value">$${formatNumber(marketValue)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Shares</span>
                        <span class="metric-value">${formatNumber(stock.shares)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Current Price</span>
                        <span class="metric-value">${formatNumber(stock.currentPrice, 2)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Cost Basis</span>
                        <span class="metric-value">$${formatNumber(stock.cost, 2)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Total Return</span>
                        <span class="metric-value ${gainClass}">$${formatNumber(profitLoss)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Return %</span>
                        <span class="metric-value ${gainClass}">${formatNumber(profitLossPercentage, 2)}%</span>
                    </div>
                </div>
            </div>
        `;
        holdingsList.appendChild(card);
    });
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
