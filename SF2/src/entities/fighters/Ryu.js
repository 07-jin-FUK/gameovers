import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
  constructor(x, y, velocity) {
    super("Ryu", x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
    this.frames = new Map([
      //前進の画像6枚
      ["forwards-1", [1677, 10, 66, 100]],
      ["forwards-2", [1681, 129, 65, 94]],
      ["forwards-3", [1605, 127, 72, 95]],
      ["forwards-4", [1525, 124, 72, 94]],
      ["forwards-5", [1450, 126, 72, 94]],
      ["forwards-6", [1380, 125, 67, 96]],
      //後退の画像6枚
      ["backwards-1", [905, 123, 69, 94]],
      ["backwards-2", [979, 119, 70, 99]],
      ["backwards-3", [1056, 122, 66, 96]],
      ["backwards-4", [1127, 118, 64, 100]],
      ["backwards-5", [1194, 120, 60, 96]],
      ["backwards-6", [1255, 118, 64, 99]],
    ]);
    this.animations = {
      walkForwards: [
        "forwards-1",
        "forwards-2",
        "forwards-3",
        "forwards-4",
        "forwards-5",
        "forwards-6",
      ],
      walkBackwards: [
        "backwards-1",
        "backwards-2",
        "backwards-3",
        "backwards-4",
        "backwards-5",
        "backwards-6",
      ],
    };
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
