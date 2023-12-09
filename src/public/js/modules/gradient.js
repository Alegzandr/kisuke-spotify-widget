import ColorThief from '../vendor/color-thief-2.4.0/color-thief.mjs';

const coverElement = document.querySelector('main');

const setGradient = (primaryColor, secondaryColor) => {
    const gradientStyle = `linear-gradient(to top, ${primaryColor}, ${secondaryColor})`;
    coverElement.style.background = gradientStyle;
};

const handleGradient = (coverURL) => {
    const colorThief = new ColorThief();
    const temporaryImage = new Image();
    temporaryImage.crossOrigin = 'Anonymous';

    temporaryImage.onload = () => {
        const colors = colorThief.getPalette(temporaryImage, 3);

        const primaryColor = `#${colors[1]
            .map((c) => c.toString(16).padStart(2, '0'))
            .join('')}`;

        const secondaryColor = `#${colors[2]
            .map((c) => c.toString(16).padStart(2, '0'))
            .join('')}`;

        setGradient(primaryColor, secondaryColor);
    };

    temporaryImage.src = coverURL;
};

export default handleGradient;
