// Search Btn function and For Loop
document.getElementById("search-btn").addEventListener("click", function() {
    const songName = document.getElementById("song-name").value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("fancy-results").innerHTML = "";
            for (let i = 0; i < 10; i++) {
                const songTitle = data.data[i].title;
                const songAlbum = data.data[i].album.title;
                const songArtist = data.data[i].artist.name;

                searchResults(songTitle, songAlbum, songArtist);
            }
        });
});

// Song Search Results Function

function searchResults(songTitle, songAlbum, songArtist) {
    document.getElementById(
        "fancy-results"
    ).innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${songTitle}</h3>
                    <p class="author lead">Album by <span>${songAlbum}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="getLyrics('${songTitle}', '${songArtist}')">Get Lyrics</button>
                </div>
                </div>`;
}

// Lyrics Result Function

function getLyrics(songTitle, songArtist) {
    const lyricTitle = document.getElementById("lyrics");
    lyricTitle.innerText = songTitle;
    fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("result-lyrics").innerText = data.lyrics;
        });
}