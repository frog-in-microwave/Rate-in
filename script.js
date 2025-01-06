

// variable declaring section

let action_movies = [];
let drama_movies = [];
let comedy_movies = [];
let horror_movies = [];


// each single movie genre in tdmb api has a number, this is basicaly the genre names with their respective numbers

const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure"
};



// loader, the loading gif is there till the website loades

window.onload = function(){
    document.getElementById("preloader").style.display = "none";
};

// this will fetch the movies based on their genres and display them in the suggestions section 

pick_movies("action");
pick_movies("drama");
pick_movies("comedy");
pick_movies("horror");

// when the user clicks on a movie it takes them to another page. 
// if the page the user is on is that page the code will get executed and the stats will be displayed

if(window.location == "http://127.0.0.1:5500/movie_rating.html" || window.location == "https://ratin-movies.netlify.app/movie_rating.html"){
    if(localStorage.getItem("tvmaze") == "true"){
        change_movie_info_tvmaze(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
        console.log(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
    }
    else{
        change_movie_info(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
    }
}



// if the submitt button is clicked, it will fetch the movie via its name from the api


document.getElementById("submit_button").addEventListener("click" , (event) => {
    event.preventDefault();
    document.getElementById("image_container").innerHTML = ``;
    fetch_it_up(document.getElementById("movie_name").value);
});


// if any of the change-genres button is clicked, it will call the pick_movies function which fetches movies 
// from that same genre and displayes them again 

document.getElementById("action_change_suggestion").addEventListener("click" , () => {
    
    pick_movies("action");
})
document.getElementById("drama_change_suggestion").addEventListener("click" , () => {
    
    pick_movies("drama");
})
document.getElementById("comedy_change_suggestion").addEventListener("click" , () => {
    
    pick_movies("comedy");
})
document.getElementById("horror_change_suggestion").addEventListener("click" , () => {
    
    pick_movies("horror");
})




















// the fetch_it_up section takes the movie name and fetches a list of objects containing movies with 
// similar names from the api 
async function fetch_it_up(movie_name) {

    // awaiting the raw data

    let raw = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bb6d40f1ec23736b063916ee085c0e95&query=${encodeURIComponent(movie_name)}`);
    
    // awaiting the raw dat to be transfered into a usable list
    
    let movie_list = await raw.json();
    document.getElementById("image_container").style.aspectRatio = "3 / 2";
    display_genre_movies(movie_list , "image_container");
}




//based on the genre, the pick_movies function will fetch a list of movies randomly from the api

// the api only allows for the use of lists of movies that are numbered less than 500 (idk why)

// the 4 movie genres that are choosen for the suggestions section have more than 500 lists of movies in the tdmb api
// so no need for a protection measure here

async function pick_movies(genre) {
    if(genre == "action"){
        let raw = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bb6d40f1ec23736b063916ee085c0e95&with_genres=28&language=en-US&page=${Math.floor(Math.random() * 500)}`);
        action_movies = await raw.json();
        display_genre_movies(action_movies , "action_image_container");
    }
    else if(genre == "drama"){
        let raw = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bb6d40f1ec23736b063916ee085c0e95&with_genres=18&language=en-US&page=${Math.floor(Math.random() * 500)}`);
        drama_movies = await raw.json();
        display_genre_movies(drama_movies , "drama_image_container");
    }
    else if(genre == "comedy"){
        let raw = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bb6d40f1ec23736b063916ee085c0e95&with_genres=35&language=en-US&page=${Math.floor(Math.random() * 500)}`);
        comedy_movies = await raw.json();
        display_genre_movies(comedy_movies , "comedy_image_container");
    }
    else if(genre == "horror"){
        let raw = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bb6d40f1ec23736b063916ee085c0e95&with_genres=27&language=en-US&page=${Math.floor(Math.random() * 500)}`);
        horror_movies = await raw.json();
        display_genre_movies(horror_movies , "horror_image_container");
    }
    
}














// the display_movie_stats function puts the movie object in the local storage 
// and transfers the user to the movie_rating.html

function display_movie_stats(movie){
    localStorage.setItem("movie_to_display_ratings" , JSON.stringify(movie));
    window.location.href = "movie_rating.html";
}





// the stop_spinner function take an element as an argument and 
// sets the display of the sibling just before it to none

// this requires the spinner to be just before the element which is not a problem

function stop_spinner(element){
    element.previousElementSibling.style.display = "none";
    element.style.display = "block";
}


// the display movies function takes the movie list and the html container 
// then creats a div for each movie in that list

// the divs are subjected to event listeners so the movie name will show on mouse hover and disapear on mouse out

// the div contains a bootstrap spinner that disapears via the stop spinner function called on the image load

function display_genre_movies(movie_list , image_container_id){
    document.getElementById(image_container_id).innerHTML = ``;
    for(let i = 0; i < movie_list.results.length; i++){
        let div = document.createElement("div");
        console.log(movie_list.results[i].adult);
        if(movie_list.results[i].poster_path != null){
            
            div.innerHTML = `
            <div class="movie_overlay"></div>
            
            <div style="width: 100%;height: 100%;display: flex; align-items: center; justify-content: center;">
                <div class="spinner-border text-warning" role="status"></div>
            </div>
            <img onload="stop_spinner(this)" style="width: 210px; height: 295px; object-fit: cover; display: none;" src = "https://image.tmdb.org/t/p/w200/${movie_list.results[i].poster_path}" >
            `;
        }
        else{

            div.innerHTML = `
            <div class="movie_overlay"></div>
            
            <div style="width: 100%;height: 100%;display: flex; align-items: center; justify-content: center; ">
                <div class="spinner-border text-warning" role="status"></div>
            </div>
            <img onload="stop_spinner(this)" style="width: 210px; height: 295px; object-fit: cover; display: none;" src = "images/poster_image_placeholder.png" >
            <div class="imageless_name">${movie_list.results[i].title}</div>
            `;
        }
        div.className = "movie_div";
        document.getElementById(image_container_id).append(div);
        div.addEventListener("mouseover" , () => {
            div.querySelector(".movie_overlay").style.opacity = "0.7";
            div.querySelector(".movie_overlay").innerHTML = `${movie_list.results[i].title}`;
            
        });
        
        div.addEventListener("mouseout" , () => {
            div.querySelector(".movie_overlay").style.opacity = "0";
            div.querySelector(".movie_overlay").innerHTML = ``;
            });
        
        div.querySelector(".movie_overlay").addEventListener("click" , () => {
            console.log(movie_list);
            localStorage.setItem("tvmaze" , "false");
            display_movie_stats(movie_list.results[i]);
        });
    }
}







// the change_movie_info_tmdb function just changes the innerhtml of the elements in the movie_rating.html 



function change_movie_info(movie){

    // if the movie name exists, set the title a it 
    // and make the link to pirate bay towards a video with the name of the movie
    
    if(movie.title  != null){
        document.getElementById("rated_movie_name").textContent = movie.title ;
        document.getElementById("pirate_bay_download").style.display = "inline-block";
        document.getElementById("pirate_bay_download").href = `https://thepiratebay10.info/search/${movie.title}/1/99/200`;
    }
    if(movie.poster_path == null){
        console.log(movie);
        document.getElementById("rated_movie_image").src = "images/poster_image_placeholder.png";
    }
    else{
        document.getElementById("rated_movie_image").src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    }
    if(movie.backdrop_path != null){
        document.getElementById("rated_movie_backdrop").style.display = "block";
        document.getElementById("rated_movie_backdrop").src = `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`;

    }
    else{
        document.getElementById("rated_movie_backdrop").style.display = "none";
    }
    if(movie.original_language != null){
        document.getElementById("rated_movie_lang").innerHTML = `<span class="info_title">Language : </span>` + movie.original_language;
    }
    if(movie.original_title != null){
        document.getElementById("rated_movie_lang").innerHTML = `<span class="info_title">Original Title : </span>` + movie.original_title;
    }
    if(movie.overview != null && movie.overview != ""){
        document.getElementById("rated_movie_summery").innerHTML = `<span class="info_title">Summery : </span>` + movie.overview;
    }
    if(movie.genre_ids != null){
        document.getElementById("rated_movie_genres").innerHTML = `<span class="info_title">Genres : </span>`;
        
        // display only known genres

        for(let genre_num of movie.genre_ids){
            if(genre_num_to_name(genre_num) != "unknown"){

                document.getElementById("rated_movie_genres").innerHTML += `${genre_num_to_name(genre_num)}, `;
            }
        }
        document.getElementById("rated_movie_genres").innerHTML = document.getElementById("rated_movie_genres").innerHTML.slice(0 , -2);
    }

    // change the color based on how high the rating is

    if(movie.vote_average != null && movie.vote_average != 0){
        let rating_color;
        if(movie.vote_average < 5){
            rating_color = "ff0000";
        }
        else if(movie.vote_average < 7){
            rating_color = "ffffff";
        }
        else{
            rating_color = "FFD700";
        }
        document.getElementById("rated_movie_rating").innerHTML = `<span class="info_title">Rating : </span> <span style="color: #${rating_color};">${movie.vote_average}</span> /10`;
    }
}

// if the genres.genre_num doesn't exist, then just return unkown (like in the todo list project)

function genre_num_to_name(genre_num){
    
    return genres[genre_num] || "unknown";
}