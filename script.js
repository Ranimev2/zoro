// Function to scrape anime data from zoronime.com
async function scrapeAnimeData(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const animeList = doc.querySelectorAll('.anime');
    const animeData = [];
    animeList.forEach(anime => {
        const title = anime.querySelector('h2.title').textContent;
        const url = anime.querySelector('a').getAttribute('href');
        animeData.push({ title, url });
    });
    return animeData;
}

// Function to scrape episode data from zoronime.com
async function scrapeEpisodeData(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const episodeList = doc.querySelectorAll('.episode');
    const episodeData = [];
    episodeList.forEach(episode => {
        const title = episode.querySelector('h2.title').textContent;
        const url = episode.querySelector('a').getAttribute('href');
        episodeData.push({ title, url });
    });
    return episodeData;
}

// Function to scrape ended anime data from zoronime.com
async function scrapeEndedAnimeData(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const endedAnimeList = doc.querySelectorAll('.anime');
    const endedAnimeData = [];
    endedAnimeList.forEach(anime => {
        const title = anime.querySelector('h2.title').textContent;
        endedAnimeData.push({ title });
    });
    return endedAnimeData;
}

// Function to display anime data
function displayAnimeData(animeData, element) {
    const list = document.getElementById(element);
    animeData.forEach(anime => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = anime.url;
        link.textContent = anime.title;
        listItem.appendChild(link);
        list.appendChild(listItem);
    });
}

// Scrape data from multiple sources
async function scrapeData() {
    const homeData = await scrapeAnimeData('https://zoronime.com/home/');
    const ongoingData = await scrapeAnimeData('https://zoronime.com/anime/');
    const completeData = await scrapeEndedAnimeData('https://zoronime.com/tag/ended/');
    const livestreamingData = await scrapeEpisodeData('https://zoronime.com/episode/');

    // Display data
    displayAnimeData(homeData, 'home-list');
    displayAnimeData(ongoingData, 'ongoing-list');
    displayAnimeData(completeData, 'complete-list');
    displayAnimeData(livestreamingData, 'livestreaming-list');
}

// Call the scrapeData function
scrapeData();
