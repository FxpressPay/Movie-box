// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmNmYzMyNGRhNjM1YzcxYTYxZjc2MDQwMDQyNjVlOSIsIm5iZiI6MTcxOTA2MjkzOC4xODgyMDEsInN1YiI6IjY2NzJiNGI5YWJkZDgzY2I3NDM0NWY2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HBYDsrtmsk0RndAvpIrSE10JpLwcD9Oxyq4ZYntQoZE'
//     }
//   };

//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
//     .then(response => response.json())
//     .then(data => {
//         if (data.results && data.results.length > 0) {
//             displayData(data.results);
//         }
//         else{
//             console.error('No results found')
//         }
//     })
//     .catch(err => console.error('Error fetching data', err));

//     function displayData(data){
//         const dataContainer = document.getElementById('grid-container');
//         dataContainer.innerHTML = ''; // clear any existing content

//         //create a list element to hold the data
//         const div1 = document.createElement('div');

//         //Loop through the data and create list items
//         data.forEach(item => {
//             const div = document.createElement('div');
//             const title = item.title || item.name || 'Unknown title';
//             const releaseDate = item.release_Date || item.first_air_date || 'Unknown Release Date';
//             const overview = item.overview || 'No overview avaliable';
//             const posterPath = item.backdrop_path || '';
//             const posterUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/100';
//             const backdropPath = item.backdrop_path || '';
//             const backdropUrl = backdropPath ? `https://image.tmdb.org/t/p/w500${backdropPath}` : 'https://via.placeholder.com/300';
//             const voteAverage = item.vote_average || 'N/A' ;
//             const voteCount = item. vote_count || 'N/A';
//             const popularity = item.popularity || 'N/A';

//             div.innerHTML = `
//             <img src="${posterUrl}" alt="${title}">
//             <h2>${title}</h2>
//             <p><strong>Release Date:</strong> ${releaseDate}</p>
//             <p>${overview}</p>
//             <p><strong>Vote Average: </strong> ${voteAverage} (Votes: ${voteCount})</р>
//             <p><strong>Popularity:</strong> ${popularity}</p>

//             `;
//             div1.appendChild(div);
//         });

//         dataContainer.appendChild(div1);
//     }
const apiKey = "11ca62a738dc81495dca5a3cef42e8f5";
const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const fetchData = async () => {
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) {
      throw new Error("Error fetching movies");
    }
    const data = await res.json();
    const results = data.results;
    displaymovies(results);
    console.log(results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displaymovies = async (movies) => {
  const movieContainer = document.getElementById("grid-container");
  movieContainer.innerHTML = "";

  movies.slice(0, 8).forEach((movie, index) => {
    const content = document.createElement("div");
    content.classList.add("movie-content");
    content.innerHTML = `
    <a href=${`index2.html?movieid=${movie.id}`}>
    <div class="imageHolder">
    <img src=${`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=${
      movie.original_title
    }>
    <h4>${movie.original_title}</h4>`;

    movieContainer.appendChild(content);

    //     const content2 = document.createElement("div");
    //     content2.classList.add("title_details");
    //     content2.innerHTML = `
    //   <h6>${movie.original_title}</h6>`;
    //     content.appendChild(content2);
  });
};

fetchData();

