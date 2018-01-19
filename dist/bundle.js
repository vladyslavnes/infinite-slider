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

class Slider {
	constructor(width = 700, height = 300, slidesCount = 4, autoSlide = true) {
		this.width = width;
		this.height = height;
		this.slidesCount = slidesCount;
		this.autoSlide = autoSlide;
		this.hash = `slider_${String(Math.random()).slice(2)}`;
	}

	loadImages() {
		var paths = [];
		for (let i = 0; i < this.slidesCount; i++) {
			paths[i] = `http://lorempixel.com/${this.width}/${this.height}/nature/${i + 1}/`;
		}
		return paths;
	}

	scrollBy(amount) {
		let slider = document.getElementById(this.hash);
		slider.scrollBy({ top: 0, left: amount, behavior: 'smooth' });
	}

	scrollSlide(direction) {
		let slider = document.getElementById(this.hash);
		if (direction === 'left') {
			this.scrollBy(this.width);
			let first = slider.children[0];
			slider.children[0].remove();
			slider.append(first);
		} else {
			this.scrollBy(-this.width);
			let last = slider.children[slider.children.length - 1];
			slider.children[slider.children.length - 1].remove();
			slider.prepend(last);
		}
	}

	autoScroll() {
		if (this.autoSlide) {
			this.scrollTimer = setInterval(e => {
				this.scrollSlide('left');
			}, 5000);
		}
	}

	swipeStart(e) {
		this.swiping = true;
		this.startX = e.pageX;
		clearInterval(this.scrollTimer);
	}

	swipeMove(e) {
		let slider = document.getElementById(this.hash);
		let diff = e.touches ? e.touches[0].pageX - this.startX : e.pageX - this.startX;
		if (this.swiping) {
			if (diff > 0) {
				slider.scrollLeft -= this.width / 100;
			} else {
				slider.scrollLeft += this.width / 100;
			}
		}
		e.preventDefault();
	}

	swipeEnd(e) {
		this.swiping = false;
		if (e.touches) {
			// mobile (touchscreen)
			if (e.pageX < this.startX) {
				this.scrollSlide('left');
			} else {
				this.scrollSlide('right');
			}
		} else {
			// desktop (mouse)
			if (e.pageX < this.startX) {
				this.scrollSlide('left');
			} else {
				this.scrollSlide('right');
			}
		}
		this.autoScroll();
	}

	addEvents() {
		this.startX = undefined;

		let slider = document.getElementById(this.hash);
		slider.ondragstart = () => false;

		slider.onmousedown = this.swipeStart.bind(this);
		slider.onmousemove = this.swipeMove.bind(this);
		slider.onmouseup = this.swipeEnd.bind(this);

		slider.ontouchstart = this.swipeStart.bind(this);
		slider.ontouchmove = this.swipeMove.bind(this);
		slider.ontouchend = this.swipeEnd.bind(this);
	}

	render() {
		this.autoScroll();
		return `<div style="width: ${this.width}px; height: ${this.height}px" class="slider-container" id="${this.hash}">
			${this.loadImages().map(path => `<img draggable="false" src="${path}">`).join('')}
		</div>`;
	}
}

let slider = new Slider();
document.getElementById('root').innerHTML += slider.render();
slider.addEvents();

/***/ })
/******/ ]);