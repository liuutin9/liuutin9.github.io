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

let urls = [
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW1/HW1_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW2/HW2_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW3/HW3_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW4/HW4_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW5/HW5_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-&-Automata/files/HW6/HW6_111060013.pdf",
]

document.getElementById("HW1").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[0], "_self");
    else window.open(urls[0], "_self");
}

document.getElementById("HW2").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[1], "_self");
    else window.open(urls[1], "_self");
}

document.getElementById("HW3").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[2], "_self");
    else window.open(urls[2], "_self");
}

document.getElementById("HW4").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[3], "_self");
    else window.open(urls[3], "_self");
}

document.getElementById("HW5").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[4], "_self");
    else window.open(urls[4], "_self");
}

document.getElementById("HW6").onclick = function() {
    if (userAgent.includes("Android")) window.open(pdfViewer + urls[5], "_self");
    else window.open(urls[5], "_self");
}