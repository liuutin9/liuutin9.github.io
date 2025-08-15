// 等待 DOM 內容完全載入後再執行腳本
document.addEventListener('DOMContentLoaded', () => {

    // === 頁首滾動隱藏/顯示功能 ===
    let lastScrollY = window.scrollY;
    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
        // 檢查滾動距離是否大於 header 高度，避免觸頂時也觸發
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                // 向下滾動，隱藏 header
                header.classList.add("hidden");
            } else {
                // 向上滾動，顯示 header
                header.classList.remove("hidden");
            }
        }
        lastScrollY = window.scrollY;
    }, { passive: true }); // 使用 passive 提升滾動效能


    // === 按鈕點擊事件 ===
    const pdfUrls = {
        "HW1": "./files/Signal_and_System_2024_HW1_111060013.pdf",
        "HW2": "./files/Signal_and_System_2024_HW2_111060013.pdf",
        "HW3": "./files/Signal_and_System_2024_HW3_111060013.pdf",
        "HW4": "./files/Signal_and_System_2024_HW4_111060013.pdf",
        "HW5": "./files/Signal_and_System_2024_HW5_111060013.pdf",
        "HW6": "./files/Signal_and_System_2024_HW6_111060013.pdf",
        "HW7": "./files/Signal_and_System_2024_HW7_111060013.pdf",
        "HWM": "./files/Signal_and_System_2024_HWM_111060013.pdf",
        "HW8": "./files/Signal_and_System_2024_HW8_111060013.pdf",
        "HW9": "./files/Signal_and_System_2024_HW9_111060013.pdf",
        "HWA": "./files/Signal_and_System_2024_HWA_111060013.pdf",
        "HWB": "./files/Signal_and_System_2024_HWB_111060013.pdf",
        "HWC": "./files/Signal_and_System_2024_HWC_111060013.pdf",
        "HWD": "./files/Signal_and_System_2024_HWD_111060013.pdf",
    };
    
    // 使用 for...of 迴圈和 Object.entries 來遍歷物件
    for (const [key, value] of Object.entries(pdfUrls)) {
        const button = document.getElementById(key);
        if (button) { // 確保元素存在
            button.onclick = function() {
                // 在當前分頁打開連結
                window.open(value, "_self");
            }
        }
    }
});