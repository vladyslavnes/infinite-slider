function Slider (slider) {

	let indicators = slider.parentNode.querySelectorAll('.indicator')
	Array.from(indicators).forEach((indicator, i) => {
		indicator.onclick = scrollTo(+indicator.innerText * width)
	})


	let images = slider.querySelectorAll('img')
	
	let width = slider.clientWidth
	let height = slider.clientHeight
	let slidesCount = slider.children.length
	
	let isSliding = false
	let startX = 0
	let diff = 0

	const scrollBySlide = direction => {
		if (slider.scrollLeft === 0 && direction === -1) {
			// scroll left
		} else if (slider.scrollLeft >= slider.scrollLeftMax - width*2) {
			// Scroll right
		}
	}

	const swipeStart = e => {
		startX = e.clientX || e.touches[0].pageX
		isSliding = true
		e.preventDefault()
	}

	const swipeMove = e => {
		if (isSliding) {
			if (true) {

			}

			let newX = e.clientX || e.touches[0].pageX
			diff = startX - newX
			slider.scrollBy({left: 25*Math.sign(diff), behavior: 'smooth'})
		}
		e.preventDefault()
	}	

	const swipeEnd = e => {
		isSliding = false
		e.preventDefault()
	}



	slider.ondragstart = () => false

	slider.onmousedown = swipeStart.bind(this)
	slider.ontouchstart = swipeStart.bind(this)

	slider.onmousemove = swipeMove.bind(this)
	slider.ontouchmove = swipeMove.bind(this)

	slider.ontouchend = swipeEnd.bind(this)
	slider.onmouseup = swipeEnd.bind(this)
}

for (let i = 0; i < 2; i++) {
	Slider(document.getElementById(`slider_${i}`))
}
