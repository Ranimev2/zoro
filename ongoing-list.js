fetch('https://zoronime.com/anime/')
  .then(response => response.json())
  .then(data => {
    const ongoingList = document.getElementById('ongoing-list');
    data.animes.forEach(anime => {
      const listItem = document.createElement('li');
      listItem.textContent = anime.name;
      ongoingList.appendChild(listItem);
    });
  });
