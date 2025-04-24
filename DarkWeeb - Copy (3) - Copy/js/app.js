/**
 * DAEKWEEB - JavaScript Application
 * Modern anime streaming platform
 */

// API Configuration (using Jikan API - MyAnimeList unofficial API)
const API = {
    baseUrl: 'https://api.jikan.moe/v4',
    endpoints: {
        trending: '/top/anime',       // Get top/trending anime
        seasonal: '/seasons/now',     // Get current season anime
        upcoming: '/seasons/upcoming', // Get upcoming anime
        search: '/anime',             // Search for anime
        anime: '/anime',              // Get anime details by ID
        genres: '/genres/anime',      // Get anime genres
        recommendations: '/recommendations/anime' // Get anime recommendations
    },
    // Avoid rate limiting (Jikan API has a limit of 3 requests per second)
    requestDelay: 1000
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Hide loading indicator
    hideLoadingIndicator();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Load anime data
    loadAnimeData();
}

/**
 * Hide the loading indicator
 */
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton) {
        searchButton.addEventListener('click', () => performSearch());
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    const modal = document.getElementById('anime-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Hero buttons
    const watchNowBtn = document.querySelector('.btn-primary');
    const addToListBtn = document.querySelector('.btn-secondary');
    
    if (watchNowBtn) {
        watchNowBtn.addEventListener('click', () => openAnimeDetails(1));
    }
    
    if (addToListBtn) {
        addToListBtn.addEventListener('click', () => {
            // Toggle button text/icon to show added to list
            addToListBtn.innerHTML = '<i class="fas fa-check"></i> Added to List';
            addToListBtn.style.backgroundColor = 'rgba(70, 211, 105, 0.2)';
            addToListBtn.style.borderColor = 'rgba(70, 211, 105, 0.5)';
            
            // After 2 seconds, revert back
            setTimeout(() => {
                addToListBtn.innerHTML = '<i class="fas fa-plus"></i> Add to List';
                addToListBtn.style.backgroundColor = '';
                addToListBtn.style.borderColor = '';
            }, 2000);
        });
    }
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryGrid = document.querySelector('.category-grid');
    
    if (categoryCards.length > 0 && categoryGrid) {
        // Initialize 3D tilt effect
        init3DTiltEffect();
        
        // Add click handlers
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                console.log(`Category selected: ${category}`);
                // In a real app, this would navigate to a category page or filter results
                alert(`Showing ${category} anime`);
            });
        });
    }
}

/**
 * Handle header transparency on scroll
 */
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
        }
    }
}

/**
 * Load anime data from API
 */
function loadAnimeData() {
    // Fetch trending anime
    fetchTrendingAnime();
    
    // Fetch continue watching (in a real app, this would be user-specific)
    fetchContinueWatching();
    
    // Fetch new releases
    fetchNewReleases();
    
    // Fetch top rated anime
    fetchTopRatedAnime();
}

/**
 * Fetch data from API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL parameters
 * @returns {Promise} - Promise with response data
 */
async function fetchData(endpoint, params = {}) {
    try {
        // Build URL with parameters
        const url = new URL(`${API.baseUrl}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        // Fetch data from API with improved error handling
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        });
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        // Parse response data
        const data = await response.json();
        return data;
    } catch (error) {
        // Log the detailed error
        console.error('Error fetching data:', error.message);
        
        // Return null to trigger fallback content
        return null;
    }
}

/**
 * Fetch trending anime
 */
async function fetchTrendingAnime() {
    const container = document.getElementById('trending-container');
    if (!container) return;
    
    // Add loading state
    container.innerHTML = getLoadingPlaceholders();
    
    try {
        // Fetch trending anime
        const data = await fetchData(API.endpoints.trending, { 
            limit: 8,
            filter: 'bypopularity'
        });
        
        if (data && data.data) {
            // Create anime cards
            renderAnimeList(data.data, container);
        } else {
            // Show fallback content if API fails
            renderFallbackAnime(container, 'trending');
        }
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        renderFallbackAnime(container, 'trending');
    }
}

/**
 * Fetch continue watching anime (simulation)
 */
function fetchContinueWatching() {
    const container = document.getElementById('continue-watching-container');
    if (!container) return;
    
    // Add loading state
    container.innerHTML = getLoadingPlaceholders();
    
    // In a real app, this would fetch from user's watch history
    // For demo purposes, we'll use simulated data
    const continueWatchingData = [
        {
            id: 1535,
            title: 'Death Note',
            main_picture: { large: 'https://via.placeholder.com/220x330?text=Death+Note' },
            progress: 75,
            next_episode: 'Episode 9'
        },
        {
            id: 11757,
            title: 'Sword Art Online',
            main_picture: { large: 'https://via.placeholder.com/220x330?text=Sword+Art+Online' },
            progress: 30,
            next_episode: 'Episode 4'
        },
        {
            id: 20,
            title: 'Naruto',
            main_picture: { large: 'https://via.placeholder.com/220x330?text=Naruto' },
            progress: 90,
            next_episode: 'Episode 120'
        },
        {
            id: 30276,
            title: 'One Punch Man',
            main_picture: { large: 'https://via.placeholder.com/220x330?text=One+Punch+Man' },
            progress: 45,
            next_episode: 'Episode 6'
        }
    ];
    
    // Render continue watching cards with progress bars
    renderContinueWatching(continueWatchingData, container);
}

/**
 * Fetch new releases (seasonal anime)
 */
async function fetchNewReleases() {
    const container = document.getElementById('new-releases-container');
    if (!container) return;
    
    // Add loading state
    container.innerHTML = getLoadingPlaceholders();
    
    try {
        // Fetch new releases
        const data = await fetchData(API.endpoints.seasonal, { limit: 8 });
        
        if (data && data.data) {
            // Create anime cards
            renderAnimeList(data.data, container, true);
        } else {
            // Show fallback content if API fails
            renderFallbackAnime(container, 'new');
        }
    } catch (error) {
        console.error('Error fetching new releases:', error);
        renderFallbackAnime(container, 'new');
    }
}

/**
 * Fetch top rated anime
 */
async function fetchTopRatedAnime() {
    const container = document.getElementById('top-rated-container');
    if (!container) return;
    
    // Add loading state
    container.innerHTML = getLoadingPlaceholders();
    
    try {
        // Fetch top rated anime
        const data = await fetchData(API.endpoints.trending, { 
            limit: 8,
            filter: 'byrating'
        });
        
        if (data && data.data) {
            // Create anime cards
            renderAnimeList(data.data, container);
        } else {
            // Show fallback content if API fails
            renderFallbackAnime(container, 'top');
        }
    } catch (error) {
        console.error('Error fetching top rated anime:', error);
        renderFallbackAnime(container, 'top');
    }
}

/**
 * Render anime list
 * @param {Array} animeList - List of anime data
 * @param {HTMLElement} container - Container element
 * @param {boolean} isNew - Whether to add "NEW" badge
 */
function renderAnimeList(animeList, container, isNew = false) {
    container.innerHTML = '';
    
    // For a nice staggered animation effect
    const fragment = document.createDocumentFragment();
    
    animeList.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card fade-in';
        card.style.setProperty('--i', index);
        
        const imageUrl = anime.images?.jpg?.image_url || anime.main_picture?.large || `https://via.placeholder.com/220x330?text=${encodeURIComponent(anime.title)}`;
        
        card.innerHTML = `
            <div class="anime-card-image">
                ${isNew ? '<div class="new-badge">NEW</div>' : ''}
                <img src="${imageUrl}" alt="${anime.title}">
            </div>
            <div class="anime-card-details">
                <h3 class="anime-card-title">${anime.title}</h3>
                <div class="anime-card-info">
                    <span>${anime.year || 'N/A'}</span>
                    <span>${anime.type || 'TV'}</span>
                    <span>${anime.score ? anime.score.toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        `;
        
        // Add click event
        card.addEventListener('click', () => openAnimeDetails(anime.mal_id));
        
        // Add to document fragment instead of directly to container
        fragment.appendChild(card);
    });
    
    // Add all cards to the container at once
    container.appendChild(fragment);
    
    // Now apply the animations with staggered delays
    const cards = container.querySelectorAll('.anime-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            if (window.animationObserver) {
                window.animationObserver.observe(card);
            } else {
                // Fallback animation if observer not available
                setTimeout(() => {
                    card.classList.add('appear');
                }, 50 * index);
            }
        }, 10); // Small delay to ensure DOM is ready
    });
}

/**
 * Render continue watching list
 * @param {Array} animeList - List of anime data
 * @param {HTMLElement} container - Container element
 */
function renderContinueWatching(animeList, container) {
    container.innerHTML = '';
    
    animeList.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card fade-in';
        card.style.setProperty('--i', index);
        
        card.innerHTML = `
            <div class="anime-card-image">
                <img src="${anime.main_picture.large}" alt="${anime.title}">
            </div>
            <div class="anime-card-details">
                <h3 class="anime-card-title">${anime.title}</h3>
                <div class="anime-card-info">
                    ${anime.next_episode}
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${anime.progress}%"></div>
                </div>
            </div>
        `;
        
        // Add click event
        card.addEventListener('click', () => openAnimeDetails(anime.id));
        
        container.appendChild(card);
        
        // Trigger animation observation for this card
        if (window.animationObserver) {
            window.animationObserver.observe(card);
        }
    });
}

/**
 * Render fallback anime content when API fails
 * @param {HTMLElement} container - Container element
 * @param {string} type - Type of content
 */
function renderFallbackAnime(container, type) {
    // Generate fallback data based on type
    let fallbackData = [];
    
    switch (type) {
        case 'trending':
            fallbackData = [
                { id: 1, title: 'Demon Slayer', year: 2019, type: 'TV', score: 8.9 },
                { id: 2, title: 'Attack on Titan', year: 2013, type: 'TV', score: 9.0 },
                { id: 3, title: 'Jujutsu Kaisen', year: 2020, type: 'TV', score: 8.7 },
                { id: 4, title: 'My Hero Academia', year: 2016, type: 'TV', score: 8.4 }
            ];
            break;
        case 'new':
            fallbackData = [
                { id: 5, title: 'Chainsaw Man', year: 2022, type: 'TV', score: 8.6 },
                { id: 6, title: 'Spy x Family', year: 2022, type: 'TV', score: 8.5 },
                { id: 7, title: 'Bleach: TYBW', year: 2022, type: 'TV', score: 9.1 },
                { id: 8, title: 'Vinland Saga S2', year: 2023, type: 'TV', score: 8.8 }
            ];
            break;
        case 'top':
            fallbackData = [
                { id: 9, title: 'Fullmetal Alchemist: Brotherhood', year: 2009, type: 'TV', score: 9.2 },
                { id: 10, title: 'Steins;Gate', year: 2011, type: 'TV', score: 9.1 },
                { id: 11, title: 'Hunter x Hunter', year: 2011, type: 'TV', score: 9.0 },
                { id: 12, title: 'Gintama', year: 2006, type: 'TV', score: 8.9 }
            ];
            break;
    }
    
    // Convert fallback data to match API format
    const formattedData = fallbackData.map(anime => {
        return {
            mal_id: anime.id,
            title: anime.title,
            year: anime.year,
            type: anime.type,
            score: anime.score,
            images: {
                jpg: {
                    image_url: `https://via.placeholder.com/220x330?text=${encodeURIComponent(anime.title)}`
                }
            }
        };
    });
    
    // Set a small delay to simulate loading
    setTimeout(() => {
        // Render the fallback data
        renderAnimeList(formattedData, container, type === 'new');
    }, 300);
}

/**
 * Open anime details modal
 * @param {number} animeId - Anime ID
 */
async function openAnimeDetails(animeId) {
    // Get modal elements
    const modal = document.getElementById('anime-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    // Show loading state in modal
    modal.style.display = 'block';
    modalBody.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
            <div class="spinner"></div>
        </div>
    `;
    
    try {
        // Fetch anime details
        const data = await fetchData(`${API.endpoints.anime}/${animeId}`);
        
        if (data && data.data) {
            const anime = data.data;
            
            // Build modal content
            const imageUrl = anime.images?.jpg?.large_image_url || `https://via.placeholder.com/960x540?text=${encodeURIComponent(anime.title)}`;
            const genres = anime.genres ? anime.genres.map(g => g.name).join(', ') : 'N/A';
            const studios = anime.studios ? anime.studios.map(s => s.name).join(', ') : 'N/A';
            
            modalBody.innerHTML = `
                <div class="modal-header">
                    <img src="${imageUrl}" alt="${anime.title}" class="modal-banner">
                    <div class="modal-actions">
                        <button class="btn-primary"><i class="fas fa-play"></i> Watch</button>
                        <button class="btn-secondary"><i class="fas fa-plus"></i> Add to List</button>
                    </div>
                </div>
                <div class="modal-info">
                    <div class="modal-details">
                        <h2>${anime.title}</h2>
                        <div class="modal-meta">
                            <span class="modal-match">${anime.score ? Math.round(anime.score * 10) : 'N/A'}% Match</span>
                            <span>${anime.year || 'N/A'}</span>
                            <span>${anime.rating || 'N/A'}</span>
                            <span>${anime.episodes ? anime.episodes + ' Episodes' : 'N/A'}</span>
                            <span>${anime.status || 'N/A'}</span>
                        </div>
                        <div class="modal-description">
                            ${anime.synopsis || 'No description available.'}
                        </div>
                    </div>
                    <div class="modal-cast">
                        <h4>Studio:</h4>
                        <p>${studios}</p>
                        <h4>Genres:</h4>
                        <p>${genres}</p>
                        <h4>Score:</h4>
                        <p>${anime.score || 'N/A'} / 10</p>
                    </div>
                </div>
                <div class="modal-episodes">
                    <div class="modal-episodes-header">
                        <h3>Episodes</h3>
                        <select class="season-selector">
                            <option>Season 1</option>
                        </select>
                    </div>
                    <div class="episode-list">
                        ${generateEpisodeList(anime.episodes || 12)}
                    </div>
                </div>
            `;
            
            // Add event listeners to modal buttons
            const watchButton = modalBody.querySelector('.btn-primary');
            const addToListButton = modalBody.querySelector('.btn-secondary');
            
            if (watchButton) {
                watchButton.addEventListener('click', () => {
                    alert('Watch functionality would be implemented here');
                });
            }
            
            if (addToListButton) {
                addToListButton.addEventListener('click', function() {
                    this.innerHTML = '<i class="fas fa-check"></i> Added';
                    this.style.backgroundColor = 'rgba(70, 211, 105, 0.2)';
                    this.style.borderColor = 'rgba(70, 211, 105, 0.5)';
                });
            }
            
            // Add click event to episode items
            const episodeItems = modalBody.querySelectorAll('.episode-item');
            episodeItems.forEach(item => {
                item.addEventListener('click', function() {
                    alert(`Playing ${this.querySelector('.episode-number').textContent}`);
                });
            });
            
        } else {
            // Show error message
            modalBody.innerHTML = `
                <div style="padding: 30px; text-align: center;">
                    <h3>Error Loading Content</h3>
                    <p>Unable to load anime details. Please try again later.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching anime details:', error);
        
        // Show error message
        modalBody.innerHTML = `
            <div style="padding: 30px; text-align: center;">
                <h3>Error Loading Content</h3>
                <p>Unable to load anime details. Please try again later.</p>
            </div>
        `;
    }
}

/**
 * Generate episode list HTML
 * @param {number} count - Number of episodes
 * @returns {string} - HTML for episode list
 */
function generateEpisodeList(count) {
    let html = '';
    
    for (let i = 1; i <= Math.min(count, 5); i++) {
        html += `
            <div class="episode-item">
                <img src="https://via.placeholder.com/160x90?text=Episode+${i}" alt="Episode ${i}">
                <div class="episode-details">
                    <div class="episode-number">Episode ${i}</div>
                    <div class="episode-duration">24 min</div>
                    <div class="episode-description">This is a placeholder description for episode ${i}. In a real application, this would contain the actual episode synopsis.</div>
                </div>
            </div>
        `;
    }
    
    return html;
}

/**
 * Generate loading placeholders
 * @returns {string} - HTML for loading placeholders
 */
function getLoadingPlaceholders() {
    let html = '';
    
    for (let i = 0; i < 4; i++) {
        html += `
            <div class="anime-card" style="--i: ${i}">
                <div class="anime-card-image" style="background: #0f3460;">
                    <div style="height: 0; padding-bottom: 56.25%;"></div>
                </div>
                <div class="anime-card-details">
                    <div style="height: 20px; width: 80%; background: #0f3460; margin-bottom: 8px;"></div>
                    <div style="height: 15px; width: 60%; background: #0f3460;"></div>
                </div>
            </div>
        `;
    }
    
    return html;
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('anime-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Perform search
 */
function performSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput && searchInput.value.trim() !== '') {
        const query = searchInput.value.trim();
        alert(`Search functionality for "${query}" would be implemented here`);
        
        // In a real app, this would redirect to search results page or show results in a modal
        // searchAnime(query);
    }
}

/**
 * Search for anime
 * @param {string} query - Search query
 */
async function searchAnime(query) {
    try {
        const data = await fetchData(API.endpoints.search, { q: query, limit: 8 });
        
        if (data && data.data) {
            // In a real app, you would display these results in a search results page
            console.log('Search results:', data.data);
        }
    } catch (error) {
        console.error('Error searching anime:', error);
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Wait a short time to ensure DOM is fully ready
    setTimeout(() => {
        // Get all elements that need animation
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        const slideRightElements = document.querySelectorAll('.slide-in-right');
        const scaleElements = document.querySelectorAll('.scale-in');
        const staggerElements = document.querySelectorAll('.stagger-children');
        
        // Combine all elements for observation
        const allAnimatedElements = [
            ...fadeElements,
            ...slideLeftElements,
            ...slideRightElements,
            ...scaleElements,
            ...staggerElements
        ];
        
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            // Create the Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // If element is in view
                    if (entry.isIntersecting) {
                        console.log('Element in view:', entry.target.className);
                        entry.target.classList.add('appear');
                        // Unobserve after animation is applied
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                // Options
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in view
            });
            
            // Store observer globally for dynamically added elements
            window.animationObserver = observer;
            
            // Apply observer to all elements
            allAnimatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            console.log('Intersection Observer not supported, using fallback');
            allAnimatedElements.forEach(element => {
                element.classList.add('appear');
            });
        }
        
        // Manually trigger the hero section animation since it's at the top of the page
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && heroContent.classList.contains('fade-in')) {
            setTimeout(() => {
                heroContent.classList.add('appear');
            }, 300);
        }
    }, 100);
}

/**
 * Initialize 3D tilt effect for category cards
 */
function init3DTiltEffect() {
    const categoryCards = document.querySelectorAll('.category-card');
    const categoryGrid = document.querySelector('.category-grid');

    if (!categoryCards.length || !categoryGrid) return;

    // Tilt effect parameters
    const MAX_TILT = 15; // Maximum tilt angle in degrees
    const MAX_SCALE = 1.05; // Maximum scale
    const TRANSITION_SPEED = 400; // Transition speed in ms when mouse leaves

    categoryCards.forEach(card => {
        // Store the card's dimensions and position
        let rect, centerX, centerY, cardWidth, cardHeight;
        
        // Update dimensions on window resize
        function updateDimensions() {
            rect = card.getBoundingClientRect();
            cardWidth = rect.width;
            cardHeight = rect.height;
            centerX = rect.left + cardWidth / 2;
            centerY = rect.top + cardHeight / 2;
        }
        
        // Initial dimension calculation
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        // Handle mouse movement
        categoryGrid.addEventListener('mousemove', e => {
            // Recalculate card position if needed
            if (e.target.closest('.category-card') === card) {
                updateDimensions();
                
                // Calculate mouse position relative to card center
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Calculate distance from center as a value between -1 and 1
                const xDelta = (mouseX - centerX) / (cardWidth / 2);
                const yDelta = (mouseY - centerY) / (cardHeight / 2);
                
                // Calculate tilt angles based on mouse position
                const tiltX = -yDelta * MAX_TILT; // Invert Y for natural tilt
                const tiltY = xDelta * MAX_TILT;
                
                // Calculate distance from center for scaling/shadow effect
                const distance = Math.sqrt(xDelta * xDelta + yDelta * yDelta);
                const scale = 1 + (MAX_SCALE - 1) * Math.min(distance, 1);
                
                // Apply transformation
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
                card.style.zIndex = "5";
                
                // Show the category info
                card.classList.add('tilt-active');
                
                // Adjust shadow based on tilt
                const shadowX = tiltY * 2;
                const shadowY = tiltX * 2;
                card.style.boxShadow = `
                    ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.4),
                    0 10px 30px -10px rgba(0, 0, 0, 0.5)
                `;
                
                // Adjust heading for more dramatic effect
                const cardHeading = card.querySelector('h3');
                if (cardHeading) {
                    cardHeading.style.transform = `translateZ(30px) translateY(-10px)`;
                    cardHeading.style.textShadow = `0 0 15px rgba(0, 0, 0, 0.5)`;
                }
            }
        });
        
        // Handle mouse leave
        card.addEventListener('mouseleave', () => {
            // Reset card styles with smooth transition
            card.style.transition = `transform ${TRANSITION_SPEED}ms ease-out, box-shadow ${TRANSITION_SPEED}ms ease-out`;
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            card.style.boxShadow = 'var(--box-shadow)';
            card.style.zIndex = "1";
            
            // Hide the category info
            card.classList.remove('tilt-active');
            
            // Reset heading
            const cardHeading = card.querySelector('h3');
            if (cardHeading) {
                cardHeading.style.transform = '';
                cardHeading.style.textShadow = '';
            }
            
            // Remove transition after it completes to allow smooth mouse move again
            setTimeout(() => {
                card.style.transition = '';
            }, TRANSITION_SPEED);
        });
        
        // Reset all cards when mouse leaves the grid
        categoryGrid.addEventListener('mouseleave', () => {
            categoryCards.forEach(c => {
                c.style.transition = `transform ${TRANSITION_SPEED}ms ease-out, box-shadow ${TRANSITION_SPEED}ms ease-out`;
                c.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
                c.style.boxShadow = 'var(--box-shadow)';
                c.style.zIndex = "1";
                c.classList.remove('tilt-active');
                
                const heading = c.querySelector('h3');
                if (heading) {
                    heading.style.transform = '';
                    heading.style.textShadow = '';
                }
                
                setTimeout(() => {
                    c.style.transition = '';
                }, TRANSITION_SPEED);
            });
        });
    });
}
