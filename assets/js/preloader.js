const preloader = document.querySelector('.preloader');

preloader.classList.add('fade-out');
setTimeout(() => {
    preloader.style.display = 'none';
}, 1000);