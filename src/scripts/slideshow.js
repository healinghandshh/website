const slides = document.querySelectorAll('#testimonials .slide');
let currentSlide = 0;
/*const slideInterval = setInterval(nextSlide,5000);*/

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide show';
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide show';
}

function nextSlide() {
    goToSlide(currentSlide+1);
}

function previousSlide() {
    goToSlide(currentSlide-1);
}

var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function() {
    nextSlide();
};
previous.onclick = function() {
    previousSlide();
};