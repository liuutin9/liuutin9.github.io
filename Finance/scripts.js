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
            <div class="stock-info"><span>目前市值:</span> <span>$${parseFloat(marketValue.toFixed(0)).toLocaleString()}</span></div>
            <div class="stock-info"><span>目前庫存:</span> <span>${stock.shares.toLocaleString()}</span></div>
            <div class="stock-info"><span>現價:</span> <span>$${parseFloat(stock.currentPrice.toFixed(2)).toLocaleString()}</span></div>
            <div class="stock-info"><span>成本:</span> <span>$${parseFloat(stock.cost.toFixed(2)).toLocaleString()}</span></div>
            <div class="stock-info"><span>損益:</span> <span class="${profitLoss >= 0 ? 'profit' : 'loss'}">$${parseFloat(profitLoss.toFixed(0)).toLocaleString()}(${profitLossPercentage}%)</span></div>
        `;

        stockListElement.appendChild(stockElement);
    });

    const totalProfitLoss = (totalMarketValue - totalCost);
    const totalProfitLossPercentage = (((totalMarketValue - totalCost) / totalCost) * 100).toFixed(2);

    document.getElementById('total-market-value').textContent = `$${parseFloat(totalMarketValue.toFixed(2)).toLocaleString()}`;
    document.getElementById('total-cost').textContent = `$${parseFloat(totalCost.toFixed(2)).toLocaleString()}`;
    document.getElementById('total-profit-loss-percentage').textContent = `$${parseFloat(totalProfitLoss.toFixed(0)).toLocaleString()}(${totalProfitLossPercentage}%)`;
    document.getElementById('total-profit-loss-percentage').className = totalProfitLossPercentage >= 0 ? 'profit' : 'loss';
}

// 初始獲取股票數據並更新 dashboard
fetchStockData();

// 模擬實時更新（每5秒更新一次）
setInterval(fetchStockData, 5000);