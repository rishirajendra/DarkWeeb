/**
 * DAEKWEEB API Service
 * This file contains functions for fetching anime data from the API
 */

// Base API URL - change this to your actual API endpoint
const API_BASE_URL = 'http://localhost:3000/api';

// Fallback data for when the API is not available
const FALLBACK_DATA = {
  trending: [
    { id: '1', title: 'Demon Slayer', image: 'images/anime1.jpg', rating: '9.5', episodes: '24' },
    { id: '2', title: 'Attack on Titan', image: 'images/anime2.jpg', rating: '9.8', episodes: '75' },
    { id: '3', title: 'Jujutsu Kaisen', image: 'images/anime3.jpg', rating: '9.7', episodes: '24' },
    { id: '8', title: 'Vinland Saga', image: 'images/anime8.jpg', rating: '9.5', episodes: '24' },
    { id: '9', title: 'Bleach', image: 'images/anime9.jpg', rating: '9.3', episodes: '366' },
    { id: '10', title: 'Death Note', image: 'images/anime10.jpg', rating: '9.6', episodes: '37' },
    { id: '11', title: 'Naruto Shippuden', image: 'images/anime11.jpg', rating: '9.4', episodes: '500' },
    { id: '12', title: 'Fullmetal Alchemist', image: 'images/anime12.jpg', rating: '9.7', episodes: '64' }
  ],
  popular: [
    { id: '4', title: 'My Hero Academia', image: 'images/anime4.jpg', rating: '9.2', episodes: '113' },
    { id: '5', title: 'One Piece', image: 'images/anime5.jpg', rating: '9.4', episodes: '1000+' },
    { id: '6', title: 'Chainsaw Man', image: 'images/anime6.jpg', rating: '9.6', episodes: '12' },
    { id: '7', title: 'Spy x Family', image: 'images/anime7.jpg', rating: '9.3', episodes: '25' },
    { id: '13', title: 'Hunter x Hunter', image: 'images/anime13.jpg', rating: '9.5', episodes: '148' },
    { id: '14', title: 'Steins;Gate', image: 'images/anime14.jpg', rating: '9.8', episodes: '24' },
    { id: '15', title: 'Violet Evergarden', image: 'images/anime15.jpg', rating: '9.4', episodes: '13' },
    { id: '16', title: 'Made in Abyss', image: 'images/anime16.jpg', rating: '9.6', episodes: '13' }
  ],
  categories: {
    action: [
      { id: '1', title: 'Demon Slayer', image: 'images/anime1.jpg', rating: '9.5', episodes: '24' },
      { id: '2', title: 'Attack on Titan', image: 'images/anime2.jpg', rating: '9.8', episodes: '75' },
      { id: '3', title: 'Jujutsu Kaisen', image: 'images/anime3.jpg', rating: '9.7', episodes: '24' },
      { id: '11', title: 'Naruto Shippuden', image: 'images/anime11.jpg', rating: '9.4', episodes: '500' }
    ],
    romance: [
      { id: '15', title: 'Violet Evergarden', image: 'images/anime15.jpg', rating: '9.4', episodes: '13' },
      { id: '14', title: 'Steins;Gate', image: 'images/anime14.jpg', rating: '9.8', episodes: '24' },
      { id: '7', title: 'Spy x Family', image: 'images/anime7.jpg', rating: '9.3', episodes: '25' }
    ]
  }
};

/**
 * Check if the API is available
 * @returns {Promise<boolean>} - True if the API is available, false otherwise
 */
async function isApiAvailable() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    const response = await fetch(`${API_BASE_URL}/status`, {
      signal: controller.signal
    }).catch(() => false);
    
    clearTimeout(timeoutId);
    return response && response.ok;
  } catch (error) {
    console.warn('API not available, using fallback data');
    return false;
  }
}

/**
 * Fetch anime from a specific category
 * @param {string} category - The category to fetch anime for (e.g., 'action', 'romance')
 * @returns {Promise<Array>} - Array of anime objects
 */
async function fetchAnimeByCategory(category) {
  try {
    // Check if API is available
    if (await isApiAvailable()) {
      const response = await fetch(`${API_BASE_URL}/anime/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const animeData = await response.json();
      return animeData;
    } else {
      // Return fallback data
      return FALLBACK_DATA.categories[category] || [];
    }
  } catch (error) {
    console.error('Error fetching anime by category:', error);
    // Return fallback data on error
    return FALLBACK_DATA.categories[category] || [];
  }
}

/**
 * Fetch trending anime
 * @param {number} limit - Number of anime to fetch (default: 10)
 * @returns {Promise<Array>} - Array of trending anime objects
 */
async function fetchTrendingAnime(limit = 10) {
  try {
    // Check if API is available
    if (await isApiAvailable()) {
      const response = await fetch(`${API_BASE_URL}/anime/trending?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const animeData = await response.json();
      return animeData;
    } else {
      // Return fallback data
      return FALLBACK_DATA.trending.slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    // Return fallback data on error
    return FALLBACK_DATA.trending.slice(0, limit);
  }
}

/**
 * Fetch popular anime for the current season
 * @param {number} limit - Number of anime to fetch (default: 10)
 * @returns {Promise<Array>} - Array of popular anime objects
 */
async function fetchPopularAnime(limit = 10) {
  try {
    // Check if API is available
    if (await isApiAvailable()) {
      const response = await fetch(`${API_BASE_URL}/anime/popular?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const animeData = await response.json();
      return animeData;
    } else {
      // Return fallback data
      return FALLBACK_DATA.popular.slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    // Return fallback data on error
    return FALLBACK_DATA.popular.slice(0, limit);
  }
}

/**
 * Search for anime by title
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of matching anime objects
 */
async function searchAnime(query) {
  try {
    // Check if API is available
    if (await isApiAvailable()) {
      const response = await fetch(`${API_BASE_URL}/anime/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const animeData = await response.json();
      return animeData;
    } else {
      // Return fallback data - simple search in all anime
      const allAnime = [...FALLBACK_DATA.trending, ...FALLBACK_DATA.popular];
      const uniqueAnime = allAnime.filter((anime, index, self) => 
        index === self.findIndex(a => a.id === anime.id)
      );
      
      // Simple search implementation
      return uniqueAnime.filter(anime => 
        anime.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}

/**
 * Fetch details for a specific anime
 * @param {string} id - The anime ID
 * @returns {Promise<Object>} - Anime details object
 */
async function fetchAnimeDetails(id) {
  try {
    // Check if API is available
    if (await isApiAvailable()) {
      const response = await fetch(`${API_BASE_URL}/anime/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const animeData = await response.json();
      return animeData;
    } else {
      // Return fallback data
      const allAnime = [...FALLBACK_DATA.trending, ...FALLBACK_DATA.popular];
      return allAnime.find(anime => anime.id === id) || null;
    }
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
}

// Export all functions for use in other files
export {
  fetchAnimeByCategory,
  fetchTrendingAnime,
  fetchPopularAnime,
  searchAnime,
  fetchAnimeDetails
};
