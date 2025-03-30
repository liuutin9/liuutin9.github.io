let lastScrollY = 0;
let isScrolling; // 記錄滑動的狀態
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        // 向下滾動，隱藏 header
        header.classList.add("hidden");
    } else {
        // 向上滾動，顯示 header
        header.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
});

const pdfViewer = "https://docs.google.com/viewer?url=";
var userAgent = navigator.userAgent;

// PDF URLs
const pdfUrls = {
    "HW1": "https://liuutin9.github.io/Intro-to-AI/files/HW1/HW1_111060013.pdf",
    "HW2": "https://liuutin9.github.io/Intro-to-AI/files/HW2/HW2_111060013.pdf",
    "HW3": "https://liuutin9.github.io/Intro-to-AI/files/HW3/HW3_111060013.pdf",
    "HW4": "https://liuutin9.github.io/Intro-to-AI/files/HW4/HW4_111060013.pdf",
    "HW5": "https://liuutin9.github.io/Intro-to-AI/files/HW5/HW5_111060013.pdf",
    "HW6": "https://liuutin9.github.io/Intro-to-AI/files/HW6/HW6_111060013.pdf"
};

// 為所有按鈕添加事件監聽器
document.querySelectorAll('.item').forEach(button => {
    const hwId = button.id;
    if (pdfUrls[hwId]) {
        button.addEventListener('click', function() {
            const url = pdfUrls[hwId];
            if (userAgent.includes("Android")) {
                window.open(pdfViewer + url, "_self");
            } else {
                window.open(url, "_self");
            }
        });
    }
});

// 防止點擊下載按鈕時觸發按鈕的點擊事件
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
