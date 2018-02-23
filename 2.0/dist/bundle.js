/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Slider(slider) {

	let indicators = slider.parentNode.querySelectorAll('.indicator');
	Array.from(indicators).forEach((indicator, i) => {
		indicator.onclick = scrollTo(+indicator.innerText * width);
	});

	let images = slider.querySelectorAll('img');

	let width = slider.clientWidth;
	let height = slider.clientHeight;
	let slidesCount = slider.children.length;

	let isSliding = false;
	let startX = 0;
	let diff = 0;

	const scrollBySlide = direction => {
		if (slider.scrollLeft === 0 && direction === -1) {
			// scroll left
		} else if (slider.scrollLeft >= slider.scrollLeftMax - width * 2) {
			// Scroll right
		}
	};

	const swipeStart = e => {
		startX = e.clientX || e.touches[0].pageX;
		isSliding = true;
		e.preventDefault();
	};

	const swipeMove = e => {
		if (isSliding) {
			if (true) {}

			let newX = e.clientX || e.touches[0].pageX;
			diff = startX - newX;
			slider.scrollBy({ left: 25 * Math.sign(diff), behavior: 'smooth' });
		}
		e.preventDefault();
	};

	const swipeEnd = e => {
		isSliding = false;
		e.preventDefault();
	};

	slider.ondragstart = () => false;

	slider.onmousedown = swipeStart.bind(this);
	slider.ontouchstart = swipeStart.bind(this);

	slider.onmousemove = swipeMove.bind(this);
	slider.ontouchmove = swipeMove.bind(this);

	slider.ontouchend = swipeEnd.bind(this);
	slider.onmouseup = swipeEnd.bind(this);
}

for (let i = 0; i < 2; i++) {
	Slider(document.getElementById(`slider_${i}`));
}

/***/ })
/******/ ]);