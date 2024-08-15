document.addEventListener('DOMContentLoaded', function() {
    const searchForm= document.getElementById('searchMovieForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm= document.getElementById('movie_search_term').value.trim();
        if (!searchTerm) {
            displayError('Please enter a search term.');
            return;
        }
        axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${encodeURIComponent(searchTerm)}&page=1`)
            .then(response=> {
                if (response.data.Error) {
                    displayError('No results found.');
                    return;
                }
                axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${encodeURIComponent(searchTerm)}&page=2`)
                    .then(secondResponse=> {
                        const firstPageMovies= response.data.Search;
                        const secondPageMovies= secondResponse.data.Search || [];
                        const allMovies= firstPageMovies.concat(secondPageMovies).slice(0, 20);
                        displayMovies(allMovies);
                    })
                    .catch(error=> {
                        console.error('Error fetching second page of data:', error);
                        displayError('Failed to get second page of data.');
                    });
            })
            .catch(error=> {
                console.error('Error fetching first page of data:', error);
                displayError('Failed to get first page of data.');
            });
    });
    document.getElementById('movieDetails').addEventListener('click', function(event) {
        if (event.target.id=== 'backToSearchResults') {
            document.getElementById('movieDetails').setAttribute('hidden', true);
            document.getElementById('searchResults').removeAttribute('hidden');
            document.getElementById('rootLink').setAttribute('hidden', true);
        }
    });
    document.getElementById('searchResults').addEventListener('click', function(event) {
        const target= event.target;
        if (target.tagName.toLowerCase()=== 'a') {
            event.preventDefault();
            const movieId= target.getAttribute('data-id');
            document.getElementById('searchResults').setAttribute('hidden', true);
            const detailsContainer= document.getElementById('movieDetails');
            detailsContainer.innerHTML= '';
            axios.get(`http://www.omdbapi.com/?apikey=CS546&i=${movieId}`)
                .then(response=> {
                    const movie= response.data;
                    if (!movie.Title) {
                        detailsContainer.innerHTML= 'Movie details not found.';
                    } else {
                        detailsContainer.innerHTML= generateMovieDetailsHTML(movie);
                    }
                    detailsContainer.removeAttribute('hidden');
                    document.getElementById('rootLink').removeAttribute('hidden');
                })
                .catch(error=> {
                    console.error('Error fetching movie details:', error);
                    displayError('Failed to fetch movie details.');
                });
        }
    });
    document.getElementById('rootLink').addEventListener('click', function(event) {
        event.preventDefault();
        location.reload();
    });
    const cornerImages= document.querySelectorAll('.corner-image');
    cornerImages.forEach(img=> {
        img.classList.add('fade-in');
    });
});

function displayMovies(movies) {
    const resultsContainer= document.getElementById('searchResults');
    resultsContainer.innerHTML= '';
    movies.forEach(movie=> {
        const li= document.createElement('li');
        li.innerHTML= `<a href='javascript:void(0)' data-id="${movie.imdbID}">${movie.Title}</a>`;
        resultsContainer.appendChild(li);
    });
    resultsContainer.removeAttribute('hidden');
    document.getElementById('movieDetails').setAttribute('hidden', true);
    document.getElementById('rootLink').setAttribute('hidden', true);
}

function generateMovieDetailsHTML(movie) {
    return `
        <article>
            <h1>${movie.Title || 'N/A'}</h1>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : '/no_image.jpg'}" alt="${movie.Title} Poster">
            <h2>Plot</h2>
            <p>${movie.Plot || 'N/A'}</p>
            <section>
                <h3>Info</h3>
                <dl>
                    <dt>Year Released:</dt>
                    <dd>${movie.Year || 'N/A'}</dd>
                    <dt>Rated:</dt>
                    <dd>${movie.Rated || 'N/A'}</dd>
                    <dt>Runtime:</dt>
                    <dd>${movie.Runtime || 'N/A'}</dd>
                    <dt>Genre(s):</dt>
                    <dd>${movie.Genre || 'N/A'}</dd>
                    <dt>Box Office Earnings:</dt>
                    <dd>${movie.BoxOffice || 'N/A'}</dd>
                    <dt>DVD Release Date:</dt>
                    <dd>${movie.DVD || 'N/A'}</dd>
                </dl>
            </section>
            <section>
                <h4>Cast and Crew</h4>
                <p><strong>Director:</strong> ${movie.Director || 'N/A'}</p>
                <p><strong>Writer:</strong> ${movie.Writer || 'N/A'}</p>
                <p><strong>Cast:</strong> ${movie.Actors || 'N/A'}</p>
            </section>
        </article>
        <button id="backToSearchResults" class="back-button">Back to Search Results</button>
    `;
}

function displayError(message) {
    const err= document.getElementById('errorContainer');
    err.textContent= message;
    err.removeAttribute('hidden');
    setTimeout(()=> { err.setAttribute('hidden', true); }, 5000);
}
