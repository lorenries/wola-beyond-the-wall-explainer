document.addEventListener('DOMContentLoaded', function() {

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


	var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OzEKDJnRVACx7eL-dF820sW1uF0fllI48l1Jbpo9j5I/edit?usp=sharing';

	function init() {
		Tabletop.init( { key: publicSpreadsheetUrl,
			callback: showInfo,
			simpleSheet: true } )
	}

	var contentContainer = document.querySelector('#content-container')

	function showInfo(data, tabletop) {
		console.log(data);

		var wall = document.createElement('div');
		wall.setAttribute('id', 'content');
		wall.setAttribute('data-category', 'wall');
		var borderPatrol = document.createElement('div');
		borderPatrol.setAttribute('id', 'content');
		borderPatrol.setAttribute('data-category', 'bp');
		var ice = document.createElement('div');
		ice.setAttribute('id', 'content');
		ice.setAttribute('data-category', 'ice');
		var daca = document.createElement('div');
		daca.setAttribute('id', 'content');
		daca.setAttribute('data-category', 'daca');

		for (var i = 0; i < data.length; i++) {

			var template = `
			<h1 class="f3 bg-near-white br3 br--top wola-gray mv0 pa3">${data[i].title}</h1>
			<div class="pa3 bt b--black-10 lh-copy f5">
			${data[i].content}
			</div>
			`

			var wrapper = document.createElement('div');
			wrapper.classList.add('ba', 'br3', 'b--light-gray', 'mb4');
			wrapper.innerHTML = template;

			if (data[i].category === 'wall') {
				
				wall.append(wrapper);

			} else if (data[i].category === 'bp') {

				borderPatrol.append(wrapper);

			}

		}

	contentContainer.append(wall);

	function addEventListenerList(list, event, fn) {
	    for (var i = 0, len = list.length; i < len; i++) {
	        list[i].addEventListener(event, fn, false);
	    }
	}

	function changeContent(e) {
		
		e.preventDefault();

		var currentContent = document.querySelector('#content');
		var currentTitle = document.querySelector('#contentTitle');
;
		if (e.target.hash === '#bp' && currentContent.getAttribute('data-category') != 'bp') {

			var newTitle = "Increasing Border Patrol";

			contentContainer.append(borderPatrol);
			animateChange(currentContent, borderPatrol, currentTitle, newTitle);

		} else if (e.target.hash === '#wall' && currentContent.getAttribute('data-category') != 'wall') {
			
			var newTitle = "The Border Wall";

			contentContainer.append(wall);
			animateChange(currentContent, wall, currentTitle, newTitle);
		}
	}

	function animateChange(oldContent, newContent, currentTitle, newTitle) {
		
		oldContent.style.position = 'absolute';

		var titleFadeOut = currentTitle.animate ({
			opacity: [1,0]
		}, 600);

		var titleFadeIn = currentTitle.animate ({
			opacity: [0,1]
		}, 600);

		titleFadeOut.onfinish = function() {
			currentTitle.innerHTML = newTitle;
		}

		var fadeOut = oldContent.animate({
		  opacity: [1, 0]
		}, 600);

		var fadeIn = newContent.animate({
		  opacity: [0, 1]
		}, 600);

		fadeIn.onfinish = function() {
		  oldContent.parentNode.removeChild(oldContent);
		};
	}

	var links = document.querySelectorAll('.js-link-interrupt');

	addEventListenerList(links, 'click', changeContent)

	}

	init();


}, false);



