let currentPage = 1;
let totalResults = 0;
const resultsPerPage = 12;

function searchMovie(page = 1) {
  const query = document.getElementById('search-input').value;
  const url = `https://www.omdbapi.com/?apikey=4046b94d&s=${encodeURIComponent(query)}&page=${page}`;

  fetch(url, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = '';

      if (data.Search) {
        totalResults = parseInt(data.totalResults);
        data.Search.forEach(movie => {
          const movieCard = document.createElement('div');
          const imgPoster = document.createElement('img');
          const moovieTile = document.createElement('h3');
          const moovieYear = document.createElement('p');
          const titleContainer = document.createElement('div');

          imgPoster.src = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg';
          imgPoster.alt = movie.Title;
          moovieTile.innerHTML = movie.Title;
          moovieYear.innerHTML = movie.Year;

          movieCard.classList.add('movie-card');

          titleContainer.style.display = 'flex';
          titleContainer.style.flexDirection = 'column';
          titleContainer.style.alignContent = 'middle';

          movieCard.appendChild(imgPoster);
          movieCard.appendChild(titleContainer);
          titleContainer.appendChild(moovieTile);
          titleContainer.appendChild(moovieYear);

          moviesContainer.appendChild(movieCard);
        });

        updatePaginationControls();
      } else {
        const alert = document.getElementById('p');
        alert.innerHTML = "No se encontraron resultados.";
        moviesContainer.appendChild(alert);
        totalResults = 0;
        updatePaginationControls();
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}

function updatePaginationControls() {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * resultsPerPage >= totalResults;
}

document.getElementById('search-button').addEventListener('click', function () {
  currentPage = 1;
  const containerButtoms = document.getElementById('pagination-controls');
  containerButtoms.style.display = 'flex';
  searchMovie(currentPage);
});

document.getElementById('prev-page').addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    searchMovie(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', function () {
  if (currentPage * resultsPerPage < totalResults) {
    currentPage++;
    searchMovie(currentPage);
  }
});
