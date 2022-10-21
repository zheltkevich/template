const themeSwitcher = document.querySelector('#theme-switcher');
const meta = document.querySelector('meta[name="theme-color"]');
const doc = document.firstElementChild;
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersLightScheme.matches) meta.setAttribute('content', 'hsl(200 25% 90%)');
else if (prefersDarkScheme.matches) meta.setAttribute('content', 'hsl(200 10% 10%)');

const setTheme = theme => {
    if (theme === 'auto') {
        doc.removeAttribute('color-scheme');

    } else {
        doc.setAttribute('color-scheme', theme);
    }
};

themeSwitcher.addEventListener('input', event => {
    const { value } = event.target;

    setTheme(value);
});
