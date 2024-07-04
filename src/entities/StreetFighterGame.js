import { Ken } from "./entities/fighters/Ken.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { Stage } from "./entities/stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./contants/fighters.js";

export class StreetFighterGame {
  constructor() {
    this.context = this.getContext();
    this.fighters = [
      new Ryu(104, STAGE_FLOOR, FighterDirection.LEFT),
      new Ken(280, STAGE_FLOOR, FighterDirection.RIGHT),
    ];

    this.entities = [new Stage(), ...fighters, new FpsCounter()];

    this.frameTime = {
      previousTime: 0,
      secondsPassed: 0,
    };
    this.bgm = document.getElementById("bgm");
  }

  getContext() {
    const canvasEl = document.querySelector("canvas");
    const context = canvasEl.getContext("2d");

    context.imageSmoothingEnabled = false;

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

    fighters.forEach((fighter) => {
      if (selectedCheckboxes.includes(fighter.name)) {
        fighter.changeState(options.value);
      }
    });
  }

  start() {
    // this.document.addEventListener('submit', (event) => handleFormSubmit(event, fighters));
    document.addEventListener("submit", this.handleFormSubmit.bind(this));

    this.bgm.play();

    window.requestAnimationFrame(this.frame.bind(this));
  }
}
