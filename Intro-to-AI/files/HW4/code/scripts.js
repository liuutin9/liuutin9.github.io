import { codeToHtml } from 'https://esm.sh/shiki';
import { marked } from 'https://esm.sh/marked';

const fileStructure = {
    'code': {
        type: 'folder',
        items: {
            // 'main.py': { type: 'file', language: 'python' },
            // 'utils.py': { type: 'file', language: 'python' },
            // 'ids.py': { type: 'file', language: 'python' },
            // 'hc.py': { type: 'file', language: 'python' },
            // 'ga.py': { type: 'file', language: 'python' },
            'README.md': { type: 'file', language: 'markdown' },
        },
    },
};

// Keep track of the current path and navigation
let currentPath = [];
let currentFile = null;

// Initialize the file explorer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderFileTree();
    setupPathNavigation();
});

// Function to render the file tree based on the current path
function renderFileTree() {
    const fileTree = document.getElementById('file-tree');
    fileTree.innerHTML = '';
    
    // Get the current folder based on the path
    let currentFolder = fileStructure;
    for (const segment of currentPath) {
        currentFolder = currentFolder.items[segment];
    }
    
    // Create elements for each item in the current folder
    const folderItems = currentFolder.items;
    
    // Sort items: folders first, then files
    const sortedItems = Object.keys(folderItems).sort((a, b) => {
        const aIsFolder = folderItems[a].type === 'folder';
        const bIsFolder = folderItems[b].type === 'folder';
        
        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;
        return a.localeCompare(b);
    });
    
    // Create elements for each sorted item
    sortedItems.forEach(itemName => {
        const item = folderItems[itemName];
        const itemElement = document.createElement('div');
        
        if (item.type === 'folder') {
            itemElement.className = 'folder-item';
            itemElement.innerHTML = `
                <div class="item-icon folder-icon">📁</div>
                <div class="item-name">${itemName}</div>
            `;
            itemElement.addEventListener('click', () => navigateToFolder(itemName));
        } else {
            itemElement.className = 'file-item';
            itemElement.innerHTML = `
                <div class="item-icon file-icon">📄</div>
                <div class="item-name">${itemName}</div>
            `;
            itemElement.addEventListener('click', () => selectFile(itemName, item.language));
        }
        
        fileTree.appendChild(itemElement);
    });
    
    // Update the current path display
    updatePathDisplay();
}

// Function to update the path navigation display
function updatePathDisplay() {
    const pathElement = document.getElementById('current-path');
    pathElement.innerHTML = '<span class="path-item root" data-path="">root</span>';
    
    let currentPathStr = '';
    currentPath.forEach((segment, index) => {
        currentPathStr += (currentPathStr ? '/' : '') + segment;
        const segmentElement = document.createElement('span');
        segmentElement.className = 'path-separator';
        segmentElement.textContent = ' / ';
        pathElement.appendChild(segmentElement);
        
        const pathItemElement = document.createElement('span');
        pathItemElement.className = 'path-item';
        pathItemElement.textContent = segment;
        pathItemElement.dataset.path = currentPathStr;
        pathElement.appendChild(pathItemElement);
    });
}

// Setup click handlers for path navigation
function setupPathNavigation() {
    const pathElement = document.getElementById('current-path');
    pathElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('path-item')) {
            const pathStr = event.target.dataset.path;
            if (pathStr === '') {
                // Root folder
                currentPath = [];
            } else {
                // Navigate to specific path
                currentPath = pathStr.split('/');
            }
            renderFileTree();
        }
    });
}

// Function to navigate to a subfolder
function navigateToFolder(folderName) {
    currentPath.push(folderName);
    renderFileTree();
}

// Function to select and display a file
async function selectFile(fileName, language) {
    // Construct the full file path
    let filePath = [...currentPath, fileName].join('/');
    if (filePath) {
        filePath = '/' + filePath;
    }
    
    // Update file info
    document.getElementById('current-file').textContent = fileName;
    document.getElementById('file-language').textContent = language;
    
    // Update active file in UI
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('.item-name').textContent === fileName) {
            item.classList.add('active');
        }
    });
    
    // Show loading indicator
    document.getElementById('code-block').innerHTML = '<div id="loading">Loading code...</div>';
    
    try {
        // In a real implementation, we would fetch the actual file
        // For this demo, we'll simulate content based on the filename
        await fetchAndHighlightCode(fileName, language);
    } catch (error) {
        document.getElementById('code-block').innerHTML = `<div id="loading">Error loading file: ${error.message}</div>`;
    }
}

// Function to fetch and highlight code
async function fetchAndHighlightCode(fileName, language) {
    try {
        let code = '';
        
        // Try to fetch the actual file if it exists
        try {
            const response = await fetch(fileName);
            if (response.ok) {
                code = await response.text();
            } else {
                // If file doesn't exist, generate placeholder content
                code = generatePlaceholderContent(fileName, language);
            }
        } catch (error) {
            // If fetch fails, generate placeholder content
            code = generatePlaceholderContent(fileName, language);
        }
        
        // Special handling for markdown files
        if (language === 'markdown') {
            renderMarkdown(code);
        } else {
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
        }
    } catch (error) {
        console.error('Error highlighting code:', error);
        throw error;
    }
}

// Function to render markdown content
function renderMarkdown(markdownContent) {
    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownContent);
    
    // Create a container for the rendered markdown
    const markdownContainer = document.createElement('div');
    markdownContainer.className = 'markdown-body';
    markdownContainer.innerHTML = htmlContent;
    
    // Clear the code block and append the markdown container
    const codeBlock = document.getElementById('code-block');
    codeBlock.innerHTML = '';
    codeBlock.appendChild(markdownContainer);
    
    // Handle code blocks within the markdown
    codeBlock.querySelectorAll('pre code').forEach(async (block) => {
        const language = block.className.replace('language-', '');
        if (language) {
            const codeContent = block.textContent;
            try {
                const highlightedCode = await codeToHtml(codeContent, {
                    lang: language,
                    theme: 'dark-plus'
                });
                
                // Replace the original code block with the highlighted version
                const preElement = block.parentNode;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = highlightedCode;
                preElement.replaceWith(tempDiv.firstChild);
            } catch (error) {
                console.error('Error highlighting code block in markdown:', error);
            }
        }
    });
}

// Generate placeholder content for demo purposes
function generatePlaceholderContent(fileName, language) {
    const fileExtension = fileName.split('.').pop();
    
    // Example content for different file types
    if (language === 'python') {
        return `# ${fileName}\n# This is a placeholder for demonstration purposes\n\ndef main():\n    print("This is a sample function in ${fileName}")\n    # TODO: Implement actual functionality\n\nif __name__ == "__main__":\n    main()`;
    } else if (language === 'markdown') {
        return `# ${fileName}\n\nThis is a placeholder markdown file for demonstration purposes.\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Example\n\n\`\`\`python\ndef example():\n    return "Hello, world!"\n\`\`\``;
    } else {
        return `// ${fileName}\n// This is a placeholder for demonstration purposes\n\n// TODO: Implement actual content`;
    }
}

// Navigate to the root folder initially
renderFileTree();