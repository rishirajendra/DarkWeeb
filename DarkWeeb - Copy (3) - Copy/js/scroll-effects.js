document.addEventListener('DOMContentLoaded', function() {
    // Elements for parallax effects
    const heroContent = document.querySelector('.hero-content');
    const heroSlideshow = document.querySelector('.hero-slideshow');
    const hero = document.querySelector('.hero');
    
    // Function to handle parallax scrolling and overlap effects
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Simple parallax effect for hero content
        if (heroContent) {
            // Subtle fade and movement effect
            const translateY = Math.min(scrollTop * 0.15, 50);
            const opacityValue = Math.max(1 - (scrollTop * 0.0015), 0.7);
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = opacityValue;
        }
        
        // Enhanced overlap effect for hero slideshow
        if (heroSlideshow) {
            // Calculate the overlap amount based on scroll position
            // This creates a dynamic effect where the slideshow moves down as you scroll
            const overlapAmount = Math.min(scrollTop * 0.2, 120); // Max overlap of 120px
            heroSlideshow.style.marginBottom = `-${overlapAmount}px`;
            
            // Add a subtle scale effect to enhance the 3D feeling
            const scaleValue = Math.max(1 - (scrollTop * 0.0003), 0.95);
            heroSlideshow.style.transform = `scale(${scaleValue})`;
        }
    }
    
    // Add scroll event listener with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initialize on page load
    setTimeout(handleScroll, 100);
});
