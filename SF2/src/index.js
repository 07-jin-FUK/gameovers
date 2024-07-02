import { Ken } from "./entities/fighters/Ken.js";
import { Stage } from "./entities/Stage.js";
import { Ryu } from "./entities/fighters/Ryu.js";
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

  const ken = new Ken(80, 110, 1);
  const ryu = new Ryu(80, 110, -1);
  const stage = new Stage();

  function frame() {
    ken.update(context);
    ryu.update(context);

    stage.draw(context);
    ken.draw(context);
    ryu.draw(context);

    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
};
