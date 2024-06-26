import { Ken } from './entities/fighters/Ken.js';
import { Ryu } from './entities/fighters/Ryu.js';
import { Stage } from './entities/stage.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { FighterDirection, FighterState } from './contants/fighters.js';

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

function handleFormSubmit(event, fighters) {
    event.preventDefault();

    const selectedCheckboxes = Array
        .from(event.target.querySelectorAll('input:checked'))
        .map(checkbox => checkbox.value);

    const options = event.target.querySelector('select');

    fighters.forEach(fighter => {
        if (selectedCheckboxes.includes(fighter.name)) {
            fighter.changeState(options.value);
        }
    });
}


window.addEventListener('load', function () {
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');

    // canvasEl.width = GameViewport.WIDTH;
    // canvasEl.height = GameViewport.HEIGHT;

    const entities = [
        new Stage(),
        // new Ken(80, STAGE_FLOOR, 150),
        new Ken(104, STAGE_FLOOR, FighterDirection.LEFT),
        // new Ryu(80, STAGE_FLOOR, -150),
        new Ken(280, STAGE_FLOOR, FighterDirection.RIGHT),
        new FpsCounter(),
    ];

    let frameTime = {
        previousTime = 0,
        secondsPassed = 0,
    };

    function frame(time) {
        window.requestAnimationFrame(frame);

        frameTime = {
            secondsPassed = (time - previousTime) / 1000,
            previous: time,
        }

        ken.update(secondsPassed, context);
        ryu.update(secondsPassed, context);

        stage.draw(context);
        ken.draw(context);
        ryu.draw(context);

        window.requestAnimationFrame(frame);
    }
};