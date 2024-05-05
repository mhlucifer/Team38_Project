document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel-inner');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    nextButton.addEventListener('click', function() {
        // Move right by half the width of the carousel's visible area
        carousel.scrollBy({left: carousel.offsetWidth, behavior: 'smooth'});
    });

    prevButton.addEventListener('click', function() {
        // Move left by half the width of the carousel's visible area
        carousel.scrollBy({left: -carousel.offsetWidth, behavior: 'smooth'});
    });
});
