// Проверка браузера
if ( !supportsCssVars() ) {
	document.getElementsByTagName('body').classList.add("lock");
	document.getElementsByClassName('supports_error').classList.add("show");
}


// LazyLoad
setTimeout(function(){
	observer = lozad('.lozad', {
		rootMargin: '200px 0px',
		threshold: 0,
		loaded: function(el) {
			el.classList.add('loaded')
		}
	})

	observer.observe()
}, 200)


// Accordion
var accordionItemTitles = document.querySelectorAll(".accordion .open_btn");

for (var i = 0; i < accordionItemTitles.length; i++) {
	accordionItemTitles[i].addEventListener("click", function (event) {
		event.preventDefault();
		event.target.classList.toggle("active");
		var accordionItemContent = event.target.nextElementSibling;

		if (!accordionItemContent.classList.contains('active')) {
			accordionItemContent.classList.add('active');
			accordionItemContent.style.height = 'auto';

			var height = accordionItemContent.clientHeight + 'px';

			accordionItemContent.style.height = '0px';

			setTimeout(function () {
				accordionItemContent.style.height = height;
			}, 0);
		} else {
			accordionItemContent.style.height = '0px';

			accordionItemContent.addEventListener('transitionend', function () {
				accordionItemContent.classList.remove('active');
			}, {
				once: true
			});
		}
	});
}

var accordionItemTitles = document.querySelectorAll(".why_choose .item .name");

for (var i = 0; i < accordionItemTitles.length; i++) {
	accordionItemTitles[i].addEventListener("click", function (event) {
		if (window.innerWidth < 480) {
			event.preventDefault();
			event.target.classList.toggle("active");
			var accordionItemContent = event.target.nextElementSibling;

			if (!accordionItemContent.classList.contains('active')) {
				accordionItemContent.classList.add('active');
				accordionItemContent.style.height = 'auto';

				var height = accordionItemContent.clientHeight + 'px';

				accordionItemContent.style.height = '0px';

				setTimeout(function () {
					accordionItemContent.style.height = height;
				}, 0);
			} else {
				accordionItemContent.style.height = '0px';

				accordionItemContent.addEventListener('transitionend', function () {
					accordionItemContent.classList.remove('active');
				}, {
					once: true
				});
			}
		}
	});
}

// Read more
document.querySelectorAll('.read_more button').forEach(function(el, index){
	el.addEventListener("click", function(e){
		e.preventDefault()

		e.target.parentElement.closest('.hide').querySelectorAll('.hidden_mob').forEach(function(el, index){
			el.classList.add('active');
			el.style.height = 'auto';

			var height = el.clientHeight + 'px';

			el.style.height = '0px';

			setTimeout(function () {
				el.style.height = height;
			}, 0);
		})

		e.target.parentElement.parentElement.classList.add('active')
	})
})


// Scroll to anchor
document.querySelectorAll('[data-anchor]').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('data-anchor').substring(1);

        const scrollTarget = document.getElementById(href);

        let topOffset = 30; // если не нужен отступ сверху

        if (this.getAttribute('data-offset')) {
        	topOffset = this.getAttribute('data-offset')
        }
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });

        if (window.innerWidth < 1025) {
        	if (this.closest('header') && document.querySelector('header .wrap_menu').classList.contains('visible')) {
				document.querySelector('header .overlay').classList.remove('visible')
				document.querySelector('header .wrap_menu').classList.remove('visible')
				document.querySelector('.mob_menu_link').classList.remove('active')
				document.querySelector('body').classList.remove('lock')
        	}
        }
    });
});

// Mob menu
document.querySelector('.mob_menu_link').addEventListener("click", function(e){
	e.preventDefault()

	if ( this.classList.contains('active') ) {
		this.classList.remove('active')

		document.querySelector('header .wrap_menu').classList.remove('visible')
		document.querySelector('header .overlay').classList.remove('visible')
		document.querySelector('body').classList.remove('lock')
	} else {
		this.classList.add('active')

		document.querySelector('header .wrap_menu').classList.add('visible')
		document.querySelector('header .overlay').classList.add('visible')
		document.querySelector('body').classList.add('lock')

		window.scrollBy({
	        top: -100,
	        behavior: 'smooth'
	    });
	}
})

// Close mob menu
document.querySelector('.overlay').addEventListener("click", function(e){
	e.preventDefault()

	if ( this.classList.contains('visible') ) {
		this.classList.remove('visible')

		document.querySelector('header .wrap_menu').classList.remove('visible')
		document.querySelector('.mob_menu_link').classList.remove('active')
		document.querySelector('body').classList.remove('lock')
	}
})



function supportsCssVars() {
	var s = document.createElement('style'),
	support

	s.innerHTML = ":root { --tmp-var: bold; }"
	document.head.appendChild(s)
	support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
	s.parentNode.removeChild(s)

	return support
}


function setHeight(className){
	let maxheight = 0

	className.each(function() {
		let elHeight = this.offsetHeight

		if( elHeight > maxheight ) {
			maxheight = elHeight
		}
	})

	className.each(function() {
		this.style.height = maxheight + 'px';
	})
}