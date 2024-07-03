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
    ]);
    this.animations = {
      [FighterState.IDLE]: [
        "idle-1",
        "idle-2",
        "idle-3",
        "idle-4",
        "idle-3",
        "idle-2",
      ],
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
      [FighterState.JUMP_UP]: [
        "jump-up-1",
        "jump-up-2",
        "jump-up-3",
        "jump-up-4",
        "jump-up-5",
        "jump-up-6",
      ],
    };
    this.initialVelocity = {
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
