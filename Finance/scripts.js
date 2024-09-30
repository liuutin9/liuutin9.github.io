// 全局變量來存儲股票數據
let stocks = [];

// 從 JSON 文件中獲取股票數據
function fetchStockData() {
    fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_repo.txt')
        .then(response => response.json())
        .then(data => {
            stocks = [];
            for (let market in data) {
                for (let stockCode in data[market]) {
                    const stock = data[market][stockCode];
                    stocks.push({
                        name: stock.Name,
                        shares: stock.shares,
                        currentPrice: stock.ClosingPrice,
                        cost: stock.cost
                    });
                }
            }
            updateDashboard();
            updateChart();
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

function updateDashboard() {
    let totalMarketValue = 0;
    let totalCost = 0;

    const stockListElement = document.getElementById('stock-list');
    stockListElement.innerHTML = ''; // 清空現有內容

    stocks.forEach(stock => {
        const marketValue = stock.shares * stock.currentPrice;
        const cost = stock.shares * stock.cost;
        const profitLoss = marketValue - cost;
        const profitLossPercentage = ((profitLoss / cost) * 100).toFixed(2);

        totalMarketValue += marketValue;
        totalCost += cost;

        const stockElement = document.createElement('div');
        stockElement.className = 'stock-item';
        stockElement.innerHTML = `
            <h3>${stock.name}</h3>
            <div class="stock-info"><span>目前市值:</span> <span>$${formatNumber(marketValue)}</span></div>
            <div class="stock-info"><span>目前庫存:</span> <span>${formatNumber(stock.shares)}</span></div>
            <div class="stock-info"><span>現價:</span> <span>$${formatNumber(stock.currentPrice, 2)}</span></div>
            <div class="stock-info"><span>成本:</span> <span>$${formatNumber(stock.cost, 2)}</span></div>
            <div class="stock-info"><span>損益:</span> <span class="${profitLoss >= 0 ? 'profit' : 'loss'}">$${formatNumber(profitLoss)}(${profitLossPercentage}%)</span></div>
        `;

        stockListElement.appendChild(stockElement);
    });

    const totalProfitLoss = totalMarketValue - totalCost;
    const totalProfitLossPercentage = ((totalProfitLoss / totalCost) * 100).toFixed(2);

    document.getElementById('total-market-value').textContent = `$${formatNumber(totalMarketValue)}`;
    document.getElementById('total-cost').textContent = `$${formatNumber(totalCost)}`;
    document.getElementById('total-profit-loss-percentage').textContent = `$${formatNumber(totalProfitLoss)}(${totalProfitLossPercentage}%)`;
    document.getElementById('total-profit-loss-percentage').className = totalProfitLoss >= 0 ? 'profit' : 'loss';
}

function updateChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    const labels = stocks.map(stock => stock.name);
    const data = stocks.map(stock => stock.shares * stock.currentPrice);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: generateColors(stocks.length),
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '投資組合分配'
                }
            }
        }
    });
}

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`hsl(${(i * 360) / count}, 70%, 60%)`);
    }
    return colors;
}

function formatNumber(number, decimals = 0) {
    return number.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// 初始獲取股票數據並更新 dashboard
fetchStockData();

// 模擬實時更新（每5秒更新一次）
setInterval(fetchStockData, 5000);