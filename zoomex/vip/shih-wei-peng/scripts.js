/**
 * === 客戶每日交易量更新區 (USD) ===
 * 每天在陣列後面新增當天的交易量即可
 */
const DAILY_VOLUMES = [
    3989.13515,
    23871.38965,
    1875.52544,
    1833.82794,
    6122.25952,
    49753.47877,
    45890.0476,
    51264.7095,
    2491.39324,
    8251.4041
];

/**
 * === Zoomex VIP 等級定義 ===
 */
const VIP_LEVELS = [
    { name: 'VIP 0', threshold: 0, rewardBonus: 0 },
    { name: 'VIP 1', threshold: 10_000_000, rewardBonus: 200 },  // 獎勵率僅為示例
    { name: 'VIP 2', threshold: 30_000_000, rewardBonus: 400 },
    { name: 'VIP 3', threshold: 50_000_000, rewardBonus: 1_000 },
    { name: 'VIP 4', threshold: 100_000_000, rewardBonus: 1_600 },
    { name: 'VIP 5', threshold: 300_000_000, rewardBonus: 3_000 }
];

function calculateDashboard() {
    // 1. 計算總交易量
    const totalVolume = DAILY_VOLUMES.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('total-volume').innerText = `${totalVolume.toLocaleString()} USDT`;

    // 2. 判定當前等級
    let currentLevel = VIP_LEVELS[0];
    let nextLevel = VIP_LEVELS[1];

    for (let i = 0; i < VIP_LEVELS.length; i++) {
        if (totalVolume >= VIP_LEVELS[i].threshold) {
            currentLevel = VIP_LEVELS[i];
            nextLevel = VIP_LEVELS[i + 1] || null;
        }
    }

    // 3. 更新標題與獎勵
    document.getElementById('current-level').innerText = currentLevel.name;
    const estReward = currentLevel.rewardBonus;
    document.getElementById('estimated-reward').innerText = `${estReward.toLocaleString()} USDT`;

    // 4. 計算進度條
    if (nextLevel) {
        const needed = nextLevel.threshold - totalVolume;
        const progress = ((totalVolume - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100;
        const safeProgress = Math.min(Math.max(progress, 0), 100);

        document.getElementById('next-level-hint').innerText = `距離升級至 ${nextLevel.name} 還差 ${needed.toLocaleString()} USDT`;
        // document.getElementById('progress-percent').innerText = `${Math.floor(safeProgress)}%`;
        document.getElementById('progress-fill').style.width = `${safeProgress}%`;
    } else {
        document.getElementById('next-level-hint').innerText = `已達成最高等級！`;
        // document.getElementById('progress-percent').innerText = `100%`;
        document.getElementById('progress-fill').style.width = `100%`;
    }

    // 5. 生成每日明細清單 (最新的在上面)
    const logContainer = document.getElementById('daily-log');
    logContainer.innerHTML = ''; // 清空預設
    
    DAILY_VOLUMES.slice().reverse().forEach((vol, index) => {
        const dayIdx = DAILY_VOLUMES.length - index;
        const row = document.createElement('div');
        row.className = 'list-row';
        row.innerHTML = `
            <div class="row-label">DAY ${dayIdx}</div>
            <div class="row-content">
                <h3>$${vol.toLocaleString()} <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: normal;">USD</span></h3>
            </div>
        `;
        logContainer.appendChild(row);
    });
}

/**
 * 主題切換邏輯
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? '' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    calculateDashboard();
});