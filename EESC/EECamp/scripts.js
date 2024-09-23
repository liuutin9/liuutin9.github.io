document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const bodyContent = document.getElementsByClassName('bodyContent');
    const overlay = document.getElementById('overlay');

    // 切換側邊欄的顯示與隱藏
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        for (let i = 0; i < bodyContent.length; i++) {
            bodyContent.item(i).classList.toggle('showNavigationBar');
        }
        overlay.classList.toggle('showNavigationBar');
    });

    // 點擊側邊欄外的地方時隱藏側邊欄
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('show');
            for (let i = 0; i < bodyContent.length; i++) {
                bodyContent.item(i).classList.remove('showNavigationBar');
            }
            overlay.classList.remove('showNavigationBar');
        }
    });
});