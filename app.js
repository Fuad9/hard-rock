const proxy = "https://cors-anywhere.herokuapp.com/";
//set api
const api = {
    // url: "http://api.deezer.com/search", //for user specified data
    // url: "http://api.deezer.com/search?limit=15&q=coldplay&index=15"
    url: "https://api.lyrics.ovh/suggest/", //for whole data
    lyricsUrl: "https://api.lyrics.ovh/v1/", //for lyrics only and it will be used for getting lyrics button
};

// WHOLE DATA AREA
// Search Button event handler
document.querySelector(".search-btn").addEventListener("click", () => {
    const songName = document.querySelector(".title").value;
    // const artistName = document.querySelector(".artist").value;
    getApiData(songName);
});

// Get API Data
let getApiData = (title) => {
    fetch(`${api.url}${title}`)
        .then((response) => response.json())
        .then((json) => showData(json));
};

// to Show whole Data
let showData = (data) => {
    console.log(data);

    document.querySelector(".songName").innerHTML = data.data[0].album.title;
    document.querySelector(".artistName").innerHTML = data.data[0].artist.name;
};

// LYRICS AREA
// Lyrics Button event handler
document.querySelector(".lyrics-btn").addEventListener("click", () => {
    const songName = document.querySelector(".songName").innerText;
    const artistName = document.querySelector(".artistName").innerText;
    getLyricsData(artistName, songName);
});

// Get Lyrics Data
let getLyricsData = (artist, title) => {
    fetch(`${api.lyricsUrl}${artist}/${title}`)
        .then((response) => response.json())
        .then((json) => showLyrics(json));
};

// to show lyrics
let showLyrics = (data) => {
    console.log(data);
    document.querySelector(".lyric").innerHTML = data.lyrics;
};