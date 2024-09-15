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

    // isScrolling = setTimeout(() => {
    //     header.classList.remove("hidden");
    // }, 500); 
});

const pdfViewer = "https://docs.google.com/viewer?url=";
var userAgent = navigator.userAgent;

document.getElementById("HW1").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW1/HW1_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW1/HW1_111060013.pdf", "_self");
}

document.getElementById("HW2").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW2/HW2_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW2/HW2_111060013.pdf", "_self");
}

document.getElementById("HW3").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW3/HW3_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW3/HW3_111060013.pdf", "_self");
}

document.getElementById("HW4").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW4/HW4_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW4/HW4_111060013.pdf", "_self");
}

document.getElementById("HW5").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW5/HW5_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW5/HW5_111060013.pdf", "_self");
}

document.getElementById("HW6").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + "https://liuutin9.github.io/Computer-Architecture/files/HW6/HW6_111060013.pdf", "_self");
    else window.open("https://liuutin9.github.io/Computer-Architecture/files/HW6/HW6_111060013.pdf", "_self");
}