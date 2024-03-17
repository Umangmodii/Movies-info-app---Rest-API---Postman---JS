
const form = document.getElementById('movieForm');
const movieContainer = document.querySelector('.movie-container');
const search = document.getElementById('search');
const spinner = document.getElementById('spinner');
const breadcrumbResults = document.getElementById('breadcrumbResults');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  spinner.style.display = 'inline-block';
  breadcrumbResults.style.display = 'inline';

  const movieName = search.value.trim();

  if (movieName !== '') {
    await getMovieInfo(movieName);
  }

  spinner.style.display = 'none';
});

const getMovieInfo = async (movieName) => {
  const apiKey = '5ef1341f';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      showMoviesData(data);
    } else {
      movieContainer.innerHTML = '<div class="alert alert-danger" role="alert">Movie not found!</div>';
    }
  } catch (error) {
    console.error('Error fetching movie information:', error);
    movieContainer.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching movie information.</div>';
  }
};

const showMoviesData = (data) => {
  const formattedGenres = data.Genre.split(',').map(genre => genre.trim()).join(', ');
  const formattedReleaseDate = new Date(data.Released).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const movieCard = `
    <div class="card">
      <img src="${data.Poster}" class="card-img-top" alt="Movie Poster">
      <div class="card-body">
        <h4 class="card-title">${data.Title}</h4>
        <p class="card-text">Actors: ${data.Actors}</p>
        <p class="card-text">Released: ${formattedReleaseDate}</p>
        <p class="card-text">Director: ${data.Director}</p>
        <p class="card-text">Writer: ${data.Writer}</p>
        <p class="card-text">Language: ${data.Language}</p>
        <p class="card-text">Genre: ${formattedGenres}</p>
        <a  href="https://www.youtube.com/results?search_query=${data.Title} trailer" class="btn btn-primary" target="_blank">Watch Trailer</a>
        <hr>
        <p class="card-text">IMDB Rating: ${data.imdbRating}</p>
      
      </div>
    </div>
  `;

  movieContainer.innerHTML = movieCard;
};

function showHomePage() {
  movieContainer.innerHTML = '';
  search.value = '';
  breadcrumbResults.style.display = 'none';
}
