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
};
window.onload = function () {
  const canvasEl = document.querySelector("canvas");
  const context = canvasEl.getContext("2d");
  canvasEl.width = GameViewport.WIDTH;
  canvasEl.height = GameViewport.HEIGHT;

  const [ken, background] = document.querySelectorAll("img");

  const position = {
    x: 0,
    y: 0,
  };
  let velocity = 4;

  function frame() {
    position.x += velocity;
    if (position.x > GameViewport.WIDTH - ken.width || position.x < 0) {
      velocity = -velocity;
    }

    // context.clearRect(0, 0, GameViewport.WIDTH, GameViewport.HEIGHT);
    context.drawImage(background, 0, 0);

    context.strokeStyle = "yellow";
    context.moveTo(0, 0);
    context.lineTo(GameViewport.WIDTH, GameViewport.HEIGHT);
    context.stroke();

    context.drawImage(ken, position.x, position.y);

    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
  // console.log(context);
};
