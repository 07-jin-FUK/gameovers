import { Fighter } from "./Fighter.js";

export class Ken extends Fighter {
  constructor(x, y, velocity) {
    super("Ken", x, y, velocity);

    this.image = document.querySelector('img[alt="ken"]');
    this.frames = new Map([
      ["forwards-1", [875, 523, 61, 95]],
      ["forwards-2", [873, 895, 63, 95]],
      ["forwards-3", [792, 895, 78, 95]],
      ["forwards-4", [711, 895, 78, 95]],
      ["forwards-5", [630, 895, 78, 95]],
      ["forwards-6", [565, 895, 63, 95]],
    ]);
  }
}

// const position = {
//   x: 80,
//   y: 110,
// };
// let velocity = 4;

// export function updateKen(context) {
//   position.x += velocity;

//   if (position.x > context.canvas.width - ken.width || position.x < 0) {
//     velocity = -velocity;
//   }
// }
// export function drawKen(context) {
//   context.drawImage(ken, position.x, position.y);
// }
