const imagesContainer = document.querySelector('.slider__images-container');
const image1 = document.querySelector('.slider__image-container--first img');
const image2 = document.querySelector('.slider__image-container--second img');
let dragging = 0;
const imagesContainerLeftOffset = imagesContainer.offsetLeft;
const img1ContainerEl = document.querySelector('.slider__image-container--first');
const img2ContainerEl = document.querySelector('.slider__image-container--second');
const handleEl = document.querySelector('.slider__handle');
const dividerEl = document.querySelector('.slider__divider');

function move(clientX) {}

function initEvents() {
	handleEl.addEventListener('mousedown', () => (dragging = !dragging));
	handleEl.addEventListener('mouseup', () => (dragging = !dragging));
	handleEl.addEventListener('mousemove', (event) => {
		if (dragging) {
			move(event.clientX);
		}
	});
}

const adjustImgSize = function () {
	const imagesContainerWidth = imagesContainer.offsetWidth;
	image1.style.width = imagesContainerWidth + 'px';
	image2.style.width = `${imagesContainerWidth}px`;
};

window.addEventListener('resize', adjustImgSize);
adjustImgSize();
initEvents();
