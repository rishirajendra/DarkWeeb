document.addEventListener('DOMContentLoaded', function() {
    // Get all slides and dots
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 4000; // 4 seconds between slides
    let isTransitioning = false;

    // Function to show a specific slide
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('next');
            slide.classList.remove('prev');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Setup next slide for transition
        let nextIndex = index + 1 >= slides.length ? 0 : index + 1;
        slides[nextIndex].classList.add('next');
        
        // Setup previous slide for transition
        let prevIndex = index - 1 < 0 ? slides.length - 1 : index - 1;
        slides[prevIndex].classList.add('prev');
        
        // Update current slide index
        currentSlide = index;
        
        // Allow transitions again after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1000); // Match this to your CSS transition time
    }

    // Function to show the next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0; // Loop back to the first slide
        }
        showSlide(next);
    }

    // Function to show the previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1; // Loop to the last slide
        }
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Set new interval
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            showSlide(index);
            // Reset the interval when manually changing slides
            startSlideshow();
        });
    });

    // Add event listeners for watch and info buttons
    const watchButtons = document.querySelectorAll('.watch-btn');
    const infoButtons = document.querySelectorAll('.info-btn');

    watchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering slide change
            // You can add functionality here to start watching
            console.log('Watch button clicked');
            // Example: redirect to a video page
            // window.location.href = 'watch.html';
        });
    });

    infoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering slide change
            // You can add functionality here to show more info
            console.log('Info button clicked');
            // Example: open a modal with more information
            // openInfoModal();
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isTransitioning) return;
        
        if (e.key === 'ArrowRight') {
            nextSlide();
            startSlideshow();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            startSlideshow();
        }
    });

    // Add swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const heroSection = document.querySelector('.hero-slideshow');
    
    heroSection.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    heroSection.addEventListener('touchend', function(e) {
        if (isTransitioning) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
            // Swipe left, show next slide
            nextSlide();
            startSlideshow();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right, show previous slide
            prevSlide();
            startSlideshow();
        }
    }

    // Pause slideshow when hovering over the hero section
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('mouseleave', function() {
        startSlideshow();
    });

    // Initialize the first slide
    showSlide(0);
    
    // Start the slideshow
    startSlideshow();
});
