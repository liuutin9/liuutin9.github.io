import { codeToHtml } from 'https://esm.sh/shiki';
import { marked } from 'https://esm.sh/marked';

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const fileStructure = {
    'root': {
        type: 'folder',
        items: {
            'main.py': { type: 'file', language: 'python' },
            'utils.py': { type: 'file', language: 'python' },
            'ids.py': { type: 'file', language: 'python' },
            'hc.py': { type: 'file', language: 'python' },
            'ga.py': { type: 'file', language: 'python' },
        },
    },
};

let rawContentPath = './'
let currentPath = [];
let currentFile = null;

document.addEventListener('DOMContentLoaded', () => {
    setMarkdownTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    renderFileTree();
    setupPathNavigation();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setMarkdownTheme(e.matches);
});

// ---------- 主題切換：Markdown ----------
function setMarkdownTheme(isDarkMode) {
    const existing = document.getElementById('markdown-theme');
    if (existing) existing.remove();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'markdown-theme';
    link.href = isDarkMode
        ? 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css';
    document.head.appendChild(link);
}

// ---------- 檔案管理 ----------
function renderFileTree() {
    const fileTree = document.getElementById('file-tree');
    fileTree.innerHTML = '';
    let currentFolder = fileStructure.root;
    for (const segment of currentPath) {
        currentFolder = currentFolder.items[segment];
    }
    const folderItems = currentFolder.items;
    const sortedItems = Object.keys(folderItems).sort((a, b) => {
        const aIsFolder = folderItems[a].type === 'folder';
        const bIsFolder = folderItems[b].type === 'folder';
        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;
        return a.localeCompare(b);
    });
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
            itemElement.addEventListener('click', () => {
                const extension = itemName.split('.').pop().toLowerCase();
                let language = item.language || 'plaintext';
                if (extension === 'md') {
                    language = 'markdown';
                }
                selectFile(itemName, language);
            });
        }
        fileTree.appendChild(itemElement);
    });
    updatePathDisplay();
}

function updatePathDisplay() {
    const pathElement = document.getElementById('current-path');
    pathElement.innerHTML = '<span class="path-item root" data-path="">root</span>';
    let currentPathStr = '';
    currentPath.forEach((segment) => {
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

function setupPathNavigation() {
    const pathElement = document.getElementById('current-path');
    pathElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('path-item')) {
            const pathStr = event.target.dataset.path;
            currentPath = pathStr === '' ? [] : pathStr.split('/');
            renderFileTree();
        }
    });
}

function navigateToFolder(folderName) {
    currentPath.push(folderName);
    renderFileTree();
}

async function selectFile(fileName, language) {
    let filePath = [...currentPath, fileName].join('/');
    filePath = rawContentPath + filePath;
    document.getElementById('current-file').textContent = fileName;
    document.getElementById('file-language').textContent = language;
    currentFile = { name: fileName, language }; // 儲存目前檔案
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('.item-name').textContent === fileName) {
            item.classList.add('active');
        }
    });
    document.getElementById('code-block').innerHTML = '<div id="loading">Loading content...</div>';
    try {
        await fetchAndRenderContent(fileName, language, filePath);
    } catch (error) {
        document.getElementById('code-block').innerHTML = `<div id="loading">Error loading file: ${error.message}</div>`;
    }
}

// ---------- 顯示檔案 ----------
async function fetchAndRenderContent(fileName, language, filePath) {
    try {
        let code = '';
        try {
            const response = await fetch(filePath);
            code = response.ok ? await response.text() : generatePlaceholderContent(fileName, language);
        } catch {
            code = generatePlaceholderContent(fileName, language);
        }

        const extension = fileName.split('.').pop().toLowerCase();

        if (extension === 'md') {
            const html = marked.parse(code);
            document.getElementById('code-block').innerHTML = `<div class="markdown-body">${html}</div>`;
        } else {
            const htmlLight = await codeToHtml(code, {
                lang: language,
                theme: 'light-plus',
            });
            const htmlDark = await codeToHtml(code, {
                lang: language,
                theme: 'dark-plus',
            });

            document.getElementById('code-block').innerHTML = `
                <div class="code-theme-light">${htmlLight}</div>
                <div class="code-theme-dark">${htmlDark}</div>
            `;

            document.querySelectorAll('#code-block pre, #code-block code, #code-block .shiki, #code-block .shiki span').forEach(el => {
                el.style.fontFamily = "Consolas, 'Courier New', monospace";
            });
        }
    } catch (error) {
        console.error('Error rendering file:', error);
        throw error;
    }
}

// ---------- 假資料 ----------
function generatePlaceholderContent(fileName, language) {
    if (language === 'python') {
        return `# ${fileName}\n# This is a placeholder for demonstration purposes\n\ndef main():\n    print("This is a sample function in ${fileName}")\n\nif __name__ == "__main__":\n    main()`;
    } else if (language === 'markdown') {
        return `# ${fileName}\n\nThis is a placeholder markdown file.\n\n## Features\n\n- Feature A\n- Feature B\n\n\`\`\`python\nprint("Hello from markdown")\n\`\`\``;
    } else {
        return `// ${fileName}\n// Placeholder content`;
    }
}

renderFileTree();