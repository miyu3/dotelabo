document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // ハンバーガーメニューのトグル
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
            // メニューが開いたらbodyのスクロールを固定、閉じたら解除
            if (mainMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // ドロップダウンメニューのトグル (モバイル用)
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                // PC版のホバー機能を妨げないように、モバイルの場合のみ制御
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // デフォルトのリンク遷移を防ぐ
                    dropdown.classList.toggle('active'); // activeクラスをトグル
                }
            });
        }
    });

    // メニューが開いているときに画面サイズが変更されたらメニューを閉じる
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
            // ドロップダウンも閉じる
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // メニューが開いている状態で、メニュー外をタップしたら閉じる
    document.addEventListener('click', function(event) {
        if (mainMenu.classList.contains('active') && !mainMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            mainMenu.classList.remove('active');
            document.body.style.overflow = '';
            // ドロップダウンも閉じる
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる

    mainMenu.querySelectorAll('a').forEach(link => {
        // ドロップダウンのリンク（li.dropdown > a）ではない場合のみ処理
        // または、ul.dropdown-menu 内のリンクではない場合のみ
        if (!link.closest('.dropdown') || link.closest('.dropdown-menu')) { // mainMenu直下のaタグ、またはdropdown-menu内のaタグに適用
            link.addEventListener('click', function() {
                if (mainMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    // ドロップダウンも閉じる
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        }
    });
});