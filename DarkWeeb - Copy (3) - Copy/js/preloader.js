// Wait for all content to load
window.addEventListener('load', function() {
    // Add a small delay for visual effect
    setTimeout(function() {
        // Add the 'loaded' class to the body element
        document.body.classList.add('loaded');
    }, 2000); // 2 seconds delay
});

// Allow users to skip the preloader by clicking anywhere
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.addEventListener('click', function() {
            document.body.classList.add('loaded');
        });
    }
    
    // Add click event handlers to category cards
    setupCategoryCardLoading();
});

// Function to handle category card click events
function setupCategoryCardLoading() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Add our custom click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show the preloader
            document.body.classList.remove('loaded');
            
            // Get the destination URL from data-href attribute
            const destinationUrl = card.getAttribute('data-href');
            
            // Wait for a moment to show the loading animation
            setTimeout(function() {
                // Navigate to the destination URL if it exists
                if (destinationUrl) {
                    window.location.href = destinationUrl;
                } else {
                    // If no URL is found, just hide the preloader again
                    document.body.classList.add('loaded');
                }
            }, 2000);
        });
    });
} 