import { FighterState, PushBox } from "../../constants/fighters.js";
import { Fighter } from "./Fighter.js";

export class Ken extends Fighter {
  constructor(x, y, direction, playerId) {
    super("Ken", x, y, direction, playerId);

    this.image = document.querySelector('img[alt="ken"]');
    this.frames = new Map([
      //待機の画像4枚
      [
        "idle-1",
        [
          [
            [879, 526, 56, 92],
            [30, 89],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "idle-2",
        [
          [
            [813, 527, 57, 91],
            [31, 87],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "idle-3",
        [
          [
            [745, 525, 60, 93],
            [34, 89],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "idle-4",
        [
          [
            [680, 524, 60, 93],
            [36, 90],
          ],
          PushBox.IDLE,
        ],
      ],
      //前進の画像6枚
      [
        "forwards-1",
        [
          [
            [875, 523, 60, 95],
            [30, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "forwards-2",
        [
          [
            [874, 895, 61, 95],
            [31, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "forwards-3",
        [
          [
            [793, 895, 76, 95],
            [35, 92],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "forwards-4",
        [
          [
            [712, 895, 76, 95],
            [34, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "forwards-5",
        [
          [
            [631, 895, 76, 95],
            [35, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "forwards-6",
        [
          [
            [566, 895, 62, 95],
            [35, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      //後退の画像6枚
      [
        "backwards-1",
        [
          [
            [873, 993, 56, 94],
            [30, 92],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "backwards-2",
        [
          [
            [809, 993, 56, 95],
            [31, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "backwards-3",
        [
          [
            [743, 992, 56, 95],
            [30, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "backwards-4",
        [
          [
            [676, 995, 56, 92],
            [31, 90],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "backwards-5",
        [
          [
            [597, 993, 56, 95],
            [31, 93],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "backwards-6",
        [
          [
            [532, 993, 56, 94],
            [31, 92],
          ],
          PushBox.IDLE,
        ],
      ],
      //上ジャンプ画像6枚
      [
        "jump-up-1",
        [
          [
            [876, 1203, 59, 109],
            [36, 112],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-up-2",
        [
          [
            [813, 1208, 57, 99],
            [35, 108],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-up-3",
        [
          [
            [745, 1203, 59, 93],
            [35, 108],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-up-4",
        [
          [
            [680, 1204, 60, 93],
            [36, 106],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-up-5",
        [
          [
            [617, 1203, 58, 94],
            [35, 111],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-up-6",
        [
          [
            [552, 1205, 58, 106],
            [35, 116],
          ],
          PushBox.JUMP,
        ],
      ],
      //前後ジャンプ7枚
      [
        "jump-roll-1",
        [
          [
            [875, 1090, 58, 107],
            [28, 110],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-2",
        [
          [
            [810, 1091, 59, 76],
            [26, 94],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-3",
        [
          [
            [697, 1090, 108, 55],
            [62, 80],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-4",
        [
          [
            [632, 1091, 60, 88],
            [47, 117],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-5",
        [
          [
            [502, 1090, 124, 45],
            [72, 82],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-6",
        [
          [
            [421, 1091, 76, 108],
            [56, 100],
          ],
          PushBox.JUMP,
        ],
      ],
      [
        "jump-roll-7",
        [
          [
            [552, 1205, 58, 106],
            [34, 110],
          ],
          PushBox.JUMP,
        ],
      ],
      //しゃがみ画像3枚
      [
        "crouch-1",
        [
          [
            [875, 736, 58, 92],
            [25, 95],
          ],
          PushBox.IDLE,
        ],
      ],
      [
        "crouch-2",
        [
          [
            [794, 751, 76, 77],
            [28, 74],
          ],
          PushBox.BEND,
        ],
      ],
      [
        "crouch-3",
        [
          [
            [717, 767, 72, 61],
            [28, 58],
          ],
          PushBox.CROUCH,
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
      [FighterState.CROUCH]: [["crouch-3", 0]],
      [FighterState.CROUCH_DOWN]: [
        ["crouch-1", 30],
        ["crouch-2", 30],
        ["crouch-3", 30],
        ["crouch-3", -2],
      ],
      [FighterState.CROUCH_UP]: [
        ["crouch-3", 30],
        ["crouch-2", 30],
        ["crouch-1", 30],
        ["crouch-1", -2],
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
