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

document.getElementById("Dice-Roller").onclick = function() {
    window.open("./Dice-Roller", "_self");
}

document.getElementById("NTHU-EESC").onclick = function() {
    window.open("https://nthu-eesc.github.io/");
}

document.getElementById("I2P1-Yang").onclick = function() {
    window.open("./I2P1-Yang/I2P1-Yang.html", "_self");
}

document.getElementById("I2P2-Yang").onclick = function() {
    window.open("./I2P2-Yang/I2P2-Yang.html", "_self");
}

document.getElementById("TSHOAS").onclick = function() {
    window.open("./TSHOAS/TSHOAS.html", "_self");
}

document.getElementById("Diary").onclick = function() {
    window.open("./Diary", "_self");
}

document.getElementById("Investment-Portfolio").onclick = function() {
    window.open("./Finance", "_self");
}

document.getElementById("Intro-to-AI").onclick = function() {
    window.open("./Intro-to-AI", "_self");
}

document.getElementById("Regular-Language").onclick = function() {
    window.open("./Regular-Language", "_self");
}

document.getElementById("Signal-and-System").onclick = function() {
    window.open("./Signal-and-System", "_self");
}

document.getElementById("Expense-Tracker").onclick = function() {
    window.open("./Expense-Tracker", "_self");
}

document.getElementById("Computer-Architecture").onclick = function() {
    console.log("Computer-Architecture");
    window.open("./Computer-Architecture", "_self");
}

document.getElementById("githubButton").onclick = function() {
    window.open("https://github.com/liuutin9");
}