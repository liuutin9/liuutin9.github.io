// 全局變數
let simulationData = null;
let currentStep = 0;
let maxStep = 0;
let isPlaying = false;
let playInterval = null;
let playSpeed = 1000; // milliseconds

// 選擇元素
const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const stepDisplay = document.getElementById('stepDisplay');
const speedSlider = document.getElementById('speedSlider');
const floorsContainer = document.getElementById('floors');
const elevatorShaftsContainer = document.getElementById('elevatorShafts');
const infoPanel = document.getElementById('infoPanel');

// 載入JSON數據
async function loadData() {
    try {

        // 讀取 json 數據
        const response = await fetch('../animation_log/simulation_log.json');
        const jsonData = await response.json();

        simulationData = jsonData;
        maxStep = Object.keys(simulationData).length - 1;
        initializeSimulation();
        renderStep(currentStep);

    } catch (error) {
        console.error('Error loading data:', error);
        alert('加載數據時發生錯誤！');
    }
}

// 初始化模擬
function initializeSimulation() {
    // 獲取第一步的樓層數量
    const firstStep = simulationData['0'];
    const floorCount = firstStep.floors.length;
    const elevatorCount = firstStep.elevators.length;

    // 生成樓層
    floorsContainer.innerHTML = '';
    for (let i = 0; i < floorCount; i++) {
        const floorEl = document.createElement('div');
        floorEl.className = 'floor';
        floorEl.innerHTML = `
      <span class="floor-number">${i}</span>
      <span class="waiting" id="floor-${i}-waiting"></span>
    `;
        floorsContainer.appendChild(floorEl);
    }

    // 生成電梯井
    elevatorShaftsContainer.innerHTML = '';
    for (let i = 0; i < elevatorCount; i++) {
        const shaftEl = document.createElement('div');
        shaftEl.className = 'elevator-shaft';

        const elevatorEl = document.createElement('div');
        elevatorEl.id = `elevator-${i}`;
        elevatorEl.className = 'elevator';

        shaftEl.appendChild(elevatorEl);
        elevatorShaftsContainer.appendChild(shaftEl);
    }

    // 設置電梯高度
    const floorHeight = 100 / floorCount;
    document.querySelectorAll('.elevator').forEach(el => {
        el.style.height = `${floorHeight}%`;
    });
}

// 渲染當前步驟
function renderStep(step) {
    if (!simulationData || !simulationData[step]) return;

    const data = simulationData[step];
    const { elevators, floors, energy_consumption } = data;

    // 更新步驟顯示
    stepDisplay.textContent = `步驟: ${step}`;

    // 更新樓層等待人數
    floors.forEach(floor => {
        const waitingEl = document.getElementById(`floor-${floor.floor}-waiting`);
        if (waitingEl) {
            waitingEl.textContent = `等待: ${floor.waiting}`;
        }
    });

    // 更新電梯位置和信息
    elevators.forEach((elevator, index) => {
        const elevatorEl = document.getElementById(`elevator-${index}`);
        if (!elevatorEl) return;

        const floorCount = floors.length;
        const floorHeight = 100 / floorCount;
        const bottomPosition = elevator.curr_floor * floorHeight;

        elevatorEl.style.bottom = `${bottomPosition}%`;
        elevatorEl.classList.toggle('moving', elevator.curr_direction !== 'OPEN');
        elevatorEl.textContent = elevator.num_people;
    });

    // 更新信息面板
    updateInfoPanel(step, data);

    // 更新按鈕狀態
    prevBtn.disabled = step <= 0;
    nextBtn.disabled = step >= maxStep;
}

// 更新信息面板
function updateInfoPanel(step, data) {
    const { elevators, energy_consumption } = data;

    let html = `
    <div class="energy-info">能源消耗: ${energy_consumption.toLocaleString()} 單位</div>
  `;

    elevators.forEach((elevator, index) => {
        const status = elevator.dest_floor !== null ?
            `移動中 (到達 ${elevator.dest_floor} 樓)` :
            '靜止';

        html += `
      <div class="elevator-info">
        <h3>電梯 ${index + 1}</h3>
        <p>當前樓層: ${elevator.curr_floor}</p>
        <p>狀態: ${status}</p>
        <p>乘客數: ${elevator.num_people}</p>
        <p>預定樓層:</p>
        <div class="scheduled-list">
          ${elevator.scheduled_list.map(floor =>
            `<span class="floor-item">${floor}</span>`
        ).join('')}
        </div>
      </div>
    `;
    });

    infoPanel.innerHTML = html;
}

// 播放控制
function togglePlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playPauseBtn.textContent = '暫停';
        playInterval = setInterval(() => {
            if (currentStep < maxStep) {
                currentStep++;
                renderStep(currentStep);
            } else {
                togglePlay(); // 自動停止
            }
        }, playSpeed);
    } else {
        playPauseBtn.textContent = '播放';
        clearInterval(playInterval);
    }
}

// 前進一步
function nextStep() {
    if (currentStep < maxStep) {
        currentStep++;
        renderStep(currentStep);
    }
}

// 后退一步
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
}

// 速度控制
function updateSpeed() {
    playSpeed = parseInt(speedSlider.value);
    if (isPlaying) {
        clearInterval(playInterval);
        playInterval = setInterval(() => {
            if (currentStep < maxStep) {
                currentStep++;
                renderStep(currentStep);
            } else {
                togglePlay(); // 自動停止
            }
        }, playSpeed);
    }
}

// 事件監聽器
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextStep);
prevBtn.addEventListener('click', prevStep);
speedSlider.addEventListener('input', updateSpeed);

// 加載數據並開始模擬
window.addEventListener('DOMContentLoaded', loadData);