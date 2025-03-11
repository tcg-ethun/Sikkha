    function showPage(pageId) {
        document.querySelectorAll('.content').forEach(page => {
            page.classList.remove('active');
        });

        document.getElementById(pageId).classList.add('active');

        localStorage.setItem('currentPage', pageId);
    }

    window.onload = function () {
        let savedPage = localStorage.getItem('currentPage') || 'home';
        showPage(savedPage);
    };