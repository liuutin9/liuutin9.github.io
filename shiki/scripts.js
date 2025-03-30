import { codeToHtml } from 'https://esm.sh/shiki';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Variables for PDF viewing
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;

// List of files in the folder (you can customize this)
const files = [
    { name: 'script.py', type: 'code', language: 'python' },
    { name: 'index.html', type: 'code', language: 'html' },
    { name: 'styles.css', type: 'code', language: 'css' },
    { name: 'scripts.js', type: 'code', language: 'javascript' },
    { name: 'document.pdf', type: 'pdf' }
];

// Populate file selector buttons
const fileSelector = document.getElementById('file-selector');
files.forEach(file => {
    const button = document.createElement('button');
    button.textContent = file.name;
    button.className = 'file-button';
    button.dataset.file = file.name;
    button.dataset.type = file.type;
    if (file.language) button.dataset.language = file.language;
    button.addEventListener('click', () => selectFile(file));
    fileSelector.appendChild(button);
});

// Get DOM elements
const codeBlock = document.getElementById('code-block');
const pdfViewer = document.getElementById('pdf-viewer');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const pageNumDisplay = document.getElementById('pdf-page-num');

// Add event listeners for PDF controls
prevButton.addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

nextButton.addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});

// Function to handle file selection
async function selectFile(file) {
    // Update active button
    document.querySelectorAll('.file-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.file === file.name) {
            btn.classList.add('active');
        }
    });
    
    // Update file info
    document.getElementById('current-file').textContent = file.name;
    document.getElementById('file-type').textContent = file.type === 'code' ? file.language : 'PDF';
    
    // Show loading indicator
    codeBlock.innerHTML = '<div id="loading">Loading content...</div>';
    
    // Toggle visibility based on file type
    if (file.type === 'code') {
        codeBlock.style.display = 'block';
        pdfViewer.style.display = 'none';
        
        try {
            // Fetch and highlight the selected code file
            await fetchAndHighlightCode(file.name, file.language);
        } catch (error) {
            codeBlock.innerHTML = `<div id="loading">Error loading file: ${error.message}</div>`;
        }
    } else if (file.type === 'pdf') {
        codeBlock.style.display = 'none';
        pdfViewer.style.display = 'block';
        
        try {
            // Load the PDF file
            await loadPdf(file.name);
        } catch (error) {
            pdfViewer.innerHTML = `<div id="loading" style="color: black;">Error loading PDF: ${error.message}</div>`;
        }
    }
}

// Function to fetch and highlight code
async function fetchAndHighlightCode(fileName, language) {
    try {
        // Fetch the file content
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${fileName} (${response.status})`);
        }
        
        const code = await response.text();
        
        // Highlight the code using Shiki
        const html = await codeToHtml(code, {
            lang: language,
            theme: 'dark-plus'
        });
        
        // Insert the highlighted code into the page
        codeBlock.innerHTML = html;
        
        // Apply Consolas font to all code elements after rendering
        document.querySelectorAll('#code-block pre, #code-block code, #code-block .shiki, #code-block .shiki span').forEach(el => {
            el.style.fontFamily = "Consolas, 'Courier New', monospace";
        });
    } catch (error) {
        console.error('Error fetching or highlighting code:', error);
        throw error;
    }
}

// Function to load a PDF file
async function loadPdf(fileName) {
    try {
        // Reset page number
        pageNum = 1;
        
        // Fetch the PDF document
        const loadingTask = pdfjsLib.getDocument(fileName);
        pdfDoc = await loadingTask.promise;
        
        // Update page count display
        pageNumDisplay.textContent = `Page: ${pageNum} / ${pdfDoc.numPages}`;
        
        // Render the first page
        renderPage(pageNum);
    } catch (error) {
        console.error('Error loading PDF:', error);
        throw error;
    }
}

// Function to render a specific page of the PDF
function renderPage(num) {
    pageRendering = true;
    
    // Get the page
    pdfDoc.getPage(num).then(function(page) {
        // Prepare canvas using PDF page dimensions
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: scale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Clear previous content
        const container = document.getElementById('pdf-container');
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(function() {
            pageRendering = false;
            
            // Update page count display
            pageNumDisplay.textContent = `Page: ${pageNum} / ${pdfDoc.numPages}`;
            
            // Check if there's a page pending to be rendered
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

// Function to queue a page for rendering
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// If files exist, select the first one by default
if (files.length > 0) {
    selectFile(files[0]);
}