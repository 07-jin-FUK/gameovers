// Part 4

// handleMoveStateメソッドについて、要確認。this.stateに含まれているけど、ハンドルでは現状コメントアウト...

import { FighterDirection } from "../../constants/fighter.js";
import { FighterState } from "../../constants/fighter.js";

export class Fighter {
  constructor(name, x, y, direction) {
    this.name = name;
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    // this.velocity = 150 * direction;
    // this.velocity = 0;
    // this.velocity = velocity;
    this.initialVelocity = {};
    this.direction = direction;
    this.gravity = 0;

    this.frames = new Map();
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.animations = {};
    // this.state = 'walkForwards';
    // this.state = this.changeState();
    // this.currentState = this.changeState();

    this.image = new Image();

    this.states = {
      [FighterState.IDLE]: {
        init: this.handleIdleInit.bind(this),
        update: this.handleIdleState.bind(this),
        validForm: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.JUMP_UP,
          FighterState.JUMP_FORWARD,
          FighterState.JUMP_BACKWARD,
          FighterState.CROUCH_UP,
        ],
      },
      [FighterState.WALK_FORWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleMoveState.bind(this),
        validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD],
      },
      [FighterState.WALK_BACKWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleMoveState.bind(this),
        validForm: [FighterState.IDLE, FighterState.WALK_FORWARD],
      },
      [FighterState.JUMP_UP]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validForm: [FighterState.IDLE],
      },
      [FighterState.JUMP_FORWARD]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validForm: [FighterState.IDLE, FighterState.WALK_FORWARD],
      },
      [FighterState.JUMP_BACKWARD]: {
        init: this.handleJumpInit.bind(this),
        update: this.handleJumpState.bind(this),
        validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD],
      },
      [FighterState.CROUCH]: {
        init: () => {},
        update: () => {},
        validForm: [FighterState.CROUCH_DOWN],
      },
      [FighterState.CROUCH_DOWN]: {
        init: () => {},
        update: this.handCrouchDownState.bind(this),
        validForm: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD,
        ],
      },
      [FighterState.CROUCH_UP]: {
        init: () => {},
        update: this.handCrouchDownState.bind(this),
        validForm: [FighterState.CROUCH],
      },
    };

    this.changeState(FighterState.IDLE);
    // this.changeState(FighterState.WALK_FORWARD);
    // this.changeState(FighterState.WALK_BACKWARD);
  }

  changeState(newState) {
    // changeState = () => this.velocity * this.direction < 0 ? 'walkBackwards' : 'walkForwards';
    // changeState = () => this.velocity * this.direction < 0 ? FighterState.WALK_BACKWARD : FighterState.WALK_FORWARD;

    if (
      newState == this.currentState ||
      !this.states[newState].validForm.includes(this.currentState)
    )
      return;

    this.currentState = newState;
    this.animationFrame = 0;

    this.states[this.currentState].init();
  }

  // Backwardsは複数です...!
  handleIdleInit() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  // handleWalkIdleState() {

  // }

  handleMoveInit() {
    // this.velocity.x = 150 * this.direction;
    this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
  }

  // handleMoveState() {

  // }

  // handleWalkBackwardsInit() {
  //     this.velocity.y = 150 * this.direction;

  // }

  // handleWalkBackwardsState() {

  // }

  handleJumpInit() {
    this.velocity.y = this.initialVelocity.jump;
    this.handleMoveInit();
  }

  handleCrouchDownState() {
    if (this.animations[this.currentState][this.animationFrame][1] == -2) {
      this.changeState(FighterState.CROUCH);
    }
  }

  handleCrouchUpState() {
    if (this.animations[this.currentState][this.animationFrame][1] == -2) {
      this.changeState(FighterState.IDLE);
    }
  }

  handleJumpState(time) {
    this.velocity.y += this.gravity * time.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.changeState(FighterState.IDLE);
    }
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

  updateAnimation(time) {
    const animation = this.animation[this.currentState];
    const [, frameDelay] = animation[this.animationFrame];

    if (time.previous > this.animationTimer + frameDelay) {
      this.animationTimer = time.previous;

      if (frameDelay > 0) {
        this.animationFrame++;
      }

      // if (this.animationFrame > this.Animations[this.currentState].length) {
      if (this.animationFrame > animation.length) {
        this.animationFrame = 0;
      }
    }
  }

  update(time, context) {
    // const [[, , width]] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

    this.position.x += this.velocity.x * this.direction * time.secondsPassed;
    this.position.y += this.velocity.y * time.secondsPassed;

    // if (this.position.x > context.canvas.width - width || this.position.x < 0) {
    //     this.velocity = -this.velocity;
    // }

    this.states[this.currentState].update(time, context);
    this.updateAnimation(time);
    this.updateStageContraints(context);
  }

  drawDebug(context) {
    context.lineWidth = 1;

    context.beginPath();
    context.strokeStyle = "white";
    context.moveTo(
      Math.floor(this.position.x) - 4.5,
      Mathfloor(this.position.y)
    );
    context.lineTo(
      Math.floor(this.position.x) + 4.5,
      Mathfloor(this.position.y)
    );
    context.moveTo(
      Math.floor(this.position.x),
      Mathfoor(this.position.y) - 4.5
    );
    context.lineTo(
      Math.floor(this.position.x),
      Mathfoor(this.position.y) + 4.5
    );
    context.stroke();
  }

  draw(context) {
    const [frameKey] = this.animations[this.currentState][this.animationFrame];
    const [[x, y, width, height], [originX, originY]] =
      this.frames.get(frameKey);

    context.scale(this.direction, 1);
    context.drawImage(
      this.image,
      x,
      y,
      width,
      height,
      Math.floor(this.potision.x * this.direction) - originX,
      Math.floor(this.position.y) - originY,
      width,
      height
    );
    context.setTransform(1, 0, 0, 1, 0, 0);

    this.drawDebug(context);
  }
}
