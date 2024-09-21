// Get the API endpoints
const popularApi = 'https://kumanime-api-weld.vercel.app/api/popular';
const latestApi = 'https://kumanime-api-weld.vercel.app/api/latest';
const animeApi = 'https://kumanime-api-weld.vercel.app/api/anime/';
const episodeApi = 'https://kumanime-api-weld.vercel.app/api/episode/';

// Get the main element
const main = document.querySelector('main');

// Function to fetch API data
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to render anime list
function renderAnimeList(data) {
  const animeList = data.data;
  const html = '';
  animeList.forEach((anime) => {
    html += `
      <div>
        <h2>${anime.title}</h2>
        <p>${anime.description}</p>
        <a href="/anime/${anime.slug}">Read more</a>
      </div>
    `;
  });
  main.innerHTML = html;
}

// Function to render latest episodes
function renderLatestEpisodes(data) {
  const episodes = data.data;
  const html = '';
  episodes.forEach((episode) => {
    html += `
      <div>
        <h2>${episode.title}</h2>
        <p>${episode.description}</p>
        <a href="/episode/${episode.slug}">Watch now</a>
      </div>
    `;
  });
  main.innerHTML = html;
}

// Function to render anime details
function renderAnimeDetails(data) {
  const anime = data.data;
  const html = `
    <h1>${anime.title}</h1>
    <p>${anime.description}</p>
    <h2>Episodes:</h2>
    <ul>
      ${anime.episodes.map((episode) => `<li><a href="/episode/${episode.slug}">${episode.title}</a></li>`).join('')}
    </ul>
  `;
  main.innerHTML = html;
}

// Function to render episode details
function renderEpisodeDetails(data) {
  const episode = data.data;
  const html = `
    <h1>${episode.title}</h1>
    <p>${episode.description}</p>
    <video src="${episode.videoUrl}" controls></video>
  `;
  main.innerHTML = html;
}

// Add event listeners to navigation links
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const url = link.href;
    if (url === '/') {
      fetchData(popularApi).then((data) => renderAnimeList(data));
    } else if (url === '/latest') {
      fetchData(latestApi).then((data) => renderLatestEpisodes(data));
    } else if (url.includes('/anime/')) {
      const slug = url.split('/anime/')[1];
      fetchData(animeApi + slug).then((data) => renderAnimeDetails(data));
    } else if (url.includes('/episode/')) {
      const slug = url.split('/episode/')[1];
      fetchData(episodeApi + slug).then((data) => renderEpisodeDetails(data));
    }
  });
});

// Initialize the website
fetchData(popularApi).then((data) => renderAnimeList(data));
