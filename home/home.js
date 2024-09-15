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

document.getElementById("Dice-Roller").onclick = function() {
    window.open("https://liuutin9.github.io/Dice-Roller/index.html", "_self");
}

document.getElementById("I2P1-Yang").onclick = function() {
    window.open("https://liuutin9.github.io/I2P1-Yang/I2P1-Yang.html", "_self");
}

document.getElementById("I2P2-Yang").onclick = function() {
    window.open("https://liuutin9.github.io/I2P2-Yang/I2P2-Yang.html", "_self");
}

document.getElementById("TSHOAS").onclick = function() {
    window.open("https://liuutin9.github.io/TSHOAS/TSHOAS.html", "_self");
}

document.getElementById("Diary").onclick = function() {
    window.open("https://liuutin9.github.io/Diary/index.html", "_self");
}

document.getElementById("Signal-and-System").onclick = function() {
    window.open("https://liuutin9.github.io/Signal-and-System/index.html", "_self");
}

document.getElementById("Expense-Tracker").onclick = function() {
    window.open("https://liuutin9.github.io/Expense-Tracker/index.html", "_self");
}

document.getElementById("Computer-Architecture").onclick = function() {
    console.log("Computer-Architecture");
    window.open("https://liuutin9.github.io/Computer-Architecture/index.html", "_self");
}

document.getElementById("githubButton").onclick = function() {
    window.open("https://github.com/liuutin9");
}