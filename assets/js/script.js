const headerBar     = document.getElementById('header');
const pageTitle     = document.querySelector('#page_title h1.heading-lg');
const pageSubtitle  = document.querySelector('#page_title h2.heading-md');
const btnKnowMore   = document.querySelector('#btn_know_more');
const childImage    = document.querySelector('#happy_child');
const circle        = document.querySelector('#page_title .circle');

const MIN_SCROLL_DISTANCE = 150;
const MAX_SCROLL_DISTANCE = 300;

let shouldPlayAboutUsAnimation = false;
const                  aboutUs = document.getElementById('about_us');
const              aboutUsRect = aboutUs.getBoundingClientRect();
const       aboutUsDistanceTop = aboutUsRect.top + document.body.scrollTop;

const thumbnails = document.getElementsByClassName('thumbnail');
const thumbnailsList = Array(thumbnails.length)
    .fill(null)
    .map((_, index) => thumbnails.item(index));

function fadeIn(element, duration) {
    let seconds = duration / 1000;
    element.style.animation = `fade-in ${seconds}s ease-in`;

    let timer = setTimeout(() => {
        element.style.visibility = 'visible';
        clearTimeout(timer);
    }, duration);
}

function circleSlideRtLt(circle, duration) {
    let seconds = duration / 1000;
    circle.style.animation = `circle-slide-rt-lt ${seconds}s ease-in-out`;

    let timer = setTimeout(() => {
        circle.style.visibility = 'visible';
        circle.style.right = '-400px';
        clearTimeout(timer);
    }, duration);
}

function playFadeInAnimationSequence(elements, callback) {
    elements.forEach((el, i) => {
        setTimeout(() => {
            fadeIn(el, 500);
        }, 1000 * (i + 1));
    });

    let duration = 1000 * elements.length;
    
    setTimeout(() => {
        if (callback)
            callback();
    }, duration);
}

function typeText(element, string, callback) {
    let chars = [ ...string ];
    let text = '';

    chars.forEach((char, i) => {
        setTimeout(() => {
            text += char;

            element.innerHTML = (i % 2 == 0 && i < chars.length - 1)
                ? text + '<span class="cursor">|</span>'
                : text;
        }, 100 * (i + 1));
    });

    let duration = 100 * chars.length;

    setTimeout(() => {
        if (callback)
            callback();
    }, duration);
}

function changeImage() {
    let screenWidth = document.body.clientWidth;

    if (screenWidth <= 959.98) {
        const image = document.getElementById('about_us_image03');
        image.src = './assets/images/about_us_04.jpg';
    } else {
        const image = document.getElementById('about_us_image03');
        image.src = './assets/images/about_us_03.jpg';
    }
}


changeImage();

playFadeInAnimationSequence(
    [
        pageTitle,
        pageSubtitle,
        btnKnowMore
    ],
    () => {
        let duration = 500;

        circleSlideRtLt(circle, duration);
        fadeIn(childImage, duration + 500);
    }
);

document.addEventListener('scroll', () => {
    let { pageYOffset } = window;
    console.log(pageYOffset);

    let headerAlpha = Math.min(1, ((pageYOffset - MIN_SCROLL_DISTANCE) - MAX_SCROLL_DISTANCE) / (1 - 0) / MAX_SCROLL_DISTANCE);
    headerAlpha     = Math.max(0, headerAlpha);

    headerBar.style.background = `rgba(0, 186, 205, ${ headerAlpha })`;

    if (pageYOffset >= aboutUsDistanceTop) {
        if (!shouldPlayAboutUsAnimation) {
            shouldPlayAboutUsAnimation = true;

            playFadeInAnimationSequence(
                thumbnailsList,
            )
        }
    }
});

window.addEventListener('resize', () => {
    changeImage();
});