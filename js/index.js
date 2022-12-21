//- catching DOM elements
const imagesContainer = document.querySelector('.slider__images-container');
const image1 = document.querySelector('.slider__image-container--first img');
const image2 = document.querySelector('.slider__image-container--second img');
const img1ContainerEl = document.querySelector('.slider__image-container--first');
const img2ContainerEl = document.querySelector('.slider__image-container--second');
const handleEl = document.querySelector('.slider__handle');
const dividerEl = document.querySelector('.slider__divider');
//- global variables to define on action
let imagesContainerWidth;
let imagesContainerLeftOffset;
//- flag to point dragging
let dragging = 0;

function getValidatedInnerOffset(distanceFromWindowLeft) {
	//- get cursor position starting from it's left:
	const innerMouseOffset = distanceFromWindowLeft - imagesContainerLeftOffset;
	//- return only values within the element - no bigger then width or it's initial point:
	if (innerMouseOffset < 0) {
		return 0;
	} else if (innerMouseOffset > imagesContainerWidth) {
		return imagesContainerWidth;
	} else {
		return innerMouseOffset;
	}
}

function moveBasedOn(distanceFromWindowLeft) {
	//- first validate what you've received:
	const validatedInnerElementOffset = getValidatedInnerOffset(distanceFromWindowLeft);
	//- in what percent is the cursor?
	const innerElOffsetPercentage = (validatedInnerElementOffset / imagesContainerWidth) * 100; //- now it is truly screen size independent
	//- apply received values:
	dividerEl.style.left = `${innerElOffsetPercentage}%`;
	img2ContainerEl.style.width = `${innerElOffsetPercentage}%`; //- overlaying container - to let img adjust to it
}

function initEvents() {
	handleEl.addEventListener('mousedown', () => (dragging = !dragging));
	handleEl.addEventListener('mouseup', () => (dragging = !dragging));
	handleEl.addEventListener('touchstart', () => (dragging = !dragging));
	handleEl.addEventListener('touchend', () => (dragging = !dragging));
	window.addEventListener('mousemove', (event) => {
		//- When dragging:
		if (dragging) {
			let distanceFromWindowLeft = event.clientX;
			//- pass cursor position to next function:
			moveBasedOn(distanceFromWindowLeft);
		}
	});
	window.addEventListener('touchmove', (event) => {
		if (dragging) {
			let distanceFromWindowLeft = event.touches[0].clientX; // first touch
			moveBasedOn(distanceFromWindowLeft);
		}
	});
}

//- get up to date values:
const adjustImgSize = function () {
	imagesContainerWidth = imagesContainer.offsetWidth; // = container width
	imagesContainerLeftOffset = imagesContainer.offsetLeft; // = distance from window left to the container
	image1.style.width = imagesContainerWidth + 'px';
	image2.style.width = `${imagesContainerWidth}px`;
};

//- update coordinates on resizing:
window.addEventListener('resize', adjustImgSize);
//- get coordinates on start:
adjustImgSize();
//
initEvents();
