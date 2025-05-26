document.addEventListener('DOMContentLoaded', function() {
    const infoBtn = document.getElementById('infoBtn');
    const modal = document.getElementById('Modal'); // ポップオーバー要素

    if (infoBtn && modal) {
        // ポップオーバーが開閉する前のイベントでアイコンを切り替え
        modal.addEventListener('beforetoggle', (event) => {
            if (event.newState === 'open') {
                // ポップオーバーが開く直前
                infoBtn.querySelector('img').src = 'icon/close.svg'; // 閉じるアイコンのパス
                infoBtn.setAttribute('aria-label', '説明を閉じる');
            } else if (event.newState === 'closed') {
                // ポップオーバーが閉じる直前
                infoBtn.querySelector('img').src = 'icon/info.svg'; // 元の情報アイコンのパス
                infoBtn.setAttribute('aria-label', '説明を開く');
            }
        });

        // ★ infoBtnのクリックイベントは不要です。
        // ★ popovertargetaction="toggle" がネイティブで開閉を処理します。
        // infoBtn.addEventListener('click', function() {
        //     modal.togglePopover();
        // });
    }

    // ★ポップオーバー内の閉じるボタンに関するコードは、HTMLでコメントアウトされているので、
    // ★JavaScriptからも完全に削除（またはコメントアウトのまま）で問題ありません。
    // （現在のinfo.jsでは既にそのようになっているので変更不要です）
});