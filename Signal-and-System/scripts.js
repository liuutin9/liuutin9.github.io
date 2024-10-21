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

document.getElementById("HW1").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW1_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW1_111060013.pdf", "_self");
}

document.getElementById("HW2").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW2_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW2_111060013.pdf", "_self");
}

document.getElementById("HW3").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW3_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW3_111060013.pdf", "_self");
}

document.getElementById("HW4").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW4_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW4_111060013.pdf", "_self");
}

document.getElementById("HW5").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW5_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW5_111060013.pdf", "_self");
}

document.getElementById("HW6").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW6_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW6_111060013.pdf", "_self");
}

document.getElementById("HW7").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW7_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW7_111060013.pdf", "_self");
}

document.getElementById("HWM").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWM_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWM_111060013.pdf", "_self");
}

document.getElementById("HW8").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW8_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW8_111060013.pdf", "_self");
}

document.getElementById("HW9").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW9_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HW9_111060013.pdf", "_self");
}

document.getElementById("HWA").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWA_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWA_111060013.pdf", "_self");
}

document.getElementById("HWB").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWB_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWB_111060013.pdf", "_self");
}

document.getElementById("HWC").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWC_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWC_111060013.pdf", "_self");
}

document.getElementById("HWD").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWD_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Signal-and-System/files/Signal_and_System_2024_HWD_111060013.pdf", "_self");
}