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
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW1/HW1_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW2/HW2_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW3/HW3_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW4/HW4_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW5/HW5_111060013.pdf",
    "https://liuutin9.github.io/Formal-Language-and-Automata/files/HW6/HW6_111060013.pdf",
]

const pdfUrls = {
    "HW1": "./files/HW1/HW1_111060013.pdf",
    "HW2": "./files/HW2/HW2_111060013.pdf",
    "HW3": "./files/HW3/HW3_111060013.pdf",
    "HW4": "./files/HW4/HW4_111060013.pdf",
    "HW5": "./files/HW5/HW5_111060013.pdf",
    "HW6": "./files/HW6/HW6_111060013.pdf",
};

for (const [key, value] of Object.entries(pdfUrls)) {
    document.getElementById(key).onclick = function() {
        // if (userAgent.includes("Android")) window.open(pdfViewer + value, "_self");
        // else window.open(value, "_self");
        window.open(value, "_self");
    }
}