import { drawKen, updateKen } from "./ken.js";
import { drawBackground } from "./stage.js";
import { drawRyu, updateRyu } from "./ryu.js";
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

  function frame() {
    updateKen(context);
    updateRyu(context);
    
    drawBackground(context);
    drawKen(context);
    drawRyu(context);

    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
};
