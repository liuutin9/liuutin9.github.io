// const pdfViewer = "https://drive.google.com/viewerng/viewer?url=";

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