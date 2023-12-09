'use strict';

window.addEventListener('load', () => {
    const recentOverlays =
        JSON.parse(localStorage.getItem('recentOverlays')) || [];
    const recentOverlaysElement = document.querySelector('#overlays');
    const recentOverlaysListElement = document.querySelector('#overlays-list');
    const loginButtonElement = document.querySelector('#login');
    const clearButtonElement = document.querySelector('#clear');

    const clearList = (event) => {
        event.preventDefault();

        localStorage.removeItem('recentOverlays');
        location.reload();
    };

    clearButtonElement.addEventListener('click', clearList);

    if (recentOverlays.length > 0) {
        loginButtonElement.innerText = 'Se reconnecter avec Spotify';
        recentOverlaysElement.style.display = 'block';

        recentOverlays.reverse();

        recentOverlays.forEach((overlayId) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/now-playing/${overlayId}`;
            a.innerText = overlayId;
            li.appendChild(a);
            recentOverlaysListElement.appendChild(li);
        });
    }
});
