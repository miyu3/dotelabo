		$(function() {
			var topBtn = $('#fade-btn1');	
			topBtn.hide();
			//スクロールが100に達したらボタン表示
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					topBtn.fadeIn();
				} else {
					topBtn.fadeOut();
				}
			});
		});

        $(function() {
			var topBtn = $('#fade-btn2');	
			topBtn.hide();
			//スクロールが100に達したらボタン表示
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					topBtn.fadeIn();
				} else {
					topBtn.fadeOut();
				}
			});
			// //スクロールしてトップ
		    // topBtn.click(function () {
			// 	$('body,html').animate({
			// 		scrollTop: 0
			// 	}, 500);
			// 	return false;
		    // });
		});