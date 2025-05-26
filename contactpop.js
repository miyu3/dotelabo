
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.c-form'); // あなたのフォームのクラス名
  const thankYouPopup = document.getElementById('thankYouPopup');
  const popupCloseButtons = thankYouPopup.querySelectorAll('.popup-close'); // ×ボタンと閉じるボタン

  // Googleフォームのaction URLをここに入力します
  // あなたのフォームの `action` 属性の値です
  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScTWc8i-vk9fJFF6aSvThGpqd7jEB0rcFM1qDSQvlgFEsTMag/formResponse';

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // デフォルトの送信（ページ遷移）をキャンセル

    // フォームのデータを取得
    const formData = new FormData(form);
    const urlEncodedData = new URLSearchParams(formData).toString();

    // フォームの送信ボタンを一時的に無効化して多重送信を防ぐ
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '送信中...';
    }

    // Googleフォームへの送信
    fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors', // CORSエラーを回避するために重要
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlEncodedData
    })
    .then(response => {
      // no-corsモードではレスポンスのステータスを直接確認できませんが、
      // リクエストはGoogleフォームに送信されています。
      console.log('Googleフォームにデータが送信されました。');

      // フォームをリセット
      form.reset();

      // ポップアップを表示
      thankYouPopup.classList.add('active');

      // ボタンを有効に戻す
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
      }
    })
    .catch(error => {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。'); // エラーメッセージを表示
      // ボタンを有効に戻す
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
      }
    });
  });

  // ポップアップの閉じるボタン（×と「閉じる」）のイベントリスナー
  popupCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      thankYouPopup.classList.remove('active');
    });
  });

  // ポップアップのオーバーレイをクリックしたら閉じる
  thankYouPopup.addEventListener('click', function(event) {
    if (event.target === thankYouPopup) { // オーバーレイ自体がクリックされた場合のみ閉じる
      thankYouPopup.classList.remove('active');
    }
  });
});