const imagesContainer = document.querySelector('.slider__images-container');
let imagesContainerWidth;
const image1 = document.querySelector('.slider__image-container--first img');
const image2 = document.querySelector('.slider__image-container--second img');
let dragging = 0;
let imagesContainerLeftOffset;
const img1ContainerEl = document.querySelector('.slider__image-container--first');
const img2ContainerEl = document.querySelector('.slider__image-container--second');
const handleEl = document.querySelector('.slider__handle');
const dividerEl = document.querySelector('.slider__divider');

function getValidatedInnerOffset(distanceFromWindowLeft) {
	const innerMouseOffset = distanceFromWindowLeft - imagesContainerLeftOffset;
	if (innerMouseOffset < 0) {
		return 0;
	} else if (innerMouseOffset > imagesContainerWidth) {
		return imagesContainerWidth;
	} else {
		return innerMouseOffset;
	}
}

function moveBy(distanceFromWindowLeft) {
	const validatedInnerElementOffset = getValidatedInnerOffset(distanceFromWindowLeft);
	const innerElOffsetPercentage = (validatedInnerElementOffset / imagesContainerWidth) * 100; // now truly screen size independent
	dividerEl.style.left = `${innerElOffsetPercentage}%`;
	img2ContainerEl.style.width = `${innerElOffsetPercentage}%`;
}

function initEvents() {
	handleEl.addEventListener('mousedown', () => (dragging = !dragging));
	handleEl.addEventListener('mouseup', () => (dragging = !dragging));
	handleEl.addEventListener('touchstart', () => (dragging = !dragging));
	handleEl.addEventListener('touchend', () => (dragging = !dragging));
	window.addEventListener('mousemove', (event) => {
		if (dragging) {
			let distanceFromWindowLeft = event.clientX;
			moveBy(distanceFromWindowLeft);
		}
	});
	window.addEventListener('touchmove', (event) => {
		if (dragging) {
			let distanceFromWindowLeft = event.touches[0].clientX; // first touch
			moveBy(distanceFromWindowLeft);
		}
	});
}

const adjustImgSize = function () {
	imagesContainerWidth = imagesContainer.offsetWidth;
	imagesContainerLeftOffset = imagesContainer.offsetLeft;
	image1.style.width = imagesContainerWidth + 'px';
	image2.style.width = `${imagesContainerWidth}px`;
};

window.addEventListener('resize', adjustImgSize);
adjustImgSize();
initEvents();
