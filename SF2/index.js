// import { StreetFighterGame } from "./StreetFighterGame.js";

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
  SCALE: 4,
};
window.onload = function () {
  const canvasEl = document.querySelector("canvas");
  const context = canvasEl.getContext("2d");
  canvasEl.width = 384;
  canvasEl.height = 224;

  canvasEl.style.width = `${GameViewport.WIDTH * GameViewport.SCALE}px`;
  canvasEl.style.height = `${GameViewport.HEIGHT * GameViewport.SCALE}px`;
  console.log(context);
};
