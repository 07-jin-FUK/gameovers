import { StreetFighterGame } from './entities/StreetFighterGame.js'
import { FighterState } from './contants/fighters.js';

// const GameViewport = {
//     WIDTH: 384,
//     HEIGHT: 224,
// };

function populateMoveDropdown() {
    const dropdown = document.getElementById('state-dropdown');

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);
    });
}

window.addEventListener('load', function () {
    populateMoveDropdown();

    new StreetFighterGame().start();
});