// Global variables
let stocks = [];
let portfolioChart;
let performanceChart;

// Fetch stock data
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
                    shares: stock.shares,
                    currentPrice: stock.ClosingPrice,
                    cost: stock.cost,
                    market: market
                });
            }
        }
        
        updateDashboard();
        // updateCharts();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Fetch last update time
async function fetchLastUpdateTime() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/liuutin9/Finance/refs/heads/main/stock_repo_log.txt');
        const data = await response.text();
        const cleanData = data.replace('\n', '').replace(' ', '\n');
        document.getElementById('last-update-time').textContent = `Last update: ${cleanData}`;
    } catch (error) {
        console.error('Error fetching update time:', error);
    }
}

// Update dashboard
function updateDashboard() {
    let totalMarketValue = 0;
    let totalCost = 0;

    stocks.forEach(stock => {
        const marketValue = stock.shares * stock.currentPrice;
        const cost = stock.shares * stock.cost;
        totalMarketValue += marketValue;
        totalCost += cost;
    });

    const totalReturn = totalMarketValue - totalCost;
    const returnPercentage = totalCost > 0 ? ((totalReturn / totalCost) * 100).toFixed(2) : 0;

    // ******************************************************
    // ******** 修正：確保數據寫入和顏色類別正確應用 ********
    // ******************************************************

    // 1. 更新總市值 (Main Market Value)
    document.getElementById('total-market-value').innerHTML = `$${formatNumber(totalMarketValue)}`;
    
    // 2. 更新總投入成本 (Total Investment)
    document.getElementById('total-cost').innerHTML = `$${formatNumber(totalCost)}`;
    console.log(`Total Cost: $${formatNumber(totalCost)}`);
    
    // 3. 更新報酬總額 (Total Return)
    const totalReturnElement = document.getElementById('total-return');
    // 使用 formatNumber 顯示數值 (會包含正負號，但 CSS 會用 color 覆蓋)
    totalReturnElement.innerHTML = `$${formatNumber(totalReturn)}`; 
    // 確保同時賦予 'value' 類別和 'profit/loss' 類別
    totalReturnElement.className = `value ${totalReturn >= 0 ? 'profit' : 'loss'}`;
    
    // 4. 更新報酬率 (Total Return Percentage)
    const returnPercentageElement = document.getElementById('total-profit-loss-percentage');
    // 使用 formatNumber 顯示數值 (會包含正負號)
    returnPercentageElement.innerHTML = `${formatNumber(returnPercentage, 2)}%`;
    // 確保同時賦予 'value' 類別和 'profit/loss' 類別
    returnPercentageElement.className = `value ${totalReturn >= 0 ? 'profit' : 'loss'}`;
    
    // ******************************************************
    
    // Update holdings list
    updateHoldingsList();
}

// Update holdings list
function updateHoldingsList() {
    const holdingsList = document.getElementById('holdings-list');
    holdingsList.innerHTML = '';

    stocks.forEach(stock => {
        const marketValue = stock.shares * stock.currentPrice;
        const cost = stock.shares * stock.cost;
        const profitLoss = marketValue - cost;
        const profitLossPercentage = cost > 0 ? ((profitLoss / cost) * 100).toFixed(2) : 0;

        const holdingCard = document.createElement('div');
        holdingCard.className = 'holding-card';
        holdingCard.innerHTML = `
            <div class="holding-header">
                <div class="holding-name">${stock.name}</div>
            </div>
            <div class="holding-details">
                <div class="detail-item">
                    <div class="detail-label">Market Value</div>
                    <div class="detail-value">$${formatNumber(marketValue)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Shares</div>
                    <div class="detail-value">${formatNumber(stock.shares)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Current Price</div>
                    <div class="detail-value">${formatNumber(stock.currentPrice, 2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Cost Basis</div>
                    <div class="detail-value">$${formatNumber(stock.cost, 2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Total Return</div>
                    <div class="detail-value ${profitLoss >= 0 ? 'profit' : 'loss'}">$${formatNumber(profitLoss)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Return %</div>
                    <div class="detail-value ${profitLoss >= 0 ? 'profit' : 'loss'}">${formatNumber(profitLossPercentage, 2)}%</div>
                </div>
            </div>
        `;
        holdingsList.appendChild(holdingCard);
    });
}

// Update charts
// function updateCharts() {
    // updatePortfolioChart();
    // updatePerformanceChart();
// }

// Update portfolio allocation chart
// function updatePortfolioChart() {
//     const ctx = document.getElementById('portfolioChart') ? document.getElementById('portfolioChart').getContext('2d') : null;
    
//     if (!ctx) return; 

//     if (portfolioChart) {
//         portfolioChart.destroy();
//     }

//     const labels = stocks.map(stock => stock.name);
//     const data = stocks.map(stock => stock.shares * stock.currentPrice);
//     const colors = generateModernColors(stocks.length);

//     portfolioChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: labels,
//             datasets: [{
//                 data: data,
//                 backgroundColor: colors,
//                 borderWidth: 2,
//                 borderColor: 'rgba(255, 255, 255, 0.1)'
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     position: 'bottom',
//                     labels: {
//                         color: 'rgba(52, 58, 64, 0.8)',
//                         usePointStyle: true,
//                         padding: 20,
//                         font: {
//                             size: 11
//                         }
//                     }
//                 }
//             },
//             elements: {
//                 arc: {
//                     borderWidth: 2
//                 }
//             }
//         }
//     });
// }

// Update performance chart (mock data for demonstration)
// function updatePerformanceChart() {
//     const ctx = document.getElementById('performanceChart') ? document.getElementById('performanceChart').getContext('2d') : null;
    
//     if (!ctx) return; 

//     if (performanceChart) {
//         performanceChart.destroy();
//     }

//     // Generate mock performance data
//     const labels = [];
//     const portfolioData = [];
//     const today = new Date();
    
//     for (let i = 29; i >= 0; i--) {
//         const date = new Date(today);
//         date.setDate(date.getDate() - i);
//         labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
//         // Mock portfolio value progression
//         const totalValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
//         const variance = (Math.random() - 0.5) * 0.05; // ±2.5% daily variance
//         portfolioData.push(totalValue * (1 + variance * (30 - i) / 30));
//     }

//     performanceChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Portfolio Value',
//                 data: portfolioData,
//                 borderColor: 'rgba(74, 111, 165, 1)',
//                 backgroundColor: 'rgba(74, 111, 165, 0.1)',
//                 borderWidth: 3,
//                 fill: true,
//                 tension: 0.4,
//                 pointRadius: 0,
//                 pointHoverRadius: 6
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 x: {
//                     grid: {
//                         color: 'rgba(0, 0, 0, 0.05)'
//                     },
//                     ticks: {
//                         color: 'rgba(33, 37, 41, 0.8)',
//                         maxTicksLimit: 8
//                     }
//                 },
//                 y: {
//                     grid: {
//                         color: 'rgba(0, 0, 0, 0.05)'
//                     },
//                     ticks: {
//                         color: 'rgba(33, 37, 41, 0.8)',
//                         callback: function(value) {
//                             return '$' + value.toLocaleString();
//                         }
//                     }
//                 }
//             },
//             plugins: {
//                 legend: {
//                     display: false
//                 }
//             },
//             elements: {
//                 point: {
//                     hoverBackgroundColor: 'rgba(74, 111, 165, 1)'
//                 }
//             }
//         }
//     });
// }

// Generate modern color palette
function generateModernColors(count) {
    const colors = [
        'rgba(74, 111, 165, 0.9)',   // Primary Blue
        'rgba(244, 124, 124, 0.9)',  // Accent Red (Coral)
        'rgba(220, 53, 69, 0.9)',    // Profit Red (Accent Green CSS var)
        'rgba(3, 169, 244, 0.9)',    // Light Blue
        'rgba(40, 167, 69, 0.9)',    // Loss Green (Accent Red CSS var)
        'rgba(139, 92, 246, 0.9)',   // Purple
        'rgba(255, 193, 7, 0.9)',    // Yellow
        'rgba(108, 117, 125, 0.9)'   // Gray
    ];
    
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(colors[i % colors.length]);
    }
    return result;
}

// Format number with commas
function formatNumber(number, decimals = 0) {
    // 修正：移除 Math.abs()，讓 toLocaleString 處理正負號
    return number.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    fetchStockData();
    fetchLastUpdateTime();
});