document.addEventListener('DOMContentLoaded', function() {

// Initialize feather icons 

    feather.replace({ "height": "1em", "width": "1em" });

// Initialize polyfill for 'position: sticky'

    new StickyState(document.querySelectorAll('.sticky'));

// Popup Function

function popup() {

    var popup = document.querySelector('.js-popup');
    var popupClose = document.querySelector('.js-close-popup');
    var footerHeight = document.querySelector('footer').offsetHeight;

    function scrollFn() {

        if (window.pageYOffset > 500 < ( (document.body.clientHeight - footerHeight) - (window.pageYOffset + window.innerHeight) ) ) {

            popup.classList.remove('dn');

        } else if ( (window.pageYOffset + window.innerHeight) >= (document.body.clientHeight - footerHeight)) {

            popup.classList.add('dn');

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

}

// Content Logic Here

    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1OzEKDJnRVACx7eL-dF820sW1uF0fllI48l1Jbpo9j5I/edit?usp=sharing';

    function init() {
        Tabletop.init({
            key: publicSpreadsheetUrl,
            callback: showInfo,
            simpleSheet: true
        })
    }

    function showInfo(data, tabletop) {

        var contentContainer = document.querySelector('#content-container')
		var navLinks = document.querySelectorAll('.js-link-interrupt');
		var intro = document.querySelector('#intro');

        var content = {
            'wall': {
                'html': '',
                'glance': '',
                'title': 'The Border Wall'
            },
            'bp': {
                'html': '',
                'glance': '',
                'title': 'Increasing Border Patrol'
            },
            'ice': {
                'html': '',
                'glance': '',
                'title': 'Increasing the ICE Deportation Force'
            },
            'daca': {
                'html': '',
                'glance': '',
                'title': 'Rescinding DACA'
            }
        };


        for (var i = 0; i < data.length; i++) {

            var wrapper = `
			<section class="ba br3 b--light-gray mb4">
				<h1 class="f3 bg-near-white br3 br--top wola-gray mv0 pa3">${data[i].title}</h1>
				<div class="pa3 bt b--black-10 lh-copy f5">
					${data[i].content}
				</div>
			</section>
			`

            if (data[i].category === 'wall') {

            	if (data[i].title === 'At a Glance') {
            	  content.wall.glance = data[i].content;
            	} else {
            		content.wall.html += wrapper;
            	}

            } else if (data[i].category === 'bp') {

            	if (data[i].title === 'At a Glance') {
            	  content.bp.glance = data[i].content;
            	} else {
            		content.bp.html += wrapper;
            	}

            } else if (data[i].category === 'ice') {

            	if (data[i].title === 'At a Glance') {
            	  content.ice.glance = data[i].content;
            	} else {
            		content.ice.html += wrapper;
            	}

            } else {

            	if (data[i].title === 'At a Glance') {
            	  content.daca.glance = data[i].content;
            	} else {
            		content.daca.html += wrapper;
            	}

            }

        }

        function generateHtml(title, glance, content) {
            return `
			<h1 class="wola-gray f2 tc pt1 w-100">${title}</h1>
			<div class="w-100 w-third-ns pr0 pr2-m pr4-l pb3 pb0-l center dib">
				<aside>
				<h1 class="wola-gray f3 mv0 pv3 bb b--light-gray">At a Glance</h1>
				${glance}
				<a href="https://www.wola.org/beyond-wall-campaign/" target="_blank" class="dib link no-underline grow pa3 ba bw1 b--wola-blue wola-blue br3 fw6 mt2">Take Action</a>
				</aside>
			</div>
			<div id="content-container" class="w-100 w-two-thirds-ns pl0 pl2-m pl4-l">
				${content}
			</div>
			`
        }

        contentContainer.innerHTML = generateHtml(content.wall.title, content.wall.glance, content.wall.html);
        contentContainer.setAttribute('data-category', 'wall');

        popup();

        addEventListenerList(navLinks, 'click', routeLinks)

        function addEventListenerList(list, event, fn) {
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].addEventListener(event, fn, false);
            }
        }

        function routeLinks(e) {
            e.preventDefault();
            if (e.target.hash === '#bp' && contentContainer.getAttribute('data-category') != 'bp') {

                changeContent(e, content.bp.title, content.bp.glance, content.bp.html, 'bp');

            } else if (e.target.hash === '#wall' && contentContainer.getAttribute('data-category') != 'wall') {
            	
            	changeContent(e, content.wall.title, content.wall.glance, content.wall.html, 'wall');

            } else if (e.target.hash === '#ice' && contentContainer.getAttribute('data-category') != 'ice') {

            	changeContent(e, content.ice.title, content.ice.glance, content.ice.html, 'ice');

            } else if (e.target.hash === '#daca' && contentContainer.getAttribute('data-category') != 'daca') {

            	changeContent(e, content.daca.title, content.daca.glance, content.daca.html, 'daca');
            }
        }

        function changeContent(e, title, glance, content, attr) {
        	resetLinkClasses(navLinks);
        	contentContainer.innerHTML = generateHtml(title, glance, content);
        	contentContainer.setAttribute('data-category', attr);
        	setYPosition(intro);
        	e.target.classList.add('disabled', 'wola-blue');
        	e.target.classList.remove('hover-wola-blue', 'wola-gray');
        }

        function resetLinkClasses(list) {
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].classList.remove('disabled', 'wola-blue');
                list[i].classList.add('wola-gray', 'hover-wola-blue');
            }
        }

        function setYPosition(el) {
        	var yPos = getYCoord(el);
        	window.scrollTo(0, yPos);
        }

        function getYCoord(el) {
          let box = el.getBoundingClientRect();
          return box.bottom + pageYOffset;
        }

    }

    init();

}, false);