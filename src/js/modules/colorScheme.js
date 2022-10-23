const meta = document.querySelector('meta[name="theme-color"]');
const html = document.firstElementChild;
const schemeSwitcher = document.querySelector('#scheme-switcher');
const prefersLightScheme = matchMedia('(prefers-color-scheme: light)');
const prefersDarkScheme = matchMedia('(prefers-color-scheme: dark)');
const getSavedScheme = () => localStorage.getItem('color-scheme');

if (prefersLightScheme.matches) meta.setAttribute('content', 'hsl(200 25% 90%)');
else if (prefersDarkScheme.matches) meta.setAttribute('content', 'hsl(200 10% 10%)');

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
};

schemeSwitcher.addEventListener('input', event => {
    const { value } = event.target;

    setScheme(value);
});

const setupSwitcher = () => {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) {
        const currentRadio = document.querySelector(`.scheme-switcher__input[value=${savedScheme}]`);

        currentRadio.checked = true;
    }
};
const setupScheme = () => {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) setScheme(savedScheme);
};

const initColorScheme = () => {
    setupSwitcher();
    setupScheme();
};

export default initColorScheme;


