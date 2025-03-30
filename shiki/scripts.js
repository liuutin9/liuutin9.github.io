import { codeToHtml } from 'https://esm.sh/shiki';

async function fetchAndHighlightCode() {
    try {
        // 讀取 script.py 檔案內容
        const response = await fetch('script.py');
        if (!response.ok) throw new Error('Failed to fetch script.py');
        
        const code = await response.text(); // 轉換成文字
        
        // 使用 shiki 進行語法高亮
        const html = await codeToHtml(code, {
            lang: 'python',
            theme: 'dark-plus'
        });

        // 插入到頁面中
        document.getElementById('code-block').innerHTML = html;
    } catch (error) {
        console.error('Error fetching or highlighting code:', error);
    }
}

fetchAndHighlightCode();