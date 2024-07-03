import { Fighter } from "./Fighter.js";

export class Ken extends Fighter {
  constructor(x, y, velocity) {
    super("Ken", x, y, velocity);

    this.image = document.querySelector('img[alt="ken"]');
    this.frames = new Map([
      //前進の画像6枚
      ["forwards-1", [875, 523, 61, 95]],
      ["forwards-2", [874, 895, 62, 95]],
      ["forwards-3", [793, 895, 77, 95]],
      ["forwards-4", [712, 895, 77, 95]],
      ["forwards-5", [631, 895, 77, 95]],
      ["forwards-6", [566, 895, 62, 95]],
      //後退の画像6枚
      ["backwards-1", [874, 993, 61, 94]],
      ["backwards-2", [809, 993, 61, 95]],
      ["backwards-3", [743, 992, 63, 95]],
      ["backwards-4", [676, 995, 62, 92]],
      ["backwards-5", [597, 993, 62, 95]],
      ["backwards-6", [532, 993, 62, 94]],
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
