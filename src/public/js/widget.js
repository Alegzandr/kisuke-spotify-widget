'use strict';

import fetchNowPlaying from './modules/playing.js';

window.addEventListener('load', () => {
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 5000);
});
