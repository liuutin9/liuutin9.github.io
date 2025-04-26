// Header visibility control
let lastScrollY = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // 向下滾動超過100px，隱藏 header
        header.classList.add("hidden");
    } else {
        // 向上滾動，顯示 header
        header.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
});

// PDF viewer configuration
const pdfViewer = "https://docs.google.com/viewer?url=";
const userAgent = navigator.userAgent;

// PDF URLs
const pdfUrls = {
    "HW1": "https://liuutin9.github.io/Intro-to-AI/files/HW1/HW1_111060013.pdf",
    "HW2": "https://liuutin9.github.io/Intro-to-AI/files/HW2/HW2_111060013.pdf",
    "HW3": "https://liuutin9.github.io/Intro-to-AI/files/HW3/HW3_111060013.pdf",
    "HW4": "https://liuutin9.github.io/Intro-to-AI/files/HW4/HW4_111060013.pdf",
    "HW5": "https://liuutin9.github.io/Intro-to-AI/files/HW5/HW5_111060013.pdf",
    "HW6": "https://liuutin9.github.io/Intro-to-AI/files/HW6/HW6_111060013.pdf"
};

// Add click event listeners to all report buttons
document.querySelectorAll('.primary-btn').forEach(button => {
    const card = button.closest('.card');
    if (card && pdfUrls[card.id]) {
        button.addEventListener('click', function() {
            window.open(pdfUrls[card.id], "_self");
            // const url = pdfUrls[card.id];
            // if (userAgent.includes("Android")) {
            //     window.open(pdfViewer + url, "_self");
            // } else {
            //     window.open(url, "_self");
            // }
        });
    }
});

// Add animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Prevent propagation for secondary buttons
document.querySelectorAll('.secondary-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});