import { FighterState } from "../../constants/fighters.js";
import { Fighter } from "./Fighter.js";

export class Ryu extends Fighter {
  constructor(x, y, velocity) {
    super("Ryu", x, y, velocity);

    this.image = document.querySelector('img[alt="ryu"]');
    this.frames = new Map([
      //待機の画像4枚
      [
        "idle-1",
        [
          [5, 12, 63, 93],
          [35, 90],
        ],
      ],
      [
        "idle-2",
        [
          [70, 11, 67, 93],
          [38, 90],
        ],
      ],
      [
        "idle-3",
        [
          [137, 11, 66, 93],
          [38, 90],
        ],
      ],
      [
        "idle-4",
        [
          [210, 11, 60, 93],
          [36, 89],
        ],
      ],
      //前進の画像6枚
      [
        "forwards-1",
        [
          [10, 132, 60, 90],
          [34, 88],
        ],
      ],
      [
        "forwards-2",
        [
          [75, 125, 68, 101],
          [38, 98],
        ],
      ],
      [
        "forwards-3",
        [
          [149, 124, 70, 99],
          [38, 96],
        ],
      ],
      [
        "forwards-4",
        [
          [225, 125, 70, 100],
          [38, 97],
        ],
      ],
      [
        "forwards-5",
        [
          [299, 124, 63, 99],
          [35, 96],
        ],
      ],
      [
        "forwards-6",
        [
          [363, 122, 62, 102],
          [34, 98],
        ],
      ],
      //後退の画像6枚
      [
        "backwards-1",
        [
          [772, 123, 74, 96],
          [39, 93],
        ],
      ],
      [
        "backwards-2",
        [
          [703, 121, 65, 99],
          [37, 97],
        ],
      ],
      [
        "backwards-3",
        [
          [626, 121, 68, 99],
          [38, 97],
        ],
      ],
      [
        "backwards-4",
        [
          [556, 119, 67, 104],
          [38, 101],
        ],
      ],
      [
        "backwards-5",
        [
          [492, 116, 64, 102],
          [36, 100],
        ],
      ],
      [
        "backwards-6",
        [
          [427, 120, 65, 102],
          [37, 100],
        ],
      ],
      //上ジャンプ画像6枚
      [
        "jump-up-1",
        [
          [63, 240, 65, 113],
          [39, 116],
        ],
      ],
      [
        "jump-up-2",
        [
          [123, 230, 64, 111],
          [38, 112],
        ],
      ],
      [
        "jump-up-3",
        [
          [191, 228, 63, 96],
          [38, 112],
        ],
      ],
      [
        "jump-up-4",
        [
          [252, 228, 62, 96],
          [37, 110],
        ],
      ],
      [
        "jump-up-5",
        [
          [313, 229, 59, 103],
          [35, 115],
        ],
      ],
      [
        "jump-up-6",
        [
          [368, 239, 68, 115],
          [39, 122],
        ],
      ],
      //前後ジャンプ7枚
      [
        "jump-roll-1",
        [
          [440, 254, 63, 91],
          [36, 94],
        ],
      ],
      [
        "jump-roll-2",
        [
          [504, 249, 109, 68],
          [45, 90],
        ],
      ],
      [
        "jump-roll-3",
        [
          [612, 236, 63, 96],
          [38, 76],
        ],
      ],
      [
        "jump-roll-4",
        [
          [675, 244, 125, 72],
          [47, 111],
        ],
      ],
      [
        "jump-roll-5",
        [
          [800, 253, 79, 106],
          [72, 82],
        ],
      ],
      [
        "jump-roll-6",
        [
          [877, 255, 67, 121],
          [56, 100],
        ],
      ],
      [
        "jump-roll-7",
        [
          [63, 240, 66, 112],
          [32, 110],
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
      [FighterState.JUMP_FORWARD]: [
        ["jump-roll-1", 200],
        ["jump-roll-2", 50],
        ["jump-roll-3", 50],
        ["jump-roll-4", 50],
        ["jump-roll-5", 50],
        ["jump-roll-6", 50],
        ["jump-roll-7", 0],
      ],
      [FighterState.JUMP_BACKWARD]: [
        ["jump-roll-7", 200],
        ["jump-roll-6", 50],
        ["jump-roll-5", 50],
        ["jump-roll-4", 50],
        ["jump-roll-3", 50],
        ["jump-roll-2", 50],
        ["jump-roll-1", 0],
      ],
    };
    this.initialVelocity = {
      x: {
        [FighterState.WALK_FORWARD]: 200,
        [FighterState.WALK_BACKWARD]: -150,
        [FighterState.JUMP_FORWARD]: 170,
        [FighterState.JUMP_BACKWARD]: -200,
      },
      jump: -420,
    };
    this.gravity = 1000;
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
