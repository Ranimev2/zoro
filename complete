fetch('https://zoronime.com/tag/ended/')
  .then(response => response.json())
  .then(data => {
    const completeList = document.getElementById('complete-list');
    data.data.forEach(anime => {
      const listItem = document.createElement('li');
      listItem.textContent = anime.title;
      completeList.appendChild(listItem);
    });
  });
