// gif.js の内容を、以下のパターンで各GIFごとに修正してください
// 例: bowling の場合

// gif.js の内容を全て以下のコードに置き換えてください

// gif.js の内容を全て以下のコードに置き換えてください

document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768; // モバイル判定 (初期ロード時)
    const MAX_MOBILE_PLAY_COUNT = 3; // ★モバイルでの最大再生（表示）回数
    const GIF_DISPLAY_DURATION = 2000; // ★GIFを表示する時間（ミリ秒）。例: 2秒

    // 各GIFの静止画とGIFのパスのペアを定義
    // ★ここを、あなたの全ての静止画-GIFの組み合わせに合わせて正確に設定してください。
    //   キーが静止画のパス、値がGIFのパスです。
    const gifConfigurations = [
        { static: "02images/02-02.jpg", gif: "gif/bowling.gif" },
        { static: "03images/03-03.jpg", gif: "gif/carrace.gif" },
        { static: "06images/06-01.jpg", gif: "gif/cottage.gif" },
        { static: "02images/02-01.jpg", gif: "gif/footsal.gif" }, // HTML/CSSから推測
        { static: "02images/02-05.jpg", gif: "gif/health.gif" },
        { static: "01images/01-06.jpeg", gif: "gif/pinball.gif" },
        { static: "03images/03-04.jpg", gif: "gif/sori.gif" },
        { static: "01images/01-01.jpeg", gif: "gif/suberidai.gif" },
        { static: "01images/01-07.jpeg", gif: "gif/tarzan.gif" }, // 01play.htmlの例
        // ★他のGIFもここに追加してください（現在のgif.jsの内容を参考に正確に記述）
        //   例: { static: "path/to/static_image.jpg", gif: "path/to/animated_gif.gif" },
    ];

    // GIFをプリロードするマップ (URL -> Imageオブジェクト)
    const preloadedGifs = new Map();
    gifConfigurations.forEach(config => {
        if (!preloadedGifs.has(config.gif)) {
            const img = new Image();
            img.src = config.gif;
            preloadedGifs.set(config.gif, img);
        }
    });

    // 各GIF設定を処理
    gifConfigurations.forEach(config => {
        const imgElement = document.querySelector(`img[src="${config.static}"]`);

        if (!imgElement) {
            console.warn(`Static image element not found for: ${config.static}. Skipping.`);
            return; // 要素が見つからない場合はスキップ
        }

        let mobilePlayCount = 0; // このGIFのモバイルでの表示回数
        let isCurrentlyGif = false; // 現在GIFが表示されているかどうかのフラグ
        let returnToStaticTimeout = null; // 静止画に戻すためのタイマーID

        // PCとモバイルで処理を分岐
        if (isMobile) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { // 画面内に入った場合
                        // まだ最大再生回数に達しておらず、かつ現在GIFが表示されていない場合
                        if (mobilePlayCount < MAX_MOBILE_PLAY_COUNT && !isCurrentlyGif) {
                            // GIFが表示されるまでの遅延
                            setTimeout(() => {
                                // 遅延中に画面外に出ていないか、または他の操作でsrcが変わっていないか最終確認
                                if (entry.isIntersecting && imgElement.src !== config.gif) {
                                    imgElement.src = config.gif; // GIFに切り替える
                                    isCurrentlyGif = true; // GIFが表示中とマーク

                                    mobilePlayCount++; // 再生回数をカウントアップ
                                    // console.log(`${config.static} played. Count: ${mobilePlayCount}`); // デバッグ用

                                    // 静止画に戻すタイマーを設定
                                    clearTimeout(returnToStaticTimeout); // 既存のタイマーをクリア
                                    returnToStaticTimeout = setTimeout(() => {
                                        if (isCurrentlyGif) { // まだGIFが表示中であれば
                                            imgElement.src = config.static; // 静止画に戻す
                                            isCurrentlyGif = false;
                                        }
                                    }, GIF_DISPLAY_DURATION);
                                }
                            }, 1000); // 1秒の遅延
                        }
                    } else { // 画面外に出た場合
                        // GIFが表示中であれば、静止画に戻す
                        if (isCurrentlyGif) {
                            clearTimeout(returnToStaticTimeout); // 自動で静止画に戻るタイマーをキャンセル
                            imgElement.src = config.static;
                            isCurrentlyGif = false;
                        }
                        // ★変更点: 画面外に出たときにカウントをリセット
                        mobilePlayCount = 0;
                        // console.log(`${config.static} went out of view. Count reset to 0.`); // デバッグ用
                    }
                });
            }, { threshold: 0.5 }); // 要素の50%が見えたら発火 (必要に応じて調整)

            observer.observe(imgElement); // 監視を開始

        } else {
            // PCの場合: ホバーでGIF再生 (変更なし)
            imgElement.addEventListener('mouseenter', () => {
                imgElement.src = config.gif;
            });

            imgElement.addEventListener('mouseleave', () => {
                imgElement.src = config.static;
            });
        }
    });
});