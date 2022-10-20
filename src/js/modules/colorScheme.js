const switcher = document.querySelector('#theme-switcher');
const doc = document.firstElementChild;
const setTheme = theme => doc.setAttribute('color-scheme', theme);

switcher.addEventListener('input', e => setTheme(e.target.value));

