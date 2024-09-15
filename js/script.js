// script.js
require('dotenv').config();

const apiUrl = process.env.API_URL;

// ... rest of the code ...

function getAnimeData(endpoint) {
    fetch(`${apiUrl}/anime/${endpoint}`)
        .then(response => response.json())
        .then(data => {
            const animeList = document.getElementById('anime-list');
            animeList.innerHTML = '';
            data.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.textContent = anime.title;
                animeElement.onclick = () => {
                    getEpisodeData(anime.title);
                };
                animeList.appendChild(animeElement);
            });
        });
}

// Fungsi untuk meng
function getEpisodeData(anime, eps) {
    fetch(`${apiUrl}/anime/${anime}/${eps}`)
        .then(response => response.json())
        .then(data => {
            const episodeList = document.getElementById('episode-list');
            episodeList.innerHTML = ''; // Hapus isi sebelumnya
            data.forEach(episode => {
                const episodeElement = document.createElement('div');
                episodeElement.textContent = `Episode ${episode.episode} - ${episode.title}`;
                episodeList.appendChild(episodeElement);
            });
        });
}

// Fungsi untuk mengambil data ongoing dan finished
function getOngoingData(page) {
    fetch(`${apiUrl}/ongoing/popular?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const ongoingList = document.getElementById('ongoing-list');
            data.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.textContent = anime.title;
                ongoingList.appendChild(animeElement);
            });
        });
}

function getFinishedData(page) {
    fetch(`${apiUrl}/finished/popular?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const finishedList = document.getElementById('finished-list');
            data.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.textContent = anime.title;
                finishedList.appendChild(animeElement);
            });
        });
}

// Fungsi untuk mengambil data pencarian
function searchAnime(keyword, page) {
    fetch(`${apiUrl}/search?query=${keyword}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const searchList = document.getElementById('search-list');
            searchList.innerHTML = ''; // Hapus isi sebelumnya
            data.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.textContent = anime.title;
                animeElement.onclick = () => {
                    getEpisodeData(anime.title);
                };
                searchList.appendChild(animeElement);
            });
        });
}

// Fungsi untuk mengambil data genres
function getGenres() {
    fetch(`${apiUrl}/genres`)
        .then(response => response.json())
        .then(data => {
            const genresList = document.getElementById('genres-list');
            genresList.innerHTML = ''; // Hapus isi sebelumnya
            data.forEach(genre => {
                const genreElement = document.createElement('div');
                genreElement.textContent = genre.name;
                genreElement.onclick = () => {
                    getAnimeByGenre(genre.name);
                };
                genresList.appendChild(genreElement);
            });
        });
}

// Fungsi untuk mengambil data anime berdasarkan genre
function getAnimeByGenre(endpoint,page) {
    fetch(`${apiUrl}/anime/genres/${endpoint}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const animeList = document.getElementById('anime-list');
            animeList.innerHTML = ''; // Hapus isi sebelumnya
            data.forEach(anime => {
                const animeElement = document.createElement('div');
                animeElement.textContent = anime.title;
                animeElement.onclick = () => {
                    getEpisodeData(anime.title);
                };
                animeList.appendChild(animeElement);
            });
        });
}

// Fungsi untuk mengambil data semua genres
function getAllGenres(endpoint, page) {
    fetch(`${apiUrl}/genres/${endpoint}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const genresList = document.getElementById('genres-list');
            genresList.innerHTML = ''; // Hapus isi sebelumnya
            data.forEach(genre => {
                const genreElement = document.createElement('div');
                genreElement.textContent = genre.name;
                genreElement.onclick = () => {
                    getAnimeByGenre(genre.name);
                };
                genresList.appendChild(genreElement);
            });
        });
}

// Panggil fungsi-fungsi di atas
getOngoingData();
getFinishedData();
getAnimeData(''); // Ganti dengan endpoint yang diinginkan
getGenres();
getAllGenres('all', 1); // Get all genres

// Tambahkan event listener untuk mengambil data episode ketika anime diklik
document.getElementById('anime-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        const animeTitle = e.target.textContent;
        getEpisodeData(animeTitle);
    }
});

// Tambahkan event listener untuk pencarian
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    const page = 1;
    searchAnime(query, page);
});
