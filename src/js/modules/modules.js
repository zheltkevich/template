import ColorScheme from '@modules/colorScheme.js';
import PWA from '@modules/pwa.js';

ColorScheme.init();
PWA.registerSW();
PWA.setupInstallButton();
