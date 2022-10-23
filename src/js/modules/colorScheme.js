const meta = document.querySelector('meta[name="theme-color"]');
const html = document.firstElementChild;
const schemeSwitcher = document.querySelector('#scheme-switcher');
const prefersLightScheme = matchMedia('(prefers-color-scheme: light)');
const prefersDarkScheme = matchMedia('(prefers-color-scheme: dark)');
const getSavedScheme = () => localStorage.getItem('color-scheme');

const colors = {
    light: 'hsl(200 25% 90%)',
    dark: 'hsl(200 10% 10%)',
    dim: 'hsl(200 10% 20%)',
};

const setTopCurtainColor = () => {
    const savedScheme = getSavedScheme();

    if (savedScheme === null) {
        if (prefersLightScheme.matches) meta.setAttribute('content', colors.light);
        else if (prefersDarkScheme.matches) meta.setAttribute('content', colors.dark);
    } else {
        meta.setAttribute('content', colors[savedScheme]);
    }
};
const clearScheme = () => {
    localStorage.removeItem('color-scheme');
    html.removeAttribute('color-scheme');
};
const setScheme = scheme => {
    if (scheme === 'auto') {
        clearScheme();
    } else {
        localStorage.setItem('color-scheme', scheme);
        html.setAttribute('color-scheme', scheme);
    }

    setTopCurtainColor();
};
const setupSwitcher = () => {
    const savedScheme = getSavedScheme();
    let currentRadio = null;

    if (savedScheme === null) currentRadio = document.querySelector('.scheme-switcher__input[value=auto]');
    else currentRadio = document.querySelector(`.scheme-switcher__input[value=${savedScheme}]`);

    currentRadio.checked = true;
};
const setupScheme = () => {
    const savedScheme = getSavedScheme();

    if (savedScheme === null) return;

    setScheme(savedScheme);
};

schemeSwitcher.addEventListener('input', event => {
    const { value } = event.target;

    setScheme(value);
});

const initColorScheme = () => {
    setupScheme();
    setupSwitcher();
    setTopCurtainColor();
};

export default initColorScheme;


