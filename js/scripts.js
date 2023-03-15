function initSlider() {
	// Reviews
	if (document.querySelectorAll(".reviews .slider").length) {
		new Swiper('.reviews .slider', {
			spaceBetween: 40,
			slidesPerView: 'auto',
			loop: false,
			speed: 750,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					freeMode: true,
				},
				'480': {
					spaceBetween: 15,
					freeMode: true,
				},
				'768': {
					spaceBetween: 30,
					freeMode: true,
				},
				'1025': {
					spaceBetween: 40,
					freeMode: false,
				},
			},
			on: {
				init: function (swiper) {
					if (!swiper.$el.find('.swiper-wrap').length) {
						// Обертка тела слайдера
						let tables = swiper.$el.find('.swiper-wrapper'),
						length = tables.length,
						i, wrapper;

						for (i = 0; i < length; i++) {
							wrapper = document.createElement('div');
							wrapper.setAttribute('class', 'swiper-wrap');
							tables[i].parentNode.insertBefore(wrapper, tables[i]);
							wrapper.appendChild(tables[i]);
						}
					}

					// Выравнивание высоты
					swiper.$el.find('.slide').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .text').each( function() {this.style.height = 'auto'})

					setTimeout(function(){
						setHeight( swiper.$el.find('.slide') )
						setHeight( swiper.$el.find('.slide .text') )
					}, 200)
				},
				resize: function (swiper) {
					swiper.$el.find('.slide').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .text').each( function() {this.style.height = 'auto'})

					setTimeout(function(){
						setHeight( swiper.$el.find('.slide') )
						setHeight( swiper.$el.find('.slide .text') )
					}, 200)
				}
			}
		})
	}

	// Product
	if (document.querySelectorAll(".product_info .big .slider").length) {
		$productSwiper = new Swiper('.product_info .big .slider', {
			spaceBetween: 0,
			loop: false,
			loopedSlides: 1,
			slidesPerView: 1,
			speed: 500,
			preloadImages: false,
			watchOverflow: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				slideChange: function (swiper) {
					document.querySelectorAll('.product_info .thumbs .img').forEach(element => element.classList.remove('active'))

					document.querySelectorAll('.product_info .thumbs .item')[swiper.realIndex].querySelector('.img').classList.add('active')
				}
			}
		})
	}

	document.querySelectorAll('.product_info .thumbs .img').forEach(function(el, index){
		el.addEventListener("click", function(e){
			e.preventDefault()

			if( !this.classList.contains('active') ) {
				document.querySelectorAll('.product_info .thumbs .img').forEach(element => element.classList.remove('active'))

				el.classList.add('active')

				$productSwiper.slideToLoop(index)
			}
		})
	})


	// Additional reviews
	if (document.querySelectorAll(".additional_reviews .slider").length) {
		new Swiper('.additional_reviews .slider', {
			spaceBetween: 40,
			slidesPerView: 'auto',
			preloadImages: true,
			loop: true,
			speed: 750,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					freeMode: true,
				},
				'480': {
					spaceBetween: 15,
					freeMode: true,
				},
				'768': {
					spaceBetween: 30,
					freeMode: true,
				},
				'1025': {
					spaceBetween: 40,
					freeMode: false,
				},
			},
			on: {
				init: function (swiper) {
					if (!swiper.$el.find('.swiper-wrap').length) {
						// Обертка тела слайдера
						let tables = swiper.$el.find('.swiper-wrapper'),
						length = tables.length,
						i, wrapper;

						for (i = 0; i < length; i++) {
							wrapper = document.createElement('div');
							wrapper.setAttribute('class', 'swiper-wrap');
							tables[i].parentNode.insertBefore(wrapper, tables[i]);
							wrapper.appendChild(tables[i]);
						}
					}

					// Выравнивание высоты
					swiper.$el.find('.slide').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .title').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .text').each( function() {this.style.height = 'auto'})

					setTimeout(function(){
						setHeight( swiper.$el.find('.slide') )
						setHeight( swiper.$el.find('.slide .title') )
						setHeight( swiper.$el.find('.slide .text') )
					}, 200)
				},
				resize: function (swiper) {
					swiper.$el.find('.slide').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .title').each( function() {this.style.height = 'auto'})
					swiper.$el.find('.slide .text').each( function() {this.style.height = 'auto'})

					setTimeout(function(){
						setHeight( swiper.$el.find('.slide') )
						setHeight( swiper.$el.find('.slide .title') )
						setHeight( swiper.$el.find('.slide .text') )
					}, 200)
				}
			}
		})
	}
}

initSlider()

// Set link
var price = 68.00;
var discountPrice = 79.99;
const link = 'order.stronewallet.com';
const discounts = {
	1: 0.95,
	2: 0.9,
	3: 0.85,
	4: 0.8,
}
const setLink = () => {
	let dataId = document.querySelector('input[name="color"]').getAttribute('data-id');
	let dataAmount = 1;

	document.querySelectorAll('input[name="color"]:checked').forEach((item, itemIndex) => {
		dataId = item.getAttribute('data-id')
	});

	document.querySelectorAll('input[name="quantity"]:checked').forEach((item, itemIndex) => {
		dataAmount = item.value
	});

	var discountCoff = 1;

	if (dataAmount in discounts) {
		discountCoff = discounts[dataAmount]
	} else if (dataAmount > Object.keys(discounts).length) {
		discountCoff = discounts[Object.keys(discounts).length]
	}

	var newPrice = dataAmount * discountPrice;
	var newDiscountPrice = dataAmount * price * discountCoff;

	document.querySelectorAll("[data-price]").forEach((element) => {
	    element.innerHTML = "$" + newPrice.toFixed(2)
	})

	document.querySelectorAll("[data-discount-price]").forEach((element) => {
	    element.innerHTML = "$" + newDiscountPrice.toFixed(2)
	})


	const productBtn = document.querySelector('.checkout-btn');
	productBtn.setAttribute('href', `https://${link}/cart/${dataId}:${dataAmount}/`);
}

document.querySelectorAll('input[name="color"], input[name="quantity"]').forEach((input) => {
	input.onchange = (item) => {
		setLink()
    };
});

setTimeout(function () {
	setLink();
}, 1000);