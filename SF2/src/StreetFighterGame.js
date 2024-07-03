import { Ken } from "./entities/fighters/Ken.js";
import { Stage } from "./entities/Stage.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighters.js";

export class StreetFighterGame {
  constructor() {
    this.context = this.getContext();
    this.fighters = [
      new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
      new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
    ];

    this.entities = [new Stage(), ...this.fighters, new FpsCounter()];

    this.frameTime = {
      previous: 0,
      secondsPassed: 0,
    };
  }

  getContext() {
    const GameViewport = {
      WIDTH: 384,
      HEIGHT: 224,
    };
    const canvasEl = document.querySelector("canvas");
    const context = canvasEl.getContext("2d");

    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;

    return context;
  }

  update() {
    for (const entity of this.entities) {
      entity.update(this.frameTime, this.context);
    }
  }
  draw() {
    for (const entity of this.entities) {
      entity.draw(this.context);
    }
  }

  frame(time) {
    window.requestAnimationFrame(this.frame.bind(this));
    this.frameTime = {
      secondsPassed: (time - this.frameTime.previous) / 1000,
      previous: time,
    };
    this.update();
    this.draw();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const selectedCheckboxes = Array.from(
      event.target.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.value);

    const options = event.target.querySelector("select");

    this.fighters.forEach((fighter) => {
      if (selectedCheckboxes.includes(fighter.name)) {
        fighter.changeState(options.value);
      }
    });
  }

  start() {
    document.addEventListener("submit", this.handleFormSubmit.bind(this));

    window.requestAnimationFrame(this.frame.bind(this));
  }
}
