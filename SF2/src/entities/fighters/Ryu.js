import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
  constructor(x, y, velocity) {
    super("Ryu", x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
  }
}

// const ryu = document.querySelector('img[alt="ryu"]');

// const position = {
//   x: 80,
//   y: 110,
// };
// let velocity = -4;

// export function updateRyu(context) {
//   position.x += velocity;

//   if (position.x > context.canvas.width - ryu.width || position.x < 0) {
//     velocity = -velocity;
//   }
// }
// export function drawRyu(context) {
//   context.drawImage(ryu, position.x, position.y);
// }
