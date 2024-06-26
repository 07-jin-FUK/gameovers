// Part 4

import { FighterDirection } from '../../constants/fighter.js';

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.direction = direction;
        // this.velocity = 150 * direction;
        this.velocity = 0;
        // this.velocity = velocity;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        // this.state = 'walkForwords';
        // this.state = this.changeState();
        // this.currentState = this.changeState();

        this.states = {
            [FighterState.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleWalkBackwardsInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
            },
        }

        this.changeState(FighterState.WALK_FORWARD);
        // this.changeState(FighterState.WALK_BACKWARD);
    }


    changeState(newState) {
        // changeState = () => this.velocity * this.direction < 0 ? 'walkBackwards' : 'walkForwards';
        // changeState = () => this.velocity * this.direction < 0 ? FighterState.WALK_BACKWARD : FighterState.WALK_FORWARD;

        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }


    // Backwardsは複数です...!
    handleWalkForwardInit() {
        this.velocity = -150 * this.direction;
    }

    handleWalkForwardState() {

    }

    handleWalkBackwardsInit() {
        this.velocity = 150 * this.direction;

    }

    handleWalkBackwardsState() {

    }

    updateStageContraints(context) {
        const WIDTH = 32;

        if (this.position.x > context.canvas.width - WIDTH) {
            // this.currentState = this.changeState();
            // this.state = 'walkBackwards';
            this.position.x = context.canvas.width - WIDTH;
        }

        if (this.position.x < WIDTH) {
            // this.currentState = this.changeState();
            // this.state = 'walkForwards';
            this.position.x = WIDTH;
        }
    }



    // 要確認
    update(secondsPassed, context) {
        // const [[, , width]] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        if (timeRanges.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;
            this.animationFrame++;
            if (this.animationFrame > 5) this.animationFrame = 0;
        }

        this.position.x += this.velocity * secondsPassed;

        // if (this.position.x > context.canvas.width - width || this.position.x < 0) {
        //     this.velocity = -this.velocity;
        // }

        this.states[this.currentState].update(time, context);
        this.updateStageContraints(context);
    }

    drawDebug(context) {
        context.lineWidth = 1;

        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(Math.floor(this.position.x) - 4.5, Mathfloor(this.position.y));
        context.lineTo(Math.floor(this.position.x) + 4.5, Mathfloor(this.position.y));
        context.moveTo(Math.floor(this.position.x), Mathfoor(this.position.y) - 4.5);
        context.lineTo(Math.floor(this.position.x), Mathfoor(this.position.y) + 4.5);
        context.stroke();
    }

    draw(context) {
        const [
            [x, y, width, height],
            [originX, originY],
        ] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor(this.potision.x * this.direction) - originX, Math.floor(this.position.y) - originY,
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0);

        this.drawDebug(context);
    }
}