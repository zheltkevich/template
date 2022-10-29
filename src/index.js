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

// eslint-disable-next-line init-declarations
let deferredPrompt;
const addBtn = document.querySelector('#install-button');

addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', event => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'flex';

    addBtn.addEventListener('click', _e => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        // eslint-disable-next-line max-nested-callbacks
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                // eslint-disable-next-line no-console
                console.log('User accepted the A2HS prompt');
            } else {
                // eslint-disable-next-line no-console
                console.log('User dismissed the A2HS prompt');
            }

            deferredPrompt = null;
        });
    });
});
