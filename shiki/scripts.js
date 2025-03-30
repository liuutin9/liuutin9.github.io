import { codeToHtml } from 'https://esm.sh/shiki';
        
// List of code files in the folder (you can customize this)
const codeFiles = [
    { name: 'script.py', language: 'python' },
    { name: 'index.html', language: 'html' },
    { name: 'styles.css', language: 'css' },
    { name: 'main.js', language: 'javascript' }
];

// Populate file selector buttons
const fileSelector = document.getElementById('file-selector');
codeFiles.forEach(file => {
    const button = document.createElement('button');
    button.textContent = file.name;
    button.className = 'file-button';
    button.dataset.file = file.name;
    button.dataset.language = file.language;
    button.addEventListener('click', () => selectFile(file.name, file.language));
    fileSelector.appendChild(button);
});

// Function to handle file selection
async function selectFile(fileName, language) {
    // Update active button
    document.querySelectorAll('.file-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.file === fileName) {
            btn.classList.add('active');
        }
    });
    
    // Update file info
    document.getElementById('current-file').textContent = fileName;
    document.getElementById('file-language').textContent = language;
    
    // Show loading indicator
    document.getElementById('code-block').innerHTML = '<div id="loading">Loading code...</div>';
    
    try {
        // Fetch and highlight the selected code file
        await fetchAndHighlightCode(fileName, language);
    } catch (error) {
        document.getElementById('code-block').innerHTML = `<div id="loading">Error loading file: ${error.message}</div>`;
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
        document.getElementById('code-block').innerHTML = html;
        
        // Apply Consolas font to all code elements after rendering
        document.querySelectorAll('#code-block pre, #code-block code, #code-block .shiki, #code-block .shiki span').forEach(el => {
            el.style.fontFamily = "Consolas, 'Courier New', monospace";
        });
    } catch (error) {
        console.error('Error fetching or highlighting code:', error);
        throw error;
    }
}

// If code files exist, select the first one by default
if (codeFiles.length > 0) {
    selectFile(codeFiles[0].name, codeFiles[0].language);
}