/**
 * DAEKWEEB Anime API Service
 * Functions to fetch anime data from the API
 */

// 1. Fetch all anime from all categories
async function fetchAllAnime() {
  try {
    const response = await fetch('http://localhost:3000/api/anime/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all anime:', error);
    return getFallbackData().allAnime;
  }
}

// 2. Fetch anime by category (action, romance, sci-fi, fantasy, emotional, comedy)
async function fetchAnimeByCategory(category) {
  try {
    const response = await fetch(`http://localhost:3000/api/anime/category/${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} anime:`, error);
    return getFallbackData().categories[category] || [];
  }
}

// 3. Fetch a specific anime by ID
async function fetchAnimeById(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/anime/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
    const allAnime = getFallbackData().allAnime;
    return allAnime.find(anime => anime.id === id) || null;
  }
}

// Display all anime
function displayAllAnime() {
  fetchAllAnime().then(animeList => {
    // Process the anime list
    console.log('All anime:', animeList);
    
    // Example: Display in a container
    const container = document.getElementById('anime-container');
    if (!container) {
      console.error('Anime container not found');
      return;
    }
    
    container.innerHTML = ''; // Clear previous content
    
    animeList.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.className = 'anime-card';
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
      container.appendChild(animeCard);
      
      // Add click event to show details
      animeCard.addEventListener('click', () => {
        showAnimeDetails(anime.id);
      });
    });
  });
}

// Display anime by category
function displayAnimeByCategory(category) {
  fetchAnimeByCategory(category).then(animeList => {
    console.log(`${category} anime:`, animeList);
    
    // Similar display logic as above
    const container = document.getElementById(`${category}-container`) || document.getElementById('anime-container');
    if (!container) {
      console.error(`Container for ${category} not found`);
      return;
    }
    
    container.innerHTML = '';
    
    animeList.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.className = 'anime-card';
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
      container.appendChild(animeCard);
      
      // Add click event to show details
      animeCard.addEventListener('click', () => {
        showAnimeDetails(anime.id);
      });
    });
  });
}

// Show details for a specific anime
async function showAnimeDetails(animeId) {
  const anime = await fetchAnimeById(animeId);
  
  if (!anime) {
    console.error(`Anime with ID ${animeId} not found`);
    return;
  }
  
  // You can create a modal or dedicated section to show details
  const detailsContainer = document.getElementById('anime-details');
  if (!detailsContainer) {
    // If no details container exists, create a modal
    createAnimeModal(anime);
    return;
  }
  
  detailsContainer.innerHTML = `
    <div class="anime-detail-card">
      <img src="${anime.image}" alt="${anime.title}" class="detail-image">
      <div class="detail-info">
        <h2 class="detail-title">${anime.title}</h2>
        <div class="detail-rating">Rating: ${anime.rating || '?'}</div>
        <p class="detail-description">${anime.description || 'No description available.'}</p>
      </div>
    </div>
  `;
  
  // Show the details container
  detailsContainer.style.display = 'block';
}

// Create a modal for anime details
function createAnimeModal(anime) {
  // Check if modal already exists
  let modal = document.getElementById('anime-modal');
  
  if (!modal) {
    // Create modal if it doesn't exist
    modal = document.createElement('div');
    modal.id = 'anime-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  
  // Set modal content
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <div class="modal-body">
        <img src="${anime.image}" alt="${anime.title}" class="modal-banner">
        <div class="modal-details">
          <h2 class="modal-title">${anime.title}</h2>
          <div class="modal-info">
            <span><i class="fas fa-star"></i> ${anime.rating || '?'}</span>
            <span><i class="fas fa-film"></i> ${anime.episodes || '?'} Episodes</span>
            <span><i class="fas fa-calendar"></i> ${anime.year || 'Unknown'}</span>
          </div>
          <p class="modal-description">${anime.description || 'No description available.'}</p>
          <div class="modal-actions">
            <button class="btn btn-primary watch-btn"><i class="fas fa-play"></i> Watch Now</button>
            <button class="btn btn-secondary"><i class="fas fa-plus"></i> Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Show modal
  modal.style.display = 'block';
  
  // Add close functionality
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Get fallback data when API is not available
function getFallbackData() {
  return {
    allAnime: [
      { id: '1', title: 'Demon Slayer', image: 'images/anime1.jpg', rating: 9.5, episodes: 24, year: 2019, description: 'Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister is turned into a demon.' },
      { id: '2', title: 'Attack on Titan', image: 'images/anime2.jpg', rating: 9.8, episodes: 75, year: 2013, description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.' },
      { id: '3', title: 'Jujutsu Kaisen', image: 'images/anime3.jpg', rating: 9.7, episodes: 24, year: 2020, description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon\'s other body parts and thus exorcise himself.' },
      { id: '4', title: 'My Hero Academia', image: 'images/anime4.jpg', rating: 9.2, episodes: 113, year: 2016, description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.' },
      { id: '5', title: 'One Piece', image: 'images/anime5.jpg', rating: 9.4, episodes: 1000, year: 1999, description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.' },
      { id: '6', title: 'Chainsaw Man', image: 'images/anime6.jpg', rating: 9.6, episodes: 12, year: 2022, description: 'Following a betrayal, a young man left for dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.' },
      { id: '7', title: 'Spy x Family', image: 'images/anime7.jpg', rating: 9.3, episodes: 25, year: 2022, description: 'A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.' },
      { id: '8', title: 'Vinland Saga', image: 'images/anime8.jpg', rating: 9.5, episodes: 24, year: 2019, description: 'Thorfinn pursues a journey with his father\'s killer in order to take revenge and end his life in a duel as an honorable warrior and pay his father a homage.' },
      { id: '9', title: 'Bleach', image: 'images/anime9.jpg', rating: 9.3, episodes: 366, year: 2004, description: 'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".' },
      { id: '10', title: 'Death Note', image: 'images/anime10.jpg', rating: 9.6, episodes: 37, year: 2006, description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.' },
      { id: '11', title: 'Naruto Shippuden', image: 'images/anime11.jpg', rating: 9.4, episodes: 500, year: 2007, description: 'Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.' },
      { id: '12', title: 'Fullmetal Alchemist', image: 'images/anime12.jpg', rating: 9.7, episodes: 64, year: 2009, description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.' },
      { id: '13', title: 'Hunter x Hunter', image: 'images/anime13.jpg', rating: 9.5, episodes: 148, year: 2011, description: 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks for his father who left him when he was younger.' },
      { id: '14', title: 'Steins;Gate', image: 'images/anime14.jpg', rating: 9.8, episodes: 24, year: 2011, description: 'A group of friends create a device that can send messages to the past, but their actions have unforeseen consequences.' },
      { id: '15', title: 'Violet Evergarden', image: 'images/anime15.jpg', rating: 9.4, episodes: 13, year: 2018, description: 'In the aftermath of a great war, Violet Evergarden, a young female ex-soldier, gets a job at a writers\' agency and goes on assignments to create letters that can connect people.' },
      { id: '16', title: 'Made in Abyss', image: 'images/anime16.jpg', rating: 9.6, episodes: 13, year: 2017, description: 'A young girl finds a robot boy and descends with him into the "Abyss", a mysterious and deep hole in the Earth, in search of her mother.' }
    ],
    categories: {
      action: [
        { id: '1', title: 'Demon Slayer', image: 'images/anime1.jpg', rating: 9.5, episodes: 24, year: 2019 },
        { id: '2', title: 'Attack on Titan', image: 'images/anime2.jpg', rating: 9.8, episodes: 75, year: 2013 },
        { id: '3', title: 'Jujutsu Kaisen', image: 'images/anime3.jpg', rating: 9.7, episodes: 24, year: 2020 },
        { id: '11', title: 'Naruto Shippuden', image: 'images/anime11.jpg', rating: 9.4, episodes: 500, year: 2007 }
      ],
      romance: [
        { id: '15', title: 'Violet Evergarden', image: 'images/anime15.jpg', rating: 9.4, episodes: 13, year: 2018 },
        { id: '14', title: 'Steins;Gate', image: 'images/anime14.jpg', rating: 9.8, episodes: 24, year: 2011 },
        { id: '7', title: 'Spy x Family', image: 'images/anime7.jpg', rating: 9.3, episodes: 25, year: 2022 }
      ],
      fantasy: [
        { id: '1', title: 'Demon Slayer', image: 'images/anime1.jpg', rating: 9.5, episodes: 24, year: 2019 },
        { id: '8', title: 'Vinland Saga', image: 'images/anime8.jpg', rating: 9.5, episodes: 24, year: 2019 },
        { id: '16', title: 'Made in Abyss', image: 'images/anime16.jpg', rating: 9.6, episodes: 13, year: 2017 }
      ],
      'sci-fi': [
        { id: '14', title: 'Steins;Gate', image: 'images/anime14.jpg', rating: 9.8, episodes: 24, year: 2011 },
        { id: '6', title: 'Chainsaw Man', image: 'images/anime6.jpg', rating: 9.6, episodes: 12, year: 2022 }
      ],
      comedy: [
        { id: '7', title: 'Spy x Family', image: 'images/anime7.jpg', rating: 9.3, episodes: 25, year: 2022 },
        { id: '4', title: 'My Hero Academia', image: 'images/anime4.jpg', rating: 9.2, episodes: 113, year: 2016 }
      ],
      emotional: [
        { id: '15', title: 'Violet Evergarden', image: 'images/anime15.jpg', rating: 9.4, episodes: 13, year: 2018 },
        { id: '10', title: 'Death Note', image: 'images/anime10.jpg', rating: 9.6, episodes: 37, year: 2006 }
      ]
    }
  };
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing anime API...');
  
  // Check if we have category buttons
  const categoryButtons = document.querySelectorAll('.category-button');
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (category === 'all') {
          displayAllAnime();
        } else {
          displayAnimeByCategory(category);
        }
      });
    });
    
    // Display all anime by default
    displayAllAnime();
  } else {
    // If no category buttons, populate trending and popular sections
    const trendingContainer = document.querySelector('.trending .anime-slider');
    const popularContainer = document.querySelector('.popular .anime-grid');
    
    if (trendingContainer) {
      trendingContainer.id = 'trending-container';
      displayAnimeByCategory('action'); // Use action as trending
    }
    
    if (popularContainer) {
      popularContainer.id = 'popular-container';
      setTimeout(() => {
        displayAnimeByCategory('fantasy'); // Use fantasy as popular
      }, 500);
    }
  }
});

// Export functions for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchAllAnime,
    fetchAnimeByCategory,
    fetchAnimeById,
    displayAllAnime,
    displayAnimeByCategory,
    showAnimeDetails
  };
}
