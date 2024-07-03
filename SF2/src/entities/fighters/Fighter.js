import * as control from "../../InputHandler.js";
import { FighterDirection, FighterState } from "../../constants/fighters.js";
import { STAGE_FLOOR } from "../../constants/stage.js";

export class Fighter {
  constructor(name, x, y, direction, playerId) {
    this.name = name;
    this.playerId = playerId;
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

    this.opponent;

    this.states = {
      [FighterState.IDLE]: {
        init: this.handleIdleInit.bind(this),
        update: this.handleIdleState.bind(this),
        validForm: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD,
          FighterState.JUMP_UP,
          FighterState.JUMP_FORWARD,
          FighterState.JUMP_BACKWARD,
          FighterState.CROUCH_UP,
        ],
      },
      [FighterState.WALK_FORWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleWalkForwardState.bind(this),
        validForm: [FighterState.IDLE, FighterState.JUMP_BACKWARD],
      },
      [FighterState.WALK_BACKWARD]: {
        init: this.handleMoveInit.bind(this),
        update: this.handleWalkBackwardsState.bind(this),
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
        update: this.handleCrouchState.bind(this),
        validForm: [FighterState.CROUCH_DOWN],
      },

      [FighterState.CROUCH_DOWN]: {
        init: this.handleCrouchDownInit.bind(this),
        update: this.handleCrouchDownState.bind(this),
        validForm: [
          FighterState.IDLE,
          FighterState.WALK_FORWARD,
          FighterState.WALK_BACKWARD,
        ],
      },
      [FighterState.CROUCH_UP]: {
        init: () => {},
        update: this.handleCrouchUpState.bind(this),
        validForm: [FighterState.CROUCH],
      },
    };
    this.currentState = FighterState.IDLE;
    this.changeState(FighterState.IDLE);
  }

  //キャラクターが常に向かい合うように、振り向かせる関数
  getDirection = () =>
    this.position.x >= this.opponent.position.x
      ? FighterDirection.LEFT
      : FighterDirection.RIGHT;

  changeState(newState) {
    //同じ状態は２回入力できないように設定
    if (
      newState === this.currentState ||
      !this.states[newState].validForm.includes(this.currentState)
    ) {
      return;
    }
    this.currentState = newState;
    this.animationFrame = 0;
    this.states[this.currentState].init();
  }

  handleIdleInit() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  handleMoveInit() {
    // "??"=>左側の値がnull,undefinedの場合、右の値を返す。
    this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
  }

  handleJumpInit() {
    this.velocity.y = this.initialVelocity.jump;
    this.handleMoveInit();
  }

  handleCrouchDownInit() {
    this.handleIdleInit();
  }

  handleIdleState() {
    if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_UP);
    if (control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_DOWN);
    }
    if (control.isBackward(this.playerId, this.direction))
      this.changeState(FighterState.WALK_BACKWARD);
    if (control.isForward(this.playerId, this.direction))
      this.changeState(FighterState.WALK_FORWARD);
  }
  handleWalkForwardState() {
    if (!control.isForward(this.playerId, this.direction))
      this.changeState(FighterState.IDLE);
    if (control.isUp(this.playerId))
      this.changeState(FighterState.JUMP_FORWARD);
    if (control.isDown(this.playerId))
      this.changeState(FighterState.CROUCH_DOWN);
  }
  handleWalkBackwardsState() {
    if (!control.isBackward(this.playerId, this.direction))
      this.changeState(FighterState.IDLE);
    if (control.isUp(this.playerId))
      this.changeState(FighterState.JUMP_BACKWARD);
    if (control.isDown(this.playerId))
      this.changeState(FighterState.CROUCH_DOWN);
  }

  handleJumpState(time) {
    this.velocity.y += this.gravity * time.secondsPassed;

    if (this.position.y > STAGE_FLOOR) {
      this.position.y = STAGE_FLOOR;
      this.changeState(FighterState.IDLE);
    }
  }
  w;

  handleCrouchState() {
    if (!control.isDown(this.playerId)) {
      this.changeState(FighterState.CROUCH_UP);
    }
  }

  handleCrouchDownState() {
    if (this.animations[this.currentState][this.animationFrame][1] === -2) {
      this.changeState(FighterState.CROUCH);
    }
  }

  handleCrouchUpState() {
    if (this.animations[this.currentState][this.animationFrame][1] === -2) {
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
    const animation = this.animations[this.currentState];
    const [, frameDelay] = animation[this.animationFrame];

    if (time.previous > this.animationTimer + frameDelay) {
      this.animationTimer = time.previous;

      if (frameDelay > 0) {
        this.animationFrame++;
      }

      if (this.animationFrame >= animation.length) {
        this.animationFrame = 0;
      }
    }
  }

  update(time, context) {
    this.position.x += this.velocity.x * this.direction * time.secondsPassed;
    this.position.y += this.velocity.y * time.secondsPassed;

    this.direction = this.getDirection();

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
    const [frameKey] = this.animations[this.currentState][this.animationFrame];
    //ここから追加
    const frame = this.frames.get(frameKey);

    if (!frame) {
      console.error(`Frame not found for key: ${frameKey}`);
      return;
    }
    //ここまで
    const [[x, y, width, height], [originX, originY]] = frame;

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
