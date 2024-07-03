import { FighterState } from "../../constants/fighters.js";
import { STAGE_FLOOR } from "../../constants/stage.js";

export class Fighter {
  constructor(name, x, y, direction) {
    this.name = name;
    this.image = new Image();
    this.frames = new Map();
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.initialVelocity = {};
    this.direction = direction;
    this.gravity = 0;

    this.animationFrame = 0;
    this.animationTimer = 0;
    this.animations = {};

    this.states = {
      [FighterState.IDLE]: {
        init: this.handleWalkIdleInit.bind(this),
        update: this.handleWalkIdleState.bind(this),
      },
      [FighterState.WALK_FORWARD]: {
        init: this.handleWalkForwardInit.bind(this),
        update: this.handleWalkForwardState.bind(this),
      },
      [FighterState.WALK_BACKWARD]: {
        init: this.handleWalkBackwardInit.bind(this),
        update: this.handleWalkBackwardState.bind(this),
      },
      [FighterState.JUMP_UP]: {
        init: this.handleWalkJumpUpInit.bind(this),
        update: this.handleWalkJumpUpState.bind(this),
      },
    };
    this.changeState(FighterState.IDLE);
  }

  changeState(newState) {
    this.currentState = newState;
    this.animationFrame = 0;

    this.states[this.currentState].init();
  }

  handleWalkIdleInit() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  handleWalkIdleState() {}

  handleWalkForwardInit() {
    this.velocity.x = 150 * this.direction;
  }

  handleWalkForwardState() {}

  handleWalkBackwardInit() {
    this.velocity.x = -150 * this.direction;
  }

  handleWalkBackwardState() {}

  handleWalkJumpUpInit() {
    this.velocity.y = this.initialVelocity.jump;
  }

  handleWalkJumpUpState(time) {
    this.velocity.y += this.gravity * time.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.changeState(FighterState.IDLE);
    }
  }

  updateStageContraints(context) {
    const WIDTH = 32;

    if (this.position.x > context.canvas.width - WIDTH) {
      this.position.x = context.canvas.width - WIDTH;
    }

    if (this.position.x < WIDTH) {
      this.position.x = WIDTH;
    }
  }

  updateAnimation(time) {
    if (time.previous > this.animationTimer + 60) {
      this.animationTimer = time.previous;

      this.animationFrame++;
      if (this.animationFrame >= this.animations[this.currentState].length)
        this.animationFrame = 0;
    }
  }

  update(time, context) {
    this.position.x += this.velocity.x * time.secondsPassed;
    this.position.y += this.velocity.y * time.secondsPassed;

    this.states[this.currentState].update(time, context);
    this.updateAnimation(time);
    this.updateStageContraints(context);
  }

  drawDebug(context) {
    context.lineWidth = 1;

    context.beginPath();
    context.strokeStyle = "white";
    context.moveTo(this.position.x - 5, this.position.y);
    context.lineTo(this.position.x + 4, this.position.y);
    context.moveTo(this.position.x, this.position.y - 5);
    context.lineTo(this.position.x, this.position.y + 4);
    context.stroke();
  }

  draw(context) {
    const [[x, y, width, height], [originX, originY]] = this.frames.get(
      this.animations[this.currentState][this.animationFrame]
    );
    context.scale(this.direction, 1);
    context.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      Math.floor(this.position.x * this.direction) - originX,
      Math.floor(this.position.y) - originY,
      width,
      height
    );
    context.setTransform(1, 0, 0, 1, 0, 0);

    this.drawDebug(context);
  }
}
