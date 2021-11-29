'use strict';

// Selecting elements - carousel
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.carousel__btn--left');
const btnRight = document.querySelector('.carousel__btn--right');
// Selecting elements - navigation
const btnNav = document.querySelector('#nav-toggle');
const headerEl = document.querySelector('.header');
const navEl = document.querySelector('.navigation');
const navIcon = document.querySelector('.navigation__ico');
const logoEl = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.navigation__item');
const navList = document.querySelector('.navigation__list');

// ------------------------------------------------
// Carousel ---------------------------------------
// ------------------------------------------------

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

const goRight = function () {
	if (curSlide === maxSlide - 1) {
		curSlide = 0;
	} else {
		curSlide++;
	}

	goSlide();
};

const goLeft = function () {
	if (curSlide === 0) {
		curSlide = maxSlide - 1;
	} else {
		curSlide--;
	}

	goSlide();
};

// arrows
btnRight.addEventListener('click', goRight);

btnLeft.addEventListener('click', goLeft);

// keyboard
document.addEventListener('keydown', e => {
	if (e.key === 'ArrowRight') {
		goRight();
	}
	if (e.key === 'ArrowLeft') {
		goLeft();
	}
});

// ------------------------------------------------
// Navigation --------------------------------------
// ------------------------------------------------

let active = true; //guard clouse

const config = (img1, img2) =>
	active ? (navIcon.src = img1) : (navIcon.src = img2);

config('./icon-hamburger.svg', './icon-close.svg');

btnNav.addEventListener('click', () => {
	navEl.classList.toggle('show-nav');
	logoEl.classList.toggle('hidden');

	// change icon
	config('./icon-close.svg', './icon-hamburger.svg');

	active = !active;
});

const closeNav = () => {
	navEl.classList.toggle('show-nav');
	logoEl.classList.toggle('hidden');
	navIcon.src = './icon-hamburger.svg';
	active = true;
};

// main menu -> inesperate case
setInterval(() => {
	if (window.innerWidth >= 680 && navEl.classList.contains('show-nav')) {
		closeNav();
	}
}, 500);

// ------------------------------------------------
// redirect navigation ----------------------------
// ------------------------------------------------

const closeMenu = function (links) {
	links.forEach(link =>
		link.addEventListener('click', function () {
			closeNav();
		})
	);
};

closeMenu(navLinks);

navList.addEventListener('click', function (e) {
	e.preventDefault();

	const item = e.target.closest('.navigation__link');

	//Guard clouse
	if (!item) return;

	const id = item.getAttribute('href');

	let el;
	if (id === '#') {
		return;
	} else {
		el = document.querySelector(id);
	}

	el.scrollIntoView({ behavior: 'smooth' });
});
