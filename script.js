

if(window.location == "http://127.0.0.1:5500/movie_rating.html"){
    change_movie_info(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
    console.log(JSON.parse(localStorage.getItem("movie_to_display_ratings")));
}
document.getElementById("submit_button").addEventListener("click" , (event) => {

    document.getElementById("image_container").innerHTML = ` `;
    fetch_it_up(document.getElementById("movie_name").value);
})




async function fetch_it_up(movie_name) {
    let raw = await fetch(`https://api.tvmaze.com/search/shows?q=${movie_name}`);
    let movie_list = await raw.json();
    display_movies(movie_list);
}





function display_movie_stats(movie){
    localStorage.setItem("movie_to_display_ratings" , JSON.stringify(movie));
    window.location.href = "movie_rating.html";
}





function display_movies(movie_list){
    for(let movie of movie_list){
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="movie_overlay"></div>
        <img src = ${movie.show.image.medium}>
        `;
        div.className = "movie_div";
        
        document.getElementById("image_container").append(div);
        div.addEventListener("mouseover" , () => {
        div.querySelector("div").style.opacity = "0.7";
        div.querySelector("div").innerHTML = `${movie.show.name}`;
        console.log("frog");
        });
        
        div.addEventListener("mouseout" , () => {
            div.querySelector("div").style.opacity = "0";
            div.querySelector("div").innerHTML = ``;
            console.log(movie);
            });
            
            div.querySelector("div").addEventListener("click" , () => {
                display_movie_stats(movie);
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







