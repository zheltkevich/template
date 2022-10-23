const meta = document.querySelector('meta[name="theme-color"]');
const html = document.firstElementChild;
const labels = document.querySelectorAll('label');
const schemeSwitcher = document.querySelector('#scheme-switcher');
const prefersLightScheme = matchMedia('(prefers-color-scheme: light)');
const prefersDarkScheme = matchMedia('(prefers-color-scheme: dark)');


const colors = {
    light: 'hsl(200 25% 90%)',
    dark: 'hsl(200 10% 10%)',
    dim: 'hsl(200 10% 20%)',
};

const setTopCurtainColor = () => {
    const savedScheme = localStorage.getItem('color-scheme');

    if (savedScheme === 'auto') {
        if (prefersLightScheme.matches) meta.setAttribute('content', colors.light);
        else if (prefersDarkScheme.matches) meta.setAttribute('content', colors.dark);
    } else {
        meta.setAttribute('content', colors[savedScheme]);
    }
};

const setScheme = scheme => {
    localStorage.setItem('color-scheme', scheme);

    if (scheme !== 'auto') html.setAttribute('color-scheme', scheme);

    setTopCurtainColor();
};

const toggleLabelPickedClass = value => {
    labels.forEach(label => {
        if (label.attributes.for.value === value) label.classList.add('checked');
        else label.classList.remove('checked');
    });
};

const setupSwitcher = () => {
    const savedScheme = localStorage.getItem('color-scheme');
    const currentRadio = document.querySelector(`.scheme-switcher__input[value=${savedScheme}]`);

    currentRadio.checked = true;
    toggleLabelPickedClass(savedScheme);
};

const setupScheme = () => {
    let savedScheme = localStorage.getItem('color-scheme');

    if (savedScheme === null) {
        localStorage.setItem('color-scheme', 'auto');
        savedScheme = localStorage.getItem('color-scheme');
    }

    setScheme(savedScheme);
};

schemeSwitcher.addEventListener('input', event => {
    const { value } = event.target;

    toggleLabelPickedClass(value);
    setScheme(value);
});

const initColorScheme = () => {
    setupScheme();
    setupSwitcher();
};

export default initColorScheme;


