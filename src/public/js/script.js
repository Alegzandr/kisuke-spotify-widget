'use strict';

window.addEventListener('load', () => {
    const coverElement = document.querySelector('#cover');
    const artistElement = document.querySelector('#artist');
    const titleElement = document.querySelector('#title');

    const fetchNowPlaying = async () => {
        const id = window.location.pathname.split('/').pop();
        const response = await fetch(`/api/now-playing/${id}`);
        const data = await response.json();

        coverElement.styles.backgroundImage = `url(${data.cover})`;
        artistElement.innerText = data.artist;
        titleElement.innerText = data.title;
    };

    setInterval(fetchNowPlaying, 5000);
});
