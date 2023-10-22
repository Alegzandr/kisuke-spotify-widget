'use strict';

window.addEventListener('load', () => {
    const coverElement = document.querySelector('#cover');
    const artistElement = document.querySelector('#artist');
    const titleElement = document.querySelector('#title');

    const fetchNowPlaying = async () => {
        const id = window.location.pathname.split('/now-playing/').pop();
        const response = await fetch(`/api/now-playing/${id}`);
        const data = await response.json();

        coverElement.style.backgroundImage = `url(${data.item.album.images[0].url})`;
        artistElement.innerText = data.item.artists[0].name;
        titleElement.innerText = data.item.name;
    };

    fetchNowPlaying();
    setInterval(fetchNowPlaying, 5000);
});
