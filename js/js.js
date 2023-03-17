$(function () {

	'use strict';


	//Lenis Smooth scroll
	const lenis = new Lenis({
		duration: 1.2
	})

	lenis.on('scroll', (e) => {
		console.log(e)
	})
	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)

	//Integration Lenis on GSAP ScrollTrigger
	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000)
	})

	//Create animation ScrollTrigger
	function scrollTrig() {

		gsap.registerPlugin(ScrollTrigger);

		let gsapBl = $('.gsap__bl').width();

		//On full width
		// $('.gsap__item').css('width', gsapBl + 'px');

		//Transform slider track
		let gsapTrack = $('.gsap__track').width();
		let scrollSliderTransform = gsapTrack - gsapBl

		//Create ScrollTrigger
		gsap.to('.gsap__track', {
			scrollTrigger: {
				trigger: '.gsap_slider',
				start: 'center center',
				end: () => '+=' + gsapTrack,
				pin: true,
				scrub: true
			},
			x: '-=' + scrollSliderTransform + 'px'
		});

	}
	scrollTrig();

	//resize window
	const debouncedResize = _.debounce(onWindowResize, 500);
	function onWindowResize() {
		console.log('Window resized!');
		location.reload();
	}
	$(window).on('resize', debouncedResize);
});