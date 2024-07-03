import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
  constructor(x, y, velocity) {
    super("Ryu", x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
    this.frames = new Map([
      ["forwards-1", [1677, 10, 66, 100]],
      ["forwards-2", [1681, 129, 65, 94]],
      ["forwards-3", [1605, 127, 72, 95]],
      ["forwards-4", [1525, 124, 72, 94]],
      ["forwards-5", [1450, 126, 72, 94]],
      ["forwards-6", [1380, 125, 67, 96]],
    ]);
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
