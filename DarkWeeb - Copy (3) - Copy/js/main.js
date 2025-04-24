// 3D tilt effect for category cards
function initCategoryTiltEffect() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Add wobble animation on mouseenter
        card.addEventListener('mouseenter', function() {
            // Add a subtle wobble animation
            this.style.animation = 'cardWobble 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Remove the animation after it completes
            setTimeout(() => {
                this.style.animation = 'pulse-border 2s infinite';
            }, 500);
        });
        
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // Calculate mouse position relative to card center (in -0.5 to 0.5 range)
            const xPos = (e.clientX - cardRect.left) / cardWidth - 0.5;
            const yPos = (e.clientY - cardRect.top) / cardHeight - 0.5;
            
            // Calculate rotation angles (multiplier determines tilt intensity)
            const tiltX = yPos * 20; // Increased from 15 to 20
            const tiltY = xPos * -20; // Increased from -15 to -20
            
            // Apply the transformation with increased scale and lift
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.12) translateZ(30px)`;
            
            // Add tilt-active class
            card.classList.add('tilt-active');
            
            // Update shine effect based on mouse position
            card.style.setProperty('--mouse-x', `${xPos * 50 + 50}%`);
            card.style.setProperty('--mouse-y', `${yPos * 50 + 50}%`);
            
            // Move content for parallax effect with increased depth
            const content = card.querySelector('.category-content');
            if (content) {
                content.style.transform = `translateZ(40px) translateX(${xPos * 15}px) translateY(${yPos * 15}px)`;
            }
            
            // Move the title for more pronounced effect
            const title = card.querySelector('h3');
            if (title) {
                title.style.transform = `translateZ(60px) translateX(${xPos * 20}px) translateY(${yPos * 20}px)`;
                title.style.textShadow = `3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 10px rgba(229, 9, 20, 0.7), ${xPos * -5}px ${yPos * 5}px 5px rgba(0, 0, 0, 0.3)`;
            }
            
            // Move the description with enhanced depth
            const desc = card.querySelector('p');
            if (desc) {
                desc.style.transform = `translateZ(50px) translateX(${xPos * 12}px) translateY(${yPos * 12}px)`;
                desc.style.textShadow = `2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(229, 9, 20, 0.6), ${xPos * -3}px ${yPos * 3}px 4px rgba(0, 0, 0, 0.2)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all transformations with a slight delay for a smoother transition
            setTimeout(() => {
                this.style.transform = '';
                this.classList.remove('tilt-active');
                
                // Reset content position
                const content = this.querySelector('.category-content');
                if (content) content.style.transform = '';
                
                // Reset title position and shadow
                const title = this.querySelector('h3');
                if (title) {
                    title.style.transform = '';
                    title.style.textShadow = '';
                }
                
                // Reset description position and shadow
                const desc = this.querySelector('p');
                if (desc) {
                    desc.style.transform = '';
                    desc.style.textShadow = '';
                }
            }, 50);
        });
    });
}

// Add the wobble animation keyframes to the document
function addAnimationStyles() {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @keyframes cardWobble {
            0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1); }
            25% { transform: perspective(1000px) rotateX(5deg) rotateY(-3deg) scale(1.05); }
            50% { transform: perspective(1000px) rotateX(-2deg) rotateY(5deg) scale(1.08); }
            75% { transform: perspective(1000px) rotateX(3deg) rotateY(-5deg) scale(1.1); }
            100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.12); }
        }
    `;
    document.head.appendChild(styleEl);
}

// Hero section parallax and tilt effect
function initHeroEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    
    if (hero && heroContent) {
        // Add entrance animation
        setTimeout(() => {
            heroContent.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
            heroBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateZ(5px)';
                }, 100 * index);
            });
        }, 300);
        
        // Add event listener for mouse movement
        hero.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to hero center
            const rect = hero.getBoundingClientRect();
            const xPos = (e.clientX - rect.left) / rect.width - 0.5;
            const yPos = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Adjust intensity based on screen size
            const intensityMultiplier = window.innerWidth < 768 ? 0.5 : 1;
            
            // Apply parallax effect to hero content
            heroContent.style.transform = `translate3d(${xPos * 20 * intensityMultiplier}px, ${yPos * 20 * intensityMultiplier}px, 0) rotateX(${yPos * -5 * intensityMultiplier}deg) rotateY(${xPos * 5 * intensityMultiplier}deg)`;
            
            // Move buttons slightly for deeper effect
            heroBtns.forEach(btn => {
                btn.style.transform = `translateZ(10px) translate(${xPos * 10 * intensityMultiplier}px, ${yPos * 10 * intensityMultiplier}px)`;
            });
            
            // Apply subtle gradient shift based on mouse position
            hero.style.setProperty('--mouse-x', `${xPos * 50 + 50}%`);
            hero.style.setProperty('--mouse-y', `${yPos * 50 + 50}%`);
        });
        
        // Reset transform on mouse leave
        hero.addEventListener('mouseleave', function() {
            heroContent.style.transform = '';
            heroBtns.forEach(btn => {
                btn.style.transform = '';
            });
        });
        
        // Add reduced motion check
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            hero.style.perspective = 'none';
            heroContent.style.transform = 'none';
            heroContent.style.transition = 'none';
            heroBtns.forEach(btn => {
                btn.style.transform = 'none';
                btn.style.transition = 'none';
            });
        }
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    if (menuToggle && mainNav) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle aria-expanded attribute
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = mainNav.contains(event.target) || menuToggle.contains(event.target);
            
            if (!isClickInside && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// Add animation to elements when they come into view
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .tilt-in');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }
}

// Initialize animations for anime cards
function initAnimeCards() {
    const animeCards = document.querySelectorAll('.anime-card');
    
    animeCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Add click event to play button
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const title = card.querySelector('h3').textContent;
                alert(`Now playing ${title}`);
            });
        }
    });
}

// Search functionality
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Create search overlay if it doesn't exist
            if (!document.querySelector('.search-overlay')) {
                const searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';
                searchOverlay.innerHTML = `
                    <div class="search-container">
                        <input type="text" placeholder="Search for anime..." autofocus>
                        <button class="close-search"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="search-results"></div>
                `;
                document.body.appendChild(searchOverlay);
                
                // Focus on input
                setTimeout(() => {
                    searchOverlay.querySelector('input').focus();
                }, 100);
                
                // Close search when clicking close button
                searchOverlay.querySelector('.close-search').addEventListener('click', function() {
                    searchOverlay.remove();
                });
                
                // Handle search input
                searchOverlay.querySelector('input').addEventListener('input', function(e) {
                    const query = e.target.value.toLowerCase();
                    const resultsContainer = searchOverlay.querySelector('.search-results');
                    
                    if (query.length < 2) {
                        resultsContainer.innerHTML = '';
                        return;
                    }
                    
                    // Simulate search results (in a real app, this would call an API)
                    const animeCards = document.querySelectorAll('.anime-card');
                    let results = '';
                    
                    animeCards.forEach(card => {
                        const title = card.querySelector('h3').textContent;
                        if (title.toLowerCase().includes(query)) {
                            const img = card.querySelector('img').src;
                            results += `
                                <div class="search-result-item">
                                    <img src="${img}" alt="${title}">
                                    <div class="search-result-info">
                                        <h3>${title}</h3>
                                        <button class="btn btn-sm btn-primary">Watch</button>
                                    </div>
                                </div>
                            `;
                        }
                    });
                    
                    if (results === '') {
                        resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
                    } else {
                        resultsContainer.innerHTML = results;
                    }
                });
                
                // Close search when pressing ESC
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && document.querySelector('.search-overlay')) {
                        document.querySelector('.search-overlay').remove();
                    }
                });
            }
        });
    }
}

// Newsletter form validation
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'newsletter-success';
                successMsg.textContent = 'Thank you for subscribing!';
                
                // Replace form with success message
                this.innerHTML = '';
                this.appendChild(successMsg);
            } else {
                // Show error message if it doesn't exist
                if (!form.querySelector('.newsletter-error')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'newsletter-error';
                    errorMsg.textContent = 'Please enter a valid email address';
                    form.appendChild(errorMsg);
                }
            }
        });
        
        function validateEmail(email) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        }
    }
}

// User dropdown menu functionality
function initUserDropdown() {
    const userProfile = document.querySelector('.user-profile');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userProfile && userDropdown) {
        console.log("User dropdown initialized"); // Debug message
        
        // Set initial state
        userDropdown.classList.remove('active');
        userProfile.setAttribute('aria-expanded', 'false');
        
        // Toggle dropdown when clicking on profile image
        userProfile.addEventListener('click', function(event) {
            console.log("Profile clicked"); // Debug message
            event.preventDefault();
            event.stopPropagation();
            
            userDropdown.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = userDropdown.classList.contains('active');
            userProfile.setAttribute('aria-expanded', isExpanded.toString());
            console.log("Dropdown active:", isExpanded); // Debug message
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (userDropdown.classList.contains('active') && !userProfile.contains(event.target)) {
                userDropdown.classList.remove('active');
                userProfile.setAttribute('aria-expanded', 'false');
                console.log("Dropdown closed by outside click"); // Debug message
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        userDropdown.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        // Close dropdown when pressing ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && userDropdown.classList.contains('active')) {
                userDropdown.classList.remove('active');
                userProfile.setAttribute('aria-expanded', 'false');
                console.log("Dropdown closed by ESC key"); // Debug message
            }
        });
        
        // Add keyboard navigation for accessibility
        userProfile.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                userDropdown.classList.toggle('active');
                const isExpanded = userDropdown.classList.contains('active');
                userProfile.setAttribute('aria-expanded', isExpanded.toString());
                console.log("Dropdown toggled by keyboard:", isExpanded); // Debug message
            }
        });
        
        // Add tabindex and aria attributes for accessibility
        userProfile.setAttribute('tabindex', '0');
        userProfile.setAttribute('role', 'button');
        userProfile.setAttribute('aria-haspopup', 'true');
        userProfile.setAttribute('aria-expanded', 'false');
    } else {
        console.warn("User profile or dropdown elements not found"); // Debug message
    }
}

// Navigation active state handler with ghost-like smooth animation
function initGhostNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    let currentActive = document.querySelector('.main-nav a.active');
    
    // Set initial active state
    const currentHash = window.location.hash || '#home';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
            currentActive = link;
        }
    });
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('active')) return;
            
            // Create ghost trail effect
            if (currentActive) {
                // Get positions for animation
                const prevRect = currentActive.getBoundingClientRect();
                const newRect = this.getBoundingClientRect();
                
                // Create ghost element for transition
                const ghostElement = document.createElement('span');
                ghostElement.classList.add('ghost-transition');
                ghostElement.style.position = 'absolute';
                ghostElement.style.top = `${prevRect.top}px`;
                ghostElement.style.left = `${prevRect.left}px`;
                ghostElement.style.width = `${prevRect.width}px`;
                ghostElement.style.height = `${prevRect.height}px`;
                ghostElement.style.borderRadius = '50px';
                ghostElement.style.backgroundColor = 'rgba(229, 9, 20, 0.3)';
                ghostElement.style.transition = 'all 0.5s ease';
                ghostElement.style.zIndex = '-1';
                document.body.appendChild(ghostElement);
                
                // Animate the ghost to new position
                setTimeout(() => {
                    ghostElement.style.top = `${newRect.top}px`;
                    ghostElement.style.left = `${newRect.left}px`;
                    ghostElement.style.width = `${newRect.width}px`;
                    ghostElement.style.height = `${newRect.height}px`;
                    ghostElement.style.opacity = '0';
                }, 10);
                
                // Remove ghost element after animation
                setTimeout(() => {
                    document.body.removeChild(ghostElement);
                }, 600);
                
                // Remove active class with delay for smooth transition
                currentActive.classList.add('fading');
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.classList.remove('fading');
                }, 300);
            } else {
                // If no current active, just remove all active classes
                navLinks.forEach(item => item.classList.remove('active'));
            }
            
            // Add active class to clicked link with slight delay for ghost effect
            setTimeout(() => {
                this.classList.add('active');
                currentActive = this;
            }, 300);
            
            // Smooth scroll to the section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Handle scroll to update active nav item with ghost effect
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset as needed
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        if (current && currentActive && currentActive.getAttribute('href') !== current) {
            const newActive = document.querySelector(`.main-nav a[href="${current}"]`);
            if (newActive) {
                // Get positions for animation
                const prevRect = currentActive.getBoundingClientRect();
                const newRect = newActive.getBoundingClientRect();
                
                // Create ghost element for transition
                const ghostElement = document.createElement('span');
                ghostElement.classList.add('ghost-transition');
                ghostElement.style.position = 'absolute';
                ghostElement.style.top = `${prevRect.top}px`;
                ghostElement.style.left = `${prevRect.left}px`;
                ghostElement.style.width = `${prevRect.width}px`;
                ghostElement.style.height = `${prevRect.height}px`;
                ghostElement.style.borderRadius = '50px';
                ghostElement.style.backgroundColor = 'rgba(229, 9, 20, 0.3)';
                ghostElement.style.transition = 'all 0.5s ease';
                ghostElement.style.zIndex = '-1';
                document.body.appendChild(ghostElement);
                
                // Animate the ghost to new position
                setTimeout(() => {
                    ghostElement.style.top = `${newRect.top}px`;
                    ghostElement.style.left = `${newRect.left}px`;
                    ghostElement.style.width = `${newRect.width}px`;
                    ghostElement.style.height = `${newRect.height}px`;
                    ghostElement.style.opacity = '0';
                }, 10);
                
                // Remove ghost element after animation
                setTimeout(() => {
                    document.body.removeChild(ghostElement);
                }, 600);
                
                // Update active class
                currentActive.classList.remove('active');
                newActive.classList.add('active');
                currentActive = newActive;
            }
        }
    });
}

// Anime Modal Functionality
function initAnimeModal() {
    const animeModal = document.getElementById('animeModal');
    const modalClose = animeModal.querySelector('.modal-close');
    const tabItems = animeModal.querySelectorAll('.tab-item');
    const tabContents = animeModal.querySelectorAll('.tab-content');
    const animeCards = document.querySelectorAll('.anime-card');
    const playButtons = document.querySelectorAll('.play-btn');

    // Close modal when clicking the close button
    modalClose.addEventListener('click', () => {
        closeAnimeModal();
    });

    // Close modal when clicking outside the modal content
    animeModal.addEventListener('click', (e) => {
        if (e.target === animeModal) {
            closeAnimeModal();
        }
    });

    // Tab switching functionality
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabItems.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });

    // Prevent play buttons from triggering the modal
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop event from bubbling up to the card
            console.log('Play button clicked');
            // Add your play functionality here
        });
    });

    // Add click event to all anime cards
    animeCards.forEach(card => {
        card.addEventListener('click', () => {
            const animeId = card.getAttribute('data-id') || '1';
            const animeTitle = card.querySelector('h3')?.textContent || 'Anime Title';
            const animeImage = card.querySelector('img')?.src || '';
            
            // Populate modal with anime data
            openAnimeModal(animeId, animeTitle, animeImage);
        });
    });
    
    // Add keyboard support to close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && animeModal.classList.contains('show')) {
            closeAnimeModal();
        }
    });

    // Debug: Add a direct test button to open modal
    console.log('Anime modal initialized');
    // Try to manually open the modal after a short delay
    setTimeout(() => {
        const firstCard = document.querySelector('.anime-card');
        if (firstCard) {
            console.log('Testing modal with first anime card');
            const animeTitle = firstCard.querySelector('h3')?.textContent || 'Anime Title';
            const animeImage = firstCard.querySelector('img')?.src || '';
            openAnimeModal('1', animeTitle, animeImage);
        }
    }, 3000); // 3 second delay
}

// Open anime modal with data
function openAnimeModal(animeId, title, image) {
    const animeModal = document.getElementById('animeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const episodesList = document.getElementById('episodesList');
    
    // Set basic info
    modalTitle.textContent = title;
    modalImage.src = image;
    
    // Fetch more details from API or use mock data
    // This is where you would normally fetch from your anime API
    const mockAnimeData = {
        rating: '8.7',
        year: '2022',
        duration: '24 min',
        type: 'TV',
        description: 'In a world where magic is everything, Asta and Yuno are both found abandoned at a church on the same day. While Yuno is gifted with exceptional magical powers, Asta is the only one in this world without any. At the age of fifteen, both receive grimoires, magic books that amplify their holder\'s magic.',
        studios: 'Studio Pierrot',
        genres: 'Action, Adventure, Fantasy',
        status: 'Ongoing',
        episodes: 170,
        episodeList: Array.from({ length: 12 }, (_, i) => i + 1)
    };
    
    // Populate modal with mock data
    document.getElementById('modalRating').textContent = mockAnimeData.rating;
    document.getElementById('modalYear').textContent = mockAnimeData.year;
    document.getElementById('modalDuration').textContent = mockAnimeData.duration;
    document.getElementById('modalType').textContent = mockAnimeData.type;
    modalDescription.textContent = mockAnimeData.description;
    document.getElementById('modalStudios').textContent = mockAnimeData.studios;
    document.getElementById('modalGenres').textContent = mockAnimeData.genres;
    document.getElementById('modalStatus').textContent = mockAnimeData.status;
    document.getElementById('modalEpisodes').textContent = mockAnimeData.episodes;
    
    // Generate episode list
    episodesList.innerHTML = '';
    mockAnimeData.episodeList.forEach(ep => {
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item';
        episodeItem.textContent = `Ep ${ep}`;
        episodeItem.addEventListener('click', () => {
            console.log(`Play episode ${ep} of ${title}`);
            // Add functionality to play the episode
        });
        episodesList.appendChild(episodeItem);
    });
    
    // Show modal with animation
    animeModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close anime modal
function closeAnimeModal() {
    const animeModal = document.getElementById('animeModal');
    animeModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ghost navigation
    initGhostNavigation();
    
    // Navigation active state handler with smooth animation
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Set initial active state
    const currentHash = window.location.hash || '#home';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        }
    });
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link with smooth animation
            this.classList.add('active');
            
            // Smooth scroll to the section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Handle scroll to update active nav item
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset as needed
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.menu-toggle')) {
            mainNav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
    
    // Add animation styles
    addAnimationStyles();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize category tilt effect for all cards
    initCategoryTiltEffect();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize anime cards
    initAnimeCards();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize user dropdown menu
    initUserDropdown();
    
    // Initialize anime modal functionality
    initAnimeModal();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Make categories section draggable
    const slider = document.querySelector('.categories-grid');
    
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile devices
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        }, { passive: true });

        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}