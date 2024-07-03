import { Ken } from "./entities/fighters/Ken.js";
import { Stage } from "./entities/Stage.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { FpsCounter } from "./entities/FpsCounter.js";
// const GameViewport = {
//     WIDTH: 384,
//     HEIGHT: 224,
// };

// function populateMoveDropdown() {
//     const dropdown = document.getElementById('state-dropdown');

//     Object.entries(FighterState).forEach(([, value]) => {
//         const option = document.createElement('option');
//         option.setAttribute('value', value);
//         option.innerText = value;
//         dropdown.appendChild(option);
//     });
// }

// window.addEventListener("load", function () {
//   new StreetFighterGame().start();
// });

const GameViewport = {
  WIDTH: 384,
  HEIGHT: 224,
};
window.onload = function () {
  const canvasEl = document.querySelector("canvas");
  const context = canvasEl.getContext("2d");

  canvasEl.width = GameViewport.WIDTH;
  canvasEl.height = GameViewport.HEIGHT;

  const entities = [
    new Stage(),
    new Ken(80, 110, 150),
    new Ryu(80, 110, -150),
    new FpsCounter(),
  ];

  let previousTime = 0;
  let secondsPassed = 0;

  function frame(time) {
    secondsPassed = (time - previousTime) / 1000;
    previousTime = time;

    for (const entity of entities) {
      entity.update(secondsPassed, context);
    }

    for (const entity of entities) {
      entity.draw(context);
    }
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
};
