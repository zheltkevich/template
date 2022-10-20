const switcher = document.querySelector('#theme-switcher');
const meta = document.querySelector('meta[name="theme-color"]');
const doc = document.firstElementChild;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

if (prefersLightScheme.matches) meta.setAttribute('content', '#ffffff');
else if (prefersDarkScheme.matches) meta.setAttribute('content', '#000000');

const setTheme = theme => {
    if (theme === 'auto') {
        doc.removeAttribute('color-scheme');
        meta.setAttribute('content', 'transparent');

    } else {
        doc.setAttribute('color-scheme', theme);
        meta.setAttribute('content', theme);
    }

};

switcher.addEventListener('input', e => {
    setTheme(e.target.value);
});
