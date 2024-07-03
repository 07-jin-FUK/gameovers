import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
  constructor(x, y, velocity) {
    super("Ryu", x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
    this.frames = new Map([
      //前進の画像6枚
      ["forwards-1", [10, 132, 60, 90]],
      ["forwards-2", [75, 125, 68, 101]],
      ["forwards-3", [149, 124, 70, 99]],
      ["forwards-4", [225, 125, 70, 100]],
      ["forwards-5", [299, 124, 63, 99]],
      ["forwards-6", [363, 122, 62, 102]],
      //後退の画像6枚
      ["backwards-1", [772, 123, 74, 96]],
      ["backwards-2", [703, 121, 65, 99]],
      ["backwards-3", [626, 121, 68, 99]],
      ["backwards-4", [556, 119, 67, 104]],
      ["backwards-5", [492, 116, 64, 102]],
      ["backwards-6", [427, 120, 65, 102]],
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
