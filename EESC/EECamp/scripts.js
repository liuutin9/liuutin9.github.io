document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const bodyContent = document.getElementsByClassName('bodyContent');
    const overlay = document.getElementById('overlay');
    const themeToggle = document.getElementById('theme-toggle');

    // Existing menu toggle functionality
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        for (let i = 0; i < bodyContent.length; i++) {
            bodyContent.item(i).classList.toggle('showNavigationBar');
        }
        overlay.classList.toggle('showNavigationBar');
    });

    // Existing overlay click functionality
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('show');
            for (let i = 0; i < bodyContent.length; i++) {
                bodyContent.item(i).classList.remove('showNavigationBar');
            }
            overlay.classList.remove('showNavigationBar');
        }
    });

    // 設置主題
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // 切換主題
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // 初始化主題
    function initTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    // 初始化主題
    initTheme();

    // 主題切換按鈕事件監聽器
    themeToggle.addEventListener('click', toggleTheme);

    // 監聽系統主題變化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });
});