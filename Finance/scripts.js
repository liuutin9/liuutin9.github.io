// 模擬股票數據
let stocks = [
    { name: "006208.TW", shares: 388, currentPrice: 100, cost: 80.09 },
    { name: "00692.TW", shares: 1489, currentPrice: 100, cost: 31.11 },
    { name: "00878.TW", shares: 355, currentPrice: 100, cost: 21.11 },
    { name: "2890.TW", shares: 3975, currentPrice: 100, cost: 16.9 },
    { name: "2891.TW", shares: 400, currentPrice: 100, cost: 33.25 },
    { name: "VT", shares: 25.99646, currentPrice: 100, cost: 3309.07 },
    { name: "BND", shares: 10.930935, currentPrice: 100, cost: 2244.27 },
];

// 獲取股票價格的函數
function fetchStockPrices() {
    fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_price.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n');
            lines.forEach(line => {
                const [stockName, stockPrice] = line.split(',');
                // 更新相應的股票價格
                const stock = stocks.find(s => s.name === stockName);
                if (stock) {
                    stock.currentPrice = parseFloat(stockPrice);
                }
            });
            updateDashboard(); // 更新畫面
        })
        .catch(error => console.error('Error fetching stock prices:', error));
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
            <div class="stock-info"><span>目前市值:</span> <span>$${marketValue.toLocaleString()}</span></div>
            <div class="stock-info"><span>目前庫存:</span> <span>${stock.shares}</span></div>
            <div class="stock-info"><span>現價:</span> <span>$${stock.currentPrice}</span></div>
            <div class="stock-info"><span>成本:</span> <span>$${stock.cost}</span></div>
            <div class="stock-info"><span>損益:</span> <span class="${profitLoss >= 0 ? 'profit' : 'loss'}">${profitLoss.toFixed(0)}(${profitLossPercentage}%)</span></div>
        `;

        stockListElement.appendChild(stockElement);
    });

    const totalProfitLoss = (totalMarketValue - totalCost);
    const totalProfitLossPercentage = (((totalMarketValue - totalCost) / totalCost) * 100).toFixed(2);

    document.getElementById('total-market-value').textContent = `$${totalMarketValue.toLocaleString()}`;
    document.getElementById('total-cost').textContent = `$${totalCost.toLocaleString()}`;
    document.getElementById('total-profit-loss-percentage').textContent = `${totalProfitLoss.toFixed(0)}(${totalProfitLossPercentage}%)`;
    document.getElementById('total-profit-loss-percentage').className = totalProfitLossPercentage >= 0 ? 'profit' : 'loss';
}

// 初始獲取股票價格並更新 dashboard
fetchStockPrices();

// 模擬實時更新（每5秒更新一次）
setInterval(fetchStockPrices, 5000);
