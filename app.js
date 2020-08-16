fetch("http://api.deezer.com/search?limit=10&q=summer") //for user specified data
    // fetch("https://api.lyrics.ovh/suggest/baby") //for whole data
    // fetch("https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime") //for lyrics only and it will be used for get lyrics button
    .then((response) => response.json())
    .then((data) => showData(data));

let showData = (data) => {
    console.log(data);
};