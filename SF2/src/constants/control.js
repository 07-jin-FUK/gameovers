export const Control = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
  // ATTACK: "attack", // 攻撃ボタンを追加
};

export const controls = [
  {
    keyboard: {
      [Control.LEFT]: "KeyA",
      [Control.RIGHT]: "KeyD",
      [Control.UP]: "KeyW",
      [Control.DOWN]: "KeyS",
      // [Control.ATTACK]: "KeyF", // 1Pの攻撃ボタン
    },
  },
  {
    keyboard: {
      [Control.LEFT]: "ArrowLeft",
      [Control.RIGHT]: "ArrowRight",
      [Control.UP]: "ArrowUp",
      [Control.DOWN]: "ArrowDown",
      // [Control.ATTACK]: "Slash", // 2Pの攻撃ボタン
    },
  },
];
