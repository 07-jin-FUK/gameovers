import { FighterState } from "../../constants/fighters.js";
import { Fighter } from "./Fighter.js";

export class Ken extends Fighter {
  constructor(x, y, velocity) {
    super("Ken", x, y, velocity);

    this.image = document.querySelector('img[alt="ken"]');
    this.frames = new Map([
      //前進の画像6枚
      [
        "forwards-1",
        [
          [875, 523, 60, 95],
          [30, 93],
        ],
      ],
      [
        "forwards-2",
        [
          [874, 895, 61, 95],
          [31, 93],
        ],
      ],
      [
        "forwards-3",
        [
          [793, 895, 76, 95],
          [35, 92],
        ],
      ],
      [
        "forwards-4",
        [
          [712, 895, 76, 95],
          [34, 93],
        ],
      ],
      [
        "forwards-5",
        [
          [631, 895, 76, 95],
          [35, 93],
        ],
      ],
      [
        "forwards-6",
        [
          [566, 895, 62, 95],
          [35, 93],
        ],
      ],
      //後退の画像6枚
      [
        "backwards-1",
        [
          [873, 993, 56, 94],
          [30, 92],
        ],
      ],
      [
        "backwards-2",
        [
          [809, 993, 56, 95],
          [31, 93],
        ],
      ],
      [
        "backwards-3",
        [
          [743, 992, 56, 95],
          [30, 93],
        ],
      ],
      [
        "backwards-4",
        [
          [676, 995, 56, 92],
          [31, 90],
        ],
      ],
      [
        "backwards-5",
        [
          [597, 993, 56, 95],
          [31, 93],
        ],
      ],
      [
        "backwards-6",
        [
          [532, 993, 56, 94],
          [31, 92],
        ],
      ],
    ]);

    this.animations = {
      [FighterState.WALK_FORWARD]: [
        "forwards-1",
        "forwards-2",
        "forwards-3",
        "forwards-4",
        "forwards-5",
        "forwards-6",
      ],
      [FighterState.WALK_BACKWARD]: [
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
