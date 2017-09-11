document.addEventListener('DOMContentLoaded', function(e) {

	feather.replace( {"height":"1em", "width": "1em"} );

	new StickyState(document.querySelectorAll('.sticky'));

	var disabledLink = document.querySelector('.disabled');
	
	if (disabledLink) {
		disabledLink.addEventListener('click', function(e) { e.preventDefault(); });
	}

	var popup = document.querySelector('.js-popup');

	var popupClose = document.querySelector('.js-close-popup');

	function scrollFn() {

		if(window.pageYOffset > 500) {

			popup.classList.remove('dn');

			return;

		}
	}


	if (popup) {
		document.addEventListener('scroll', scrollFn, false);
	}

	if (popupClose) {

		popupClose.addEventListener('click', function(e) {

			e.preventDefault();
			popup.classList.add('dn');

			// kill scroll listener
			document.removeEventListener('scroll', scrollFn, false);


		}, false);
	}



}, false);



