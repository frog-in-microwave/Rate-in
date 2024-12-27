let action_full = [];
let drama_full = [];
let comedy_full = [];
let horror_full = [];
let action_movies = [];
let drama_movies = [];
let comedy_movies = [];
let horror_movies = [];


if(window.location == "http://127.0.0.1:5500/movie_rating.html"){
    change_movie_info(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
    console.log(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
}
document.getElementById("submit_button").addEventListener("click" , (event) => {
    event.preventDefault();
    document.getElementById("image_container").innerHTML = ` `;
    fetch_it_up(document.getElementById("movie_name").value);
});




pick_movies("action");
pick_movies("drama");
pick_movies("comedy");
pick_movies("horror");


















async function fetch_it_up(movie_name) {
    let raw = await fetch(`https://api.tvmaze.com/search/shows?q=${movie_name}`);
    let movie_list = await raw.json();
    display_movies(movie_list , "image_container");
    console.log(movie_list);
}


async function fetch_one_up(movie_name) {
    let raw = await fetch(`https://api.tvmaze.com/search/shows?q=${movie_name}`);
    let movie_list = await raw.json();
    return movie_list[0];
}

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












// function suffle_genre_movies(genre){
//     if(genre == "action"){
//         action_movies = [];
//         pick_movies("action");
//         for(let i = 0; i < 20; i++){
            
//         }
//         action_full["page"] = 1;
//         console.log(action_full);
//         display_movies(action_movies , "action_image_container");
//     }
//     else if(genre == "drama"){
//         drama_movies = [];
//         for(let i = 0; i < 20; i++){
            
//         }
//         display_movies(drama_movies , "drama_image_container");
//     }
//     else if(genre == "comedy"){
//         comedy_movies = [];
//         for(let i = 0; i < 20; i++){
            
//         }
//         display_movies(comedy_movies , "comedy_image_container");
//     }
//     else if(genre == "horror"){
//         horror_movies = [];
//         for(let i = 0; i < 20; i++){
            
//         }
//         display_movies(horror_movies , "horror_image_container");
//     }
// }




function display_movie_stats(movie){
    localStorage.setItem("movie_to_display_ratings" , JSON.stringify(movie));
    window.location.href = "movie_rating.html";
}





function display_movies(movie_list , image_container_id){

    for(let movie of movie_list){
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="movie_overlay"></div>
        <img src = ${movie.show.image.medium}>
        `;
        div.className = "movie_div";
        
        document.getElementById(image_container_id).append(div);
        div.addEventListener("mouseover" , () => {
        div.querySelector("div").style.opacity = "0.7";
        div.querySelector("div").innerHTML = `${movie.show.name}`;
        });
        
        div.addEventListener("mouseout" , () => {
            div.querySelector("div").style.opacity = "0";
            div.querySelector("div").innerHTML = ``;
            });
            
            div.querySelector("div").addEventListener("click" , () => {
                display_movie_stats(movie);
            });
    }
}

function display_genre_movies(movie_list , image_container_id){
    console.log(movie_list);
    for(let i = 0; i < movie_list.results.length; i++){
        let div = document.createElement("div");
        console.log(movie_list.results[i].adult);
        if(movie_list.results[i].poster_path != null){
            
            div.innerHTML = `
            <div class="movie_overlay"></div>
            <img style="width: 210px; height: 295px; object-fit: cover;" src = "https://image.tmdb.org/t/p/w200/${movie_list.results[i].poster_path}" >
            `;
        }
        else{

            div.innerHTML = `
            <div class="movie_overlay"></div>
            <img style="width: 210px; height: 295px; object-fit: cover;" src = "images/poster_image_placeholder.png" >
            `;
        }
        div.className = "movie_div";
        
        document.getElementById(image_container_id).append(div);
        div.addEventListener("mouseover" , () => {
        div.querySelector("div").style.opacity = "0.7";
        div.querySelector("div").innerHTML = `${movie_list.results[i].title}`;
        });
        
        div.addEventListener("mouseout" , () => {
            div.querySelector("div").style.opacity = "0";
            div.querySelector("div").innerHTML = ``;
            });
            
            div.querySelector("div").addEventListener("click" , () => {
                display_movie_stats(fetch_one_up(movie_list.results[i].title));
            });
    }
}

function change_movie_info(movie){
    document.getElementById("rated_movie_name").textContent = movie.show.name;
    if(movie.show.image.original != null){
        document.getElementById("rated_movie_image").src = movie.show.image.original;
    }
    else{
        document.getElementById("rated_movie_image").src = movie.show.image.medium;
    }
    if(movie.show.language != null){
        document.getElementById("rated_movie_lang").textContent = "Language : " + movie.show.language;
    }
    if(movie.show.type != null){
        document.getElementById("rated_movie_type").textContent = "Type : " + movie.show.type;
    }
    if(movie.show.summary != null){
        document.getElementById("rated_movie_summery").innerHTML = "Summery : " + movie.show.summary;
    }
    if(movie.show.webChannel != null){
        document.getElementById("rated_movie_webchannel").textContent = "Web Channel : " + movie.show.webChannel.name;
    }
    if(movie.show.genres != null){
        document.getElementById("rated_movie_genres").textContent = "Genres : "
        for(let genre of movie.show.genres){
        document.getElementById("rated_movie_genres").textContent += genre + ", ";
        }
    }
}







