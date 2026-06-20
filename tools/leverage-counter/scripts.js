// 主題切換邏輯
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? '' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 頁面載入時回復使用者之前選擇的主題
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
});

// 精確計算開倉價值邏輯
function calculateOpenValue() {
    const tuitionFee = parseFloat(document.getElementById('tuition_fee').value) || 0;
    const currentPrice = parseFloat(document.getElementById('current_price').value) || 0;
    const crossPrice = parseFloat(document.getElementById('cross_price').value) || 0;
    let tradingFeeRate = parseFloat(document.getElementById('trading_fee_rate').value);

    const resultDisplay = document.getElementById('result-display');
    resultDisplay.style.display = 'block';

    // 如果未填寫手續費率，則採用預設值 0.00055
    if (isNaN(tradingFeeRate)) {
        tradingFeeRate = 0.00055;
    }
    
    // 預防分母除以零的錯誤
    if (currentPrice === 0) {
        resultDisplay.innerHTML = "錯誤：當前價格 (Current Price) 不能為 0。";
        resultDisplay.style.borderLeftColor = "#ff4d4d";
        return;
    }

    // 計算公式：open_value = tuition_fee / (abs((cross_price - current_price) / current_price) + trading_fee_rate)
    const priceDiffRatio = Math.abs((crossPrice - currentPrice) / currentPrice);
    const openValue = tuitionFee / (priceDiffRatio + tradingFeeRate);

    // 格式化輸出結果
    resultDisplay.style.borderLeftColor = "var(--bird-orange)";
    resultDisplay.innerHTML = `計算結果 (Open Value)：<br><span class="result-highlight">${openValue.toFixed(4)}</span>`;
}