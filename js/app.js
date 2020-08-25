const carousel = document.querySelector('.carousel');
const autoplay = carousel.dataset.autoplay;
const slider = document.querySelector('.carousel__slides');
const slides = document.querySelectorAll('.carousel__slides img')

const slideW = slides[0].clientWidth;
const maxW = (slideW * slides.length);
const delay = 4000;

let offset = slideW;
let autoplayTimer;



// add a duplicate of the first img to the end of slide pack
// after transitioning to this slide we can jump back to
// the actual first slide without transition
const startImgSrc = slides[0].src;
const img1 = document.createElement('img');
img1.src = startImgSrc;
slider.appendChild(img1);

slider.addEventListener('mouseover', () => clearInterval(autoplayTimer))

slider.addEventListener('mouseout', () => autoplayTimer = setInterval(startAutoplay, delay))


const startAutoplay = () => {
    slider.style.transition = 'transform .7s ease-in-out';
    slider.style.transform = 'translateX(-' + offset + 'px)'
    offset += slideW;
}

slider.addEventListener('transitionend', () => {
    if (offset >= (maxW + slideW)) {
        offset = 0;
        slider.style.transition = 'transform 0s';
        slider.style.transform = 'translateX(-' + offset + 'px)'
        offset += slideW;
    }
})

if (autoplay) {
    autoplayTimer = setInterval(startAutoplay, delay)
}