fetch('https://zoronime.com/home/')
  .then(response => response.json())
  .then(data => {
    const home = document.getElementById('home');
    data.data.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.innerHTML = `
        <h2>${anime.title}</h2>
        <p>Rank: ${anime.rank}</p>
        <p>Score: ${anime.score}</p>
      `;
      home.appendChild(animeCard);
    });
  });
