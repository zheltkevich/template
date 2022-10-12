import _ from 'lodash';
import Icon from '@images/example.png';
import printMe from '@modules/modules.js';
import '@css/index.css';
import '@scss/index.scss';
import '@utils/utils.js';
import json from '@docs/message.json5';

// eslint-disable-next-line no-console
console.log('JSON conected: ', json);

const component = () => {
    const btn1 = document.createElement('button');
    const myIcon = new Image();

    btn1.innerHTML = _.join(['Click me', 'and check the console', 'supabutton'], ' ');
    btn1.classList.add('hello');
    btn1.onclick = printMe;
    myIcon.src = Icon;
    btn1.appendChild(myIcon);

    return btn1;
};

document.body.appendChild(component());

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            // eslint-disable-next-line no-console
            console.log('SW registered: ', registration);
        })
            .catch(registrationError => {
                // eslint-disable-next-line no-console
                console.log('SW registration failed: ', registrationError);
            });
    });
}
