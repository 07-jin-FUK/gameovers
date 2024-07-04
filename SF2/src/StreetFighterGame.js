// import { Ken } from "./entities/fighters/Ken.js";
// import { Stage } from "./entities/Stage.js";
// import { Ryu } from "./entities/fighters/Ryu.js";
// // import { FpsCounter } from "./entities/FpsCounter.js";
// import { STAGE_FLOOR } from "./constants/stage.js";
// import { FighterDirection } from "./constants/fighters.js";
// import { registerKeyboardEvents } from "./InputHandler.js";

// export class StreetFighterGame {
//   constructor() {
//     this.context = this.getContext();
//     this.fighters = [
//       new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT, 0),
//       new Ken(280, STAGE_FLOOR, FighterDirection.LEFT, 1),
//     ];

//     this.fighters[0].opponent = this.fighters[1];
//     this.fighters[1].opponent = this.fighters[0];

//     this.entities = [new Stage(), ...this.fighters];

//     this.frameTime = {
//       previous: 0,
//       secondsPassed: 0,
//     };
//   }

//   getContext() {
//     const GameViewport = {
//       WIDTH: 384,
//       HEIGHT: 224,
//     };
//     const canvasEl = document.querySelector("canvas");
//     const context = canvasEl.getContext("2d");

//     canvasEl.width = GameViewport.WIDTH;
//     canvasEl.height = GameViewport.HEIGHT;

//     return context;
//   }

//   update() {
//     for (const entity of this.entities) {
//       entity.update(this.frameTime, this.context);
//     }
//   }
//   draw() {
//     for (const entity of this.entities) {
//       entity.draw(this.context);
//     }
//   }

//   frame(time) {
//     window.requestAnimationFrame(this.frame.bind(this));
//     this.frameTime = {
//       secondsPassed: (time - this.frameTime.previous) / 1000,
//       previous: time,
//     };
//     this.update();
//     this.draw();
//   }

//   start() {
//     registerKeyboardEvents();

//     window.requestAnimationFrame(this.frame.bind(this));
//   }
// }

//ここから
import { Ken } from "./entities/fighters/Ken.js";
import { Stage } from "./entities/Stage.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighters.js";
import { registerKeyboardEvents, isKeyDown } from "./InputHandler.js";

export class StreetFighterGame {
  constructor() {
    this.context = this.getContext();
    this.fighters = [
      new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT, 0),
      new Ken(280, STAGE_FLOOR, FighterDirection.LEFT, 1),
    ];

    this.fighters[0].opponent = this.fighters[1];
    this.fighters[1].opponent = this.fighters[0];

    this.entities = [new Stage(), ...this.fighters];

    this.frameTime = {
      previous: 0,
      secondsPassed: 0,
    };
    this.bgm = document.getElementById("bgm");

    // キーのリストを用意
    this.player1Keys = ["KeyO", "KeyK", "KeyM"];
    this.player2Keys = ["KeyT", "KeyF", "KeyC"];

    // 各プレイヤーのダメージキーをランダムに選択
    this.player1RandomKey = this.getRandomKey(this.player1Keys);
    this.player2RandomKey = this.getRandomKey(this.player2Keys);

    this.winner = null; // 勝者の表示

    // 効果音のオーディオ要素を追加
    this.hitSound = new Audio("../sounds/hadoken.wav"); // 音声ファイルのパスを指定
  }

  getContext() {
    const GameViewport = {
      WIDTH: 384,
      HEIGHT: 224,
    };
    const canvasEl = document.querySelector("canvas");
    const context = canvasEl.getContext("2d");

    canvasEl.width = GameViewport.WIDTH;
    canvasEl.height = GameViewport.HEIGHT;

    return context;
  }

  getRandomKey(keys) {
    return keys[Math.floor(Math.random() * keys.length)];
  }

  drawHealthBars() {
    this.context.fillStyle = "red";
    // 1Pの体力バー
    this.context.fillRect(10, 10, this.fighters[0].health, 10);
    // 2Pの体力バー
    this.context.fillRect(
      364 - this.fighters[1].health,
      10,
      this.fighters[1].health,
      10
    );
  }

  checkWinner() {
    if (this.fighters[0].health <= 0) {
      this.winner = "2P WIN";
      this.endGame();
    } else if (this.fighters[1].health <= 0) {
      this.winner = "1P WIN";
      this.endGame();
    }
  }

  endGame() {
    // ゲームを停止
    setTimeout(() => {
      // タイトル画面に遷移（仮にリロードする形にしています）
      window.location.reload();
    }, 3000);
  }

  drawWinner() {
    this.context.fillStyle = "white";
    this.context.font = "30px Arial";
    this.context.textAlign = "center";
    this.context.fillText(
      this.winner,
      this.context.canvas.width / 2,
      this.context.canvas.height / 2
    );
  }

  playHitSound() {
    this.hitSound.currentTime = 0; // 再生位置をリセット
    this.hitSound.play().catch((error) => {
      console.error("Failed to play hit sound:", error);
    });
  }

  update() {
    if (this.winner) return; // 勝者が決定したら更新を停止

    for (const entity of this.entities) {
      entity.update(this.frameTime, this.context);
    }

    // 1Pのランダムな体力減少キーが押されたかチェック
    if (isKeyDown(this.player1RandomKey)) {
      this.fighters[0].health -= 10;
      if (this.fighters[0].health < 0) this.fighters[0].health = 0;
      this.player1RandomKey = this.getRandomKey(this.player1Keys); // 次のランダムキーを選択
      this.playHitSound(); // 効果音を再生
    }

    // 2Pのランダムな体力減少キーが押されたかチェック
    if (isKeyDown(this.player2RandomKey)) {
      this.fighters[1].health -= 10;
      if (this.fighters[1].health < 0) this.fighters[1].health = 0;
      this.player2RandomKey = this.getRandomKey(this.player2Keys); // 次のランダムキーを選択
      this.playHitSound(); // 効果音を再生
    }

    this.checkWinner(); // 勝者をチェック
  }

  draw() {
    for (const entity of this.entities) {
      entity.draw(this.context);
    }
    this.drawHealthBars();
    if (this.winner) {
      this.drawWinner();
    }
  }

  frame(time) {
    window.requestAnimationFrame(this.frame.bind(this));
    this.frameTime = {
      secondsPassed: (time - this.frameTime.previous) / 1000,
      previous: time,
    };
    this.update();
    this.draw();
  }

  start() {
    registerKeyboardEvents();

    window.requestAnimationFrame(this.frame.bind(this));
  }

  playBGM() {
    this.bgm.play();
  }
}
