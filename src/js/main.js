'use strict';

// Selecting elements
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.carousel__btn--left');
const btnRight = document.querySelector('.carousel__btn--right');

// Orden - default
slides.forEach(
	(slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);

// initial values

let curSlide = 0;
// avoid white spaces -> infinite carousel
let maxSlide = slides.length;

const goSlide = function () {
	slides.forEach(
		(slide, i) =>
			(slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
	);

	//0 - 1 = -1
	//1 - 1 = 0
	//2 - 1 = 1
};

btnRight.addEventListener('click', function () {
	if (curSlide === maxSlide - 1) {
		curSlide = 0;
	} else {
		curSlide++;
	}

	goSlide();
});

btnLeft.addEventListener('click', function () {
	if (curSlide === 0) {
		curSlide = maxSlide - 1;
	} else {
		curSlide--;
	}

	goSlide();
});
