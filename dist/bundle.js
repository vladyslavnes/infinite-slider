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
	constructor(dest) {
		this.slider = dest;
		this.height = this.slider.children[0].naturalHeight;
		this.width = this.slider.children[0].naturalWidth;
		this.slidesCount = this.slider.children.length;
		this.hash = 'slider_' + String(Math.random()).slice(2);

		dest.style.width = this.width;
		dest.style.height = this.height;

		let div = document.createElement('div');
		dest.appendChild(div);

		this.images = Array.from(dest.querySelectorAll('img'));

		this.images.forEach(img => {
			div.appendChild(img);
			img.style.width = this.width;
			img.style.height = this.height;
		});

		this.slider.innerHTML = this.render();
		this.slider = this.slider.querySelector('.slider-container');
		this.addEvents();
	}

	scrollTo(amount, instantly = false) {
		if (instantly) {
			this.slider.scrollTo({ top: 0, left: amount });
		} else {
			this.slider.scrollTo({ top: 0, left: amount, behavior: 'smooth' });
		}
	}

	swipeStart(e) {
		this.sliding = true;
		this.startX = e.pageX;
		this.diff = 0;
		e.preventDefault();
	}

	swipeMove(e) {
		this.diff = e.touches ? e.touches[0].pageX - this.startX : e.pageX - this.startX;
		if (this.sliding) {
			this.slider.scrollBy({ top: 0, left: -this.diff, behavior: 'smooth' });
		}
		e.preventDefault();
	}

	activateIndicator(index) {
		let indicators = Array.from(document.querySelectorAll(`#${this.hash} .indicators .indicator`));
		indicators.forEach((indicator, i) => {
			indicator.style.backgroundColor = '';
			if (index === i) indicator.style.backgroundColor = '#000000aa';
		});
	}

	swipeEnd(e) {
		const closest = (n, m) => {
			// round n to closest factor of m
			// get the quotient
			let resto = n % m;
			// return rounded down or up based on what is closer
			return resto <= m / 2 ? n - resto : n + m - resto;
		};

		this.sliding = false;
		let slidePosition = closest(this.slider.scrollLeft, this.width);
		this.scrollTo(slidePosition);

		this.activateIndicator(slidePosition / this.width);

		if (this.diff === 0) return false;

		let images = this.slider.children;

		if (slidePosition === 0) {
			this.slider.insertBefore(images[images.length - 1], images[0]);
			this.scrollTo(this.width, true);
		}

		if (slidePosition === this.slider.scrollLeftMax) {
			this.slider.insertBefore(images[0], undefined);
			this.slider.scrollBy({ left: -this.width });
		}
	}

	swipeLeave(e) {
		if (this.sliding) {
			this.swipeEnd(e);
		}
	}

	addEvents() {
		this.slider.ondragstart = () => false;

		this.slider.onmousedown = this.swipeStart.bind(this);
		this.slider.ontouchstart = this.swipeStart.bind(this);

		this.slider.onmousemove = this.swipeMove.bind(this);
		this.slider.ontouchmove = this.swipeMove.bind(this);

		this.slider.ontouchend = this.swipeEnd.bind(this);
		this.slider.onmouseup = this.swipeLeave.bind(this);

		this.slider.onmouseleave = this.swipeLeave.bind(this);

		let indicators = Array.from(document.querySelectorAll(`#${this.hash} .indicators .indicator`));
		indicators.forEach((indicator, i) => {
			indicator.onclick = () => {
				this.scrollTo(i * this.width);
				this.activateIndicator(i);
			};
		});

		this.activateIndicator(0);
	}

	renderImages() {
		return this.images.map(img => img.outerHTML).join('');
	}

	renderIndicators() {
		let indicators = '';
		for (let i = 0; i < this.slidesCount; i++) {
			indicators += `<button style="width: ${100 / this.slidesCount}%" class="indicator">${i + 1}</button>`;
		}
		return indicators;
	}

	render() {
		return `<div class="slider-wrap" id="${this.hash}" style="width: ${this.width}px; height: ${this.height}px">
			<div style="width: ${this.width}px; height: ${this.height}px" class="slider-container">
				${this.renderImages()}
			</div>
			<div class="indicators">
				${this.renderIndicators()}
			</div>
		</div>`;
	}
}

addEventListener("DOMContentLoaded", function (event) {
	Array.from(document.querySelectorAll('.slider')).forEach(slider => {
		new Slider(slider);
	});
});

/***/ })
/******/ ]);