// Search Btn event handler
document.getElementById("search-btn").addEventListener("click", () => {
    getData();
});

//Search Box event handler
document.querySelector(".search-box").addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        getData();
    }
});

// API call and getting song data
const getData = () => {
    const songName = document.getElementById("song-name").value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("fancy-results").innerHTML = "";
            for (let i = 0; i < 10; i++) {
                const songTitle = data.data[i].title;
                const songAlbum = data.data[i].album.title;
                const songArtist = data.data[i].artist.name;
                const albumImg = data.data[i].album.cover_small;
                const artistImg = data.data[i].artist.picture_small;
                const artistBio = data.data[i].artist.link;
                const songLink = data.data[i].link;
                const playAudio = data.data[i].preview;

                searchResults(
                    songTitle,
                    songAlbum,
                    songArtist,
                    albumImg,
                    artistImg,
                    artistBio,
                    songLink,
                    playAudio
                );
            }
            console.log(data);
        });
};

// To show song name
const searchResults = (
    songTitle,
    songAlbum,
    songArtist,
    albumImg,
    artistImg,
    artistBio,
    songLink,
    playAudio
) => {
    document.getElementById(
        "fancy-results"
    ).innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name"><img src="${albumImg}"> ${songTitle}</h3>
                    <p class="author lead">Album by <span>${songAlbum}</span></p>
                    <h3>Artist: ${songArtist} <img src="${artistImg}"></h3>
                    <p>About Artist: <a href="${artistBio}" target="_blank">Read about Artist here</a></p>
                    <p>About Album: <a href="${songLink}" target="_blank">Find Album here</a></p>
                    <h3>Preview:</h3>
                    <audio src="${playAudio}" controls>Play audio</audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="getLyrics('${songTitle}', '${songArtist}')">Get Lyrics</button>
                </div>
                </div>`;
};

// To show Lyrics
const getLyrics = (songTitle, songArtist) => {
    const lyricTitle = document.getElementById("lyrics");
    lyricTitle.innerText = songTitle;
    fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.lyrics === undefined) {
                window.alert("Sorry, Lyrics for this song was not found");
            } else {
                document.getElementById("result-lyrics").innerText = data.lyrics;
            }
        });
};