document.getElementById('searchButton').addEventListener('click', function() {
    const animeName = document.getElementById('animeInput').value.trim();
    const episodeNumber = document.getElementById('episodeInput') ? document.getElementById('episodeInput').value.trim() : null;
    
    if (animeName) {
        fetchAnimeDetails(animeName, episodeNumber || 1); // Default ke episode 1 jika tidak ada input
    } else {
        alert('Please enter an anime name');
    }
});

document.getElementById('prevOngoingPageButton').addEventListener('click', function() {
    if (currentOngoingPage > 1) {
        fetchPopularOngoingAnime(currentOngoingPage - 1);
    }
});

document.getElementById('nextOngoingPageButton').addEventListener('click', function() {
    fetchPopularOngoingAnime(currentOngoingPage + 1);
});

document.getElementById('prevFinishedPageButton').addEventListener('click', function() {
    if (currentFinishedPage > 1) {
        fetchPopularFinishedAnime(currentFinishedPage - 1);
    }
});

document.getElementById('nextFinishedPageButton').addEventListener('click', function() {
    fetchPopularFinishedAnime(currentFinishedPage + 1);
});

let currentOngoingPage = 1;
let currentFinishedPage = 1;

async function fetchAnimeDetails(anime, eps) {
    const apiUrl = `https://ranimev2-api.vercel.app/kuramanime/anime/${anime}/${eps}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error fetching anime details. Status: ${response.status}`);
        
        const data = await response.json();
        if (data && data.anime) {
            displayAnimeDetails(data.anime);
        } else {
            alert('Anime or episode not found');
        }
    } catch (error) {
        handleError(error, 'Error fetching anime details');
    }
}

async function fetchPopularOngoingAnime(page) {
    const apiUrl = `https://ranimev2-api.vercel.app/kuramanime/ongoing/popular?page=${page}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error fetching popular ongoing anime. Status: ${response.status}`);
        
        const data = await response.json();
        if (data && data.animeList) {
            currentOngoingPage = page;
            displayPopularAnime(data.animeList, 'popularOngoingList');
        } else {
            alert('Failed to fetch popular ongoing anime');
        }
    } catch (error) {
        handleError(error, 'Error fetching popular ongoing anime');
    }
}

async function fetchPopularFinishedAnime(page) {
    const apiUrl = `https://kumanime-api-weld.vercel.app/api/movie/page/${page}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error fetching popular finished anime. Status: ${response.status}`);
        
        const data = await response.json();
        if (data && data.animeList) {
            currentFinishedPage = page;
            displayPopularAnime(data.animeList, 'popularFinishedList');
        } else {
            alert('Failed to fetch movie anime');
        }
    } catch (error) {
        handleError(error, 'Error fetching movie anime');
    }
}

function displayAnimeDetails(anime) {
    document.getElementById('animeImage').src = anime.image_url || '';
    document.getElementById('animeTitle').innerText = anime.title || 'No title available';
    document.getElementById('animeDescription').innerText = anime.description || 'No description available';
}

function displayPopularAnime(animeList, elementId) {
    const popularAnimeList = document.getElementById(elementId);
    popularAnimeList.innerHTML = '';
    animeList.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.className = 'animeItem';
        animeItem.innerHTML = `
            <img src="${anime.image_url || ''}" alt="${anime.title || 'No title available'}">
            <h3>${anime.title || 'No title available'}</h3>
        `;
        popularAnimeList.appendChild(animeItem);
    });
}

function handleError(error, message) {
    console.error(message, error);
    alert(message);
}

// Initial load of popular ongoing anime
fetchPopularOngoingAnime(currentOngoingPage);

// Initial load of popular finished anime
fetchPopularFinishedAnime(currentFinishedPage);
