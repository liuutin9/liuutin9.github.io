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
        updateCharts();
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

    // Update overview cards
    document.getElementById('total-market-value').innerHTML = `$${formatNumber(totalMarketValue)}`;
    document.getElementById('total-cost').innerHTML = `$${formatNumber(totalCost)}`;
    document.getElementById('total-return').innerHTML = `$${formatNumber(totalReturn)}`;
    document.getElementById('total-return').className = `value ${totalReturn >= 0 ? 'profit' : 'loss'}`;
    
    const returnElement = document.getElementById('total-profit-loss-percentage');
    returnElement.innerHTML = `${returnPercentage}%`;
    returnElement.className = totalReturn >= 0 ? 'profit' : 'loss';
    
    document.getElementById('total-positions').innerHTML = stocks.length;

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
                <div class="holding-price">$${formatNumber(stock.currentPrice, 2)}</div>
            </div>
            <div class="holding-details">
                <div class="detail-item">
                    <div class="detail-label">Shares</div>
                    <div class="detail-value">${formatNumber(stock.shares)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Market Value</div>
                    <div class="detail-value">$${formatNumber(marketValue)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Cost Basis</div>
                    <div class="detail-value">$${formatNumber(stock.cost, 2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Total Return</div>
                    <div class="detail-value ${profitLoss >= 0 ? 'profit' : 'loss'}">${formatNumber(Math.abs(profitLoss))}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Return %</div>
                    <div class="detail-value ${profitLoss >= 0 ? 'profit' : 'loss'}">${Math.abs(profitLossPercentage)}%</div>
                </div>
            </div>
        `;
        holdingsList.appendChild(holdingCard);
    });
}

// Update charts
function updateCharts() {
    updatePortfolioChart();
    updatePerformanceChart();
}

// Update portfolio allocation chart
function updatePortfolioChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    if (portfolioChart) {
        portfolioChart.destroy();
    }

    const labels = stocks.map(stock => stock.name);
    const data = stocks.map(stock => stock.shares * stock.currentPrice);
    const colors = generateModernColors(stocks.length);

    portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 2
                }
            }
        }
    });
}

// Update performance chart (mock data for demonstration)
function updatePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    if (performanceChart) {
        performanceChart.destroy();
    }

    // Generate mock performance data
    const labels = [];
    const portfolioData = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Mock portfolio value progression
        const totalValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
        const variance = (Math.random() - 0.5) * 0.05; // ±2.5% daily variance
        portfolioData.push(totalValue * (1 + variance * (30 - i) / 30));
    }

    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Value',
                data: portfolioData,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        maxTicksLimit: 8
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: 'rgba(59, 130, 246, 1)'
                }
            }
        }
    });
}

// Generate modern color palette
function generateModernColors(count) {
    const colors = [
        'rgba(59, 130, 246, 0.8)',   // Blue
        'rgba(16, 185, 129, 0.8)',   // Green
        'rgba(139, 92, 246, 0.8)',   // Purple
        'rgba(245, 101, 101, 0.8)',  // Red
        'rgba(251, 191, 36, 0.8)',   // Yellow
        'rgba(236, 72, 153, 0.8)',   // Pink
        'rgba(6, 182, 212, 0.8)',    // Cyan
        'rgba(252, 165, 165, 0.8)'   // Light Red
    ];
    
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(colors[i % colors.length]);
    }
    return result;
}

// Format number with commas
function formatNumber(number, decimals = 0) {
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