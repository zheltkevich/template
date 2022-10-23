// import _ from 'lodash';
import '@modules/modules.js';
import printMeUtils from '@utils/utils.js';
import '@css/index.css';
import '@scss/index.scss';
import json from '@docs/message.json5';

printMeUtils(json.title);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration); // eslint-disable-line no-console
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError); // eslint-disable-line no-console
            });
    });
}
