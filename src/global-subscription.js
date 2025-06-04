import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, SHIP, OPPONENT, TURN, MAIN } from "./pubsub-msg";
import { startMain } from "./game-main";
import { renderGrid, renderSetupGrid, renderStatus } from "./grid";
import { displayTransition, setupComplete } from "./dialogs";
import gameControl from "./game-control";

PubSub.subscribe(DISPLAY.MAIN, startMain);
PubSub.subscribe(GAMEBOARD.GRID, renderSetupGrid);
PubSub.subscribe(SHIP.COMPLETE, setupComplete);
PubSub.subscribe(OPPONENT.TYPE, gameControl.createPlayers.bind(gameControl));
PubSub.subscribe(TURN, renderGrid);
PubSub.subscribe(TURN, renderStatus);
PubSub.subscribe(MAIN, displayTransition);

const gridOne = document.querySelector("#grid-one");
const gridTwo = document.querySelector("#grid-two");
const grids = [gridOne, gridTwo];
grids.forEach((grid) => {
  grid.addEventListener("click", (event) => {
    if (event.target.classList.contains("grid-element")) {
      const gridElementNumber = Array.from(
        event.target.parentElement.children
      ).indexOf(event.target);
      const coordinate = [
        Math.floor(gridElementNumber / 10),
        gridElementNumber % 10,
      ];
      if (
        gameControl.activePlayer.canAttack(
          gameControl.opponent.gameboard,
          coordinate
        )
      ) {
        gameControl.activePlayer.attack(
          gameControl.opponent.gameboard,
          coordinate
        );
        gameControl.switchActivePlayer();
        if (gameControl.activePlayer.type === "computer") {
          gameControl.activePlayer.attackRandomly(gameControl.opponent.gameboard);
          gameControl.switchActivePlayer();
          PubSub.publish(TURN, [gameControl.players, gameControl.activePlayer]);
        } else {
          const mainContainer = document.querySelector("#main-container");
          mainContainer.classList.add("no-display");
          PubSub.publish(MAIN, [gameControl.players, gameControl.activePlayer]);
        } 
      }
    }
  });
});
