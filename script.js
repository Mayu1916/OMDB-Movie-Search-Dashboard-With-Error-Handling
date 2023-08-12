const apiKeyInput = document.getElementById('api-key');
const movieTitleInput = document.getElementById('movie-title');
const searchBtn = document.getElementById('search-btn');
const loader = document.querySelector('.loader');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', searchMovies);

function searchMovies() {
  const apiKey = apiKeyInput.value.trim();
  const movieTitle = movieTitleInput.value.trim();

  if (!apiKey || !movieTitle) {
    alert('Please enter both API Key and Movie Title.');
    return;
  }

  loader.style.display = 'block';
  resultsContainer.innerHTML = '';

  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';

      if (data.Error) {
        alert(data.Error);
        return;
      }

      const movies = data.Search;
      if (movies) {
        movies.forEach(movie => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <a class="more-details" href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
          `;
          resultsContainer.appendChild(card);
        });
      }
    })
    .catch(error => {
      loader.style.display = 'none';
      alert('An error occurred. Please check your API Key or try again later.');
      console.error(error);
    });
}
