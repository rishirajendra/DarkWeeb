/**
 * DAEKWEEB Anime Display
 * This file contains functions for displaying anime data fetched from the API
 */

// Import the API service functions
import { 
  fetchAnimeByCategory, 
  fetchTrendingAnime, 
  fetchPopularAnime, 
  searchAnime,
  fetchAnimeDetails 
} from './api-service.js';

/**
 * Display anime in the trending section
 */
async function displayTrendingAnime() {
  try {
    // Get container elements for both rows
    const firstRowContainer = document.querySelector('.trending .anime-slider:not(.second-row)');
    const secondRowContainer = document.querySelector('.trending .anime-slider.second-row');
    
    if (!firstRowContainer || !secondRowContainer) {
      console.error('Trending anime containers not found');
      return;
    }
    
    // Clear existing content
    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';
    
    // Fetch trending anime (8 items for both rows)
    const trendingAnime = await fetchTrendingAnime(8);
    
    if (trendingAnime.length === 0) {
      console.warn('No trending anime found');
      return;
    }
    
    // Split the anime for two rows
    const firstRowAnime = trendingAnime.slice(0, 4);
    const secondRowAnime = trendingAnime.slice(4, 8);
    
    // Display first row
    firstRowAnime.forEach(anime => {
      const animeCard = createAnimeCard(anime);
      firstRowContainer.appendChild(animeCard);
    });
    
    // Display second row
    secondRowAnime.forEach(anime => {
      const animeCard = createAnimeCard(anime);
      secondRowContainer.appendChild(animeCard);
    });
    
  } catch (error) {
    console.error('Error displaying trending anime:', error);
  }
}

/**
 * Display anime in the popular section
 */
async function displayPopularAnime() {
  try {
    // Get container elements for both rows
    const firstRowContainer = document.querySelector('.popular .anime-grid:not(.second-row)');
    const secondRowContainer = document.querySelector('.popular .anime-grid.second-row');
    
    if (!firstRowContainer || !secondRowContainer) {
      console.error('Popular anime containers not found');
      return;
    }
    
    // Clear existing content
    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';
    
    // Fetch popular anime (8 items for both rows)
    const popularAnime = await fetchPopularAnime(8);
    
    if (popularAnime.length === 0) {
      console.warn('No popular anime found');
      return;
    }
    
    // Split the anime for two rows
    const firstRowAnime = popularAnime.slice(0, 4);
    const secondRowAnime = popularAnime.slice(4, 8);
    
    // Display first row
    firstRowAnime.forEach(anime => {
      const animeCard = createAnimeCard(anime);
      firstRowContainer.appendChild(animeCard);
    });
    
    // Display second row
    secondRowAnime.forEach(anime => {
      const animeCard = createAnimeCard(anime);
      secondRowContainer.appendChild(animeCard);
    });
    
  } catch (error) {
    console.error('Error displaying popular anime:', error);
  }
}

/**
 * Display anime by category in the specified container
 * @param {string} category - The category to fetch anime for
 * @param {string} containerId - The ID of the container element
 */
async function displayAnimeByCategory(category, containerId) {
  try {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Fetch anime by category
    const animeList = await fetchAnimeByCategory(category);
    
    if (animeList.length === 0) {
      console.warn(`No anime found for category: ${category}`);
      container.innerHTML = `<p class="no-results">No anime found for ${category}</p>`;
      return;
    }
    
    // Display anime
    animeList.forEach(anime => {
      const animeCard = createAnimeCard(anime);
      container.appendChild(animeCard);
    });
    
  } catch (error) {
    console.error(`Error displaying anime for category ${category}:`, error);
  }
}

/**
 * Create an anime card element
 * @param {Object} anime - The anime data object
 * @returns {HTMLElement} - The anime card element
 */
function createAnimeCard(anime) {
  const animeCard = document.createElement('div');
  animeCard.className = 'anime-card';
  animeCard.dataset.animeId = anime.id;
  
  animeCard.innerHTML = `
    <div class="anime-image">
      <img src="${anime.image}" alt="${anime.title}">
      <div class="anime-overlay">
        <button class="play-btn"><i class="fas fa-play"></i></button>
      </div>
    </div>
    <div class="anime-info">
      <h3>${anime.title}</h3>
      <div class="anime-meta">
        <span class="rating"><i class="fas fa-star"></i> ${anime.rating || '?'}</span>
        <span class="episodes">${anime.episodes || '?'} Episodes</span>
      </div>
    </div>
  `;
  
  // Add click event to show anime details
  animeCard.addEventListener('click', () => {
    showAnimeDetails(anime.id);
  });
  
  return animeCard;
}

/**
 * Show details for a specific anime
 * @param {string} animeId - The anime ID
 */
async function showAnimeDetails(animeId) {
  try {
    // Fetch anime details
    const animeDetails = await fetchAnimeDetails(animeId);
    
    if (!animeDetails) {
      console.error(`No details found for anime ID: ${animeId}`);
      return;
    }
    
    // Here you would show a modal or navigate to a details page
    // For now, we'll just log the details
    console.log('Anime details:', animeDetails);
    
    // Example: Open a modal with anime details
    // openAnimeModal(animeDetails);
    
  } catch (error) {
    console.error(`Error showing details for anime ID ${animeId}:`, error);
  }
}

/**
 * Initialize the anime display functionality
 */
function initAnimeDisplay() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing anime display...');
    
    // Display trending anime
    displayTrendingAnime();
    
    // Display popular anime
    displayPopularAnime();
    
    // Example: Display anime by category in specific containers
    // displayAnimeByCategory('action', 'action-anime-container');
    // displayAnimeByCategory('romance', 'romance-anime-container');
    
    // Add search functionality
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
      searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = searchForm.querySelector('input');
        if (searchInput && searchInput.value.trim()) {
          const query = searchInput.value.trim();
          const searchResults = await searchAnime(query);
          // Handle search results (e.g., show in a dropdown or navigate to search results page)
          console.log('Search results:', searchResults);
        }
      });
    }
  });
}

// Initialize the anime display
initAnimeDisplay();

// Export functions for use in other files if needed
export {
  displayTrendingAnime,
  displayPopularAnime,
  displayAnimeByCategory,
  showAnimeDetails
};
