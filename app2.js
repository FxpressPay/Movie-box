const params = new URLSearchParams(window.location.search);
const newId = params.get("movieid");
window.onload = () => {
  if (!newId) {
    window.location.href = "index.html";
  }
};

const box_header = document.querySelector(".title")
box_header.innerHTML = `<a href="index.html">MovieBox</a>`

const home_url = document.querySelector(".home_url")
home_url.innerHTML = `<i class="fas fa-home"></i> <a href="index.html">Home</a>`

const id = newId;
const apiKey = "11ca62a738dc81495dca5a3cef42e8f5";
const baseUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

async function getMovieDetails() {
  try {
    const response = await fetch(movieDetailsUrl);
    if (!response.ok) {
      throw new Error("Error fetching details");
    }
    const details = await response.json();
    return details; // Return the details object directly
  } catch (error) {
    console.error("Error fetching details", error);
    throw error; // Re-throw the error to propagate it
  }
}

async function fetchVideo() {
  try {
    // Fetch movie details first
    const movieDetails = await getMovieDetails();
    console.log(movieDetails);

    // Then fetch videos
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Error fetching movies");
    }
    const data = await response.json();
    const results = data.results;
    const filteredVideos = results.filter(
      (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
    );
    if (filteredVideos.length === 0) {
      throw new Error("No YouTube trailers found");
    }

    const randomTrailer =
      filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    let trailerUrl;
    if (randomTrailer.site === "YouTube") {
      trailerUrl = `https://www.youtube.com/embed/${randomTrailer.key}?si=ebdoBZ2qB8a13ZGr`;
    } else {
      trailerUrl = `https://vimeo.com/${randomTrailer.key}`;
    }

    // Assuming there's an HTML element with tag 'iframe' where you want to display the video
    let video = document.querySelector("iframe");
    video.src = trailerUrl;
    if (video.src == trailerUrl) {
      const loader = document.querySelector(`.loader`);
      setTimeout(() => {
        loader.style = "display:none;";
      }, 3000);
    }

    // Update the title or any other details based on movieDetails
    const dataContainer = document.getElementById("movieName");
    const overview = document.querySelector(".descs");
    const runtime = document.querySelector(".runtime");
    const rel_date = document.querySelector(".rel_date");
    const genre1 = document.querySelector(".action");
    const genre2 = document.querySelector(".thriller");
    const vote = document.querySelector(".vote");
    const star_rating = document.querySelector(".star_rating");

    console.log(movieDetails.genres);

    const releaseDate = new Date(movieDetails.release_date);
    const formattedDate = releaseDate.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    rel_date.innerHTML = `Release Date: ${formattedDate}`;

    star_rating.innerHTML = `${movieDetails.vote_average}`;
    vote.innerHTML = `${movieDetails.vote_count} votes`;
    genre1.innerHTML = `${movieDetails.genres[0].name}`;
    genre2.innerHTML = `${movieDetails.genres[1].name}`;
    runtime.innerHTML = `Runtime: ${movieDetails.runtime} mins`;
    overview.innerHTML = movieDetails.overview;
    dataContainer.innerHTML = `${movieDetails.title}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


fetchVideo();

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('log').addEventListener('click', function(){
    window.location.href = 'index.html';
  });
});
