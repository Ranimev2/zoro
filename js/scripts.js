document.getElementById('searchButton').addEventListener('click', function() {
    const animeName = document.getElementById('animeInput').value.trim();
    if (animeName) {
        fetchAnimeDetails(animeName);
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

function fetchAnimeDetails(anime, eps) {
    const apiUrl = `https://ranimev2-api.vercel.app/kuramanime/anime/${anime}/${eps}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.anime) {
                displayAnimeDetails(data.anime);
            } else {
                alert('Anime not found');
            }
        })
        .catch(error => {
            console.error('Error fetching anime details:', error);
            alert('Error fetching anime details');
        });
}

function displayAnimeDetails(anime) {
    document.getElementById('animeImage').src = anime.image_url || '';
    document.getElementById('animeTitle').innerText = anime.title || 'No title available';
    document.getElementById('animeDescription').innerText = anime.description || 'No description available';
}

function fetchPopularOngoingAnime(page) {
    const apiUrl = `https://ranimev2-api.vercel.app/kuramanime/ongoing/popular?page=${page}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.animeList) {
                currentOngoingPage = page;
                displayPopularAnime(data.animeList, 'popularOngoingList');
            } else {
                alert('Failed to fetch popular ongoing anime');
            }
        })
        .catch(error => {
            console.error('Error fetching popular ongoing anime:', error);
            alert('Error fetching popular ongoing anime');
        });
}

function fetchPopularFinishedAnime(page) {
    const apiUrl = `https://ranimev2-api.vercel.app/kuramanime/finished/popular?page=${page}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.animeList) {
                currentFinishedPage = page;
                displayPopularAnime(data.animeList, 'popularFinishedList');
            } else {
                alert('Failed to fetch popular finished anime');
            }
        })
        .catch(error => {
            console.error('Error fetching popular finished anime:', error);
            alert('Error fetching popular finished anime');
        });
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

// Initial load of popular ongoing anime
fetchPopularOngoingAnime(currentOngoingPage);

// Initial load of popular finished anime
fetchPopularFinishedAnime(currentFinishedPage);
