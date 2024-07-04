import { StreetFighterGame } from "./StreetFighterGame.js";

const game = new StreetFighterGame();

window.addEventListener("click", () => {
  game.playBGM();
  game.start();
});
