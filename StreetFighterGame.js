import { Ken } from './entities/fighters/Ken.js';
import { Ryu } from './entities/fighters/Ryu.js';
import { Stage } from './entities/stage.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { FighterDirection, FighterState } from './contants/fighters.js';

export class StreetFighterGame {
    constructor() {
        this.context = this.getContext();
        this.fighters = [
            new Ken(104, STAGE_FLOOR, FighterDirection.LEFT),
            new Ken(280, STAGE_FLOOR, FighterDirection.RIGHT),
        ];

        this.entities = [
            new Stage(),
            ...fighters,
            new FpsCounter(),
        ];

        this.frameTime = {
            previousTime: 0,
            secondsPassed: 0,
        };
    }

    getContext() {
        const canvasEl = document.querySelector('canvas');
        const context = canvasEl.getContext('2d');

        context.imageSmoothingEnabled = false;

        return context;
    }

    update() {
        for (const entity of entities) {
            entity.update(frameTime, context);
        }
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw(this.context);
        }
    }


    frame(time) {
        window.requestAnimationFrame(frame);

        frameTime = {
            secondsPassed: (time - previousTime) / 1000,
            previous: time,
        }

        this.update();
        this.draw();
    }

    handleFormSubmit(event, fighters) {
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

    start() {
        // this.document.addEventListener('submit', (event) => handleFormSubmit(event, fighters));
        this.document.addEventListener('submit', this.handleFormSubmit.bind(this));

        window.requestAnimationFrame(frame);
    }
}
