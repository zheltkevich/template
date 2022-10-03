import _ from 'lodash';
import './styles/css/index.css';
import './styles/scss/index.scss';
import Icon from './assets/images/example.png';
import printMe from './js/modules/modules.js';
import './js/utils/utils.js';
import json from './assets/docs/message.json5';

console.log(json);

function component() {
    // const element = document.createElement('div');
    const btn1 = document.createElement('button');
    const myIcon = new Image();
    
    btn1.innerHTML = _.join(['Click me', 'and check the console', 'supabutton'], ' ');
    btn1.classList.add('hello');
    btn1.onclick = printMe;
    myIcon.src = Icon;
    btn1.appendChild(myIcon);

    return btn1;
}

document.body.appendChild(component());