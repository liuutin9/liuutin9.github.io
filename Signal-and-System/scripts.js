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

for (const [key, value] of Object.entries(pdfUrls)) {
    document.getElementById(key).onclick = function() {
        // if (userAgent.includes("Android")) window.open(pdfViewer + value, "_self");
        // else window.open(value, "_self");
        window.open(value, "_self");
    }
}