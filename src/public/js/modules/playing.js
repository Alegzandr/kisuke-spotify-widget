import handleGradient from './gradient.js';

const coverBackgroundElement = document.querySelector('#cover-background');
const coverElement = document.querySelector('#cover');
const artistElement = document.querySelector('#artist');
const titleElement = document.querySelector('#title');

const fetchNowPlaying = async () => {
    const id = window.location.pathname.split('/now-playing/').pop();
    const response = await fetch(`/api/now-playing/${id}`);
    const data = await response.json();

    if (response.ok) {
        const recentOverlays =
            JSON.parse(localStorage.getItem('recentOverlays')) || [];

        if (!recentOverlays.includes(id)) {
            recentOverlays.push(id);
        }

        if (
            JSON.stringify(recentOverlays) !==
            JSON.stringify(localStorage.getItem('recentOverlays'))
        ) {
            localStorage.setItem(
                'recentOverlays',
                JSON.stringify(recentOverlays)
            );
        }
    }

    const coverURL = data.item.album.images[0].url;
    handleGradient(coverURL);
    coverElement.style.backgroundImage = `url(${coverURL})`;
    coverBackgroundElement.style.backgroundImage = `url(${coverURL})`;
    artistElement.innerText = data.item.artists[0].name;
    titleElement.innerText = data.item.name;
};

export default fetchNowPlaying;
