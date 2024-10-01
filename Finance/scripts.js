// Global variable to store stock data
let stocks = [];
let portfolioChart;

// Fetch stock data from JSON file
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

function fetchLastUpdateTime() {
    fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_repo_log.txt')
        .then(response => {
            response.text().then(data => {
                data = data.replace('\n', '').replace(' ', '\n')
                document.getElementById('last-update-time').textContent = `Last update: ${data}`;
            });
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

function updateDashboard() {
    let totalMarketValue = 0;
    let totalCost = 0;

    const stockListElement = document.getElementById('stock-list');
    stockListElement.innerHTML = ''; // Clear existing content

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
            <div class="stock-info"><span style="font-weight: bold;">Market Value:</span> <span style="font-weight: bold;">$${formatNumber(marketValue)}</span></div>
            <div class="stock-info"><span style="font-weight: bold;">Inventory:</span> <span style="font-weight: bold;">${stock.shares}</span></div>
            <div class="stock-info"><span style="font-weight: bold;">Price:</span> <span style="font-weight: bold;">$${formatNumber(stock.currentPrice, 2)}</span></div>
            <div class="stock-info"><span style="font-weight: bold;">Cost:</span> <span style="font-weight: bold;">$${formatNumber(stock.cost, 2)}</span></div>
            <div class="stock-info"><span style="font-weight: bold;">Return:</span> <span class="${profitLoss >= 0 ? 'profit' : 'loss'}" style="font-weight: bold;">$${formatNumber(profitLoss)}</span></div>
            <div class="stock-info"><span style="font-weight: bold;">Profit and Loss:</span> <span class="${profitLoss >= 0 ? 'profit' : 'loss'}" style="font-weight: bold;">${profitLossPercentage}%</span></div>
        `;

        stockListElement.appendChild(stockElement);
    });

    const totalProfitLoss = totalMarketValue - totalCost;
    const totalProfitLossPercentage = ((totalProfitLoss / totalCost) * 100).toFixed(2);

    document.getElementById('total-market-value').textContent = `$${formatNumber(totalMarketValue)}`;
    document.getElementById('total-cost').textContent = `$${formatNumber(totalCost)}`;
    document.getElementById('total-return').textContent = `$${formatNumber(totalProfitLoss)}`;
    document.getElementById('total-return').className = totalProfitLoss >= 0 ? 'profit' : 'loss';
    document.getElementById('total-profit-loss-percentage').textContent = `${totalProfitLossPercentage}%`;
    document.getElementById('total-profit-loss-percentage').className = totalProfitLoss >= 0 ? 'profit' : 'loss';
}

function updateChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');

    // Destroy the old chart instance if it exists
    if (portfolioChart) {
        portfolioChart.destroy();
    }

    const labels = stocks.map(stock => stock.name);
    const data = stocks.map(stock => stock.shares * stock.currentPrice);

    // Create a new chart and assign it to the global variable
    portfolioChart = new Chart(ctx, {
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
                    text: 'Portfolio Allocation',
                    font: {
                        size: 24
                    }
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

// Initially fetch stock data and update dashboard
fetchStockData();
fetchLastUpdateTime()

// Simulate real-time updates (update every 5 seconds)
// setInterval(fetchStockData, 5000);
