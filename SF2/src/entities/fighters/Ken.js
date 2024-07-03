import { FighterState } from "../../constants/fighters.js";
import { Fighter } from "./Fighter.js";

export class Ken extends Fighter {
  constructor(x, y, velocity) {
    super("Ken", x, y, velocity);

    this.image = document.querySelector('img[alt="ken"]');
    this.frames = new Map([
      //待機の画像4枚
      [
        "idle-1",
        [
          [879, 526, 56, 92],
          [30, 89],
        ],
      ],
      [
        "idle-2",
        [
          [813, 527, 57, 91],
          [31, 87],
        ],
      ],
      [
        "idle-3",
        [
          [745, 525, 60, 93],
          [34, 89],
        ],
      ],
      [
        "idle-4",
        [
          [680, 524, 60, 93],
          [36, 90],
        ],
      ],
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
      //上ジャンプ画像6枚
      [
        "jump-up-1",
        [
          [876, 1203, 59, 109],
          [36, 112],
        ],
      ],
      [
        "jump-up-2",
        [
          [813, 1208, 57, 99],
          [35, 108],
        ],
      ],
      [
        "jump-up-3",
        [
          [745, 1203, 59, 93],
          [35, 108],
        ],
      ],
      [
        "jump-up-4",
        [
          [680, 1204, 60, 93],
          [36, 106],
        ],
      ],
      [
        "jump-up-5",
        [
          [617, 1203, 58, 94],
          [35, 111],
        ],
      ],
      [
        "jump-up-6",
        [
          [552, 1205, 58, 106],
          [35, 116],
        ],
      ],
    ]);

    this.animations = {
      [FighterState.IDLE]: [
        ["idle-1", 68],
        ["idle-2", 68],
        ["idle-3", 68],
        ["idle-4", 68],
        ["idle-3", 68],
        ["idle-2", 68],
      ],
      [FighterState.WALK_FORWARD]: [
        ["forwards-1", 65],
        ["forwards-2", 65],
        ["forwards-3", 65],
        ["forwards-4", 65],
        ["forwards-5", 65],
        ["forwards-6", 65],
      ],
      [FighterState.WALK_BACKWARD]: [
        ["backwards-1", 65],
        ["backwards-2", 65],
        ["backwards-3", 65],
        ["backwards-4", 65],
        ["backwards-5", 65],
        ["backwards-6", 65],
      ],
      [FighterState.JUMP_UP]: [
        ["jump-up-1", 180],
        ["jump-up-2", 100],
        ["jump-up-3", 100],
        ["jump-up-4", 100],
        ["jump-up-5", 100],
        ["jump-up-6", -1],
      ],
    };
    this.initialVelocity = {
      jump: -420,
    };
    this.gravity = 1000;
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
