import PubSub from "pubsub-js";
import { createGrid, createStatusGrid } from "./grid";
import { TURN } from "./pubsub-msg";
import gameControl from "./game-control";
import { unsubscribeAll } from "./dialogs";

const mainContainer = document.querySelector("#main-container");
const gridOne = document.querySelector("#grid-one");
const gridTwo = document.querySelector("#grid-two");
const statusOne = document.querySelector("#status-one");
const statusTwo = document.querySelector("#status-two");

function startMain(_, secondPlayerType) {
  if (secondPlayerType === "computer") {
    [gridOne, gridTwo].forEach((grid) => createGrid(grid));
    [statusOne, statusTwo].forEach((status) => createStatusGrid(status));
    mainContainer.classList.remove("no-display");
    gameControl.sortShips();
    unsubscribeAll();
    PubSub.publish(TURN, [gameControl.players, gameControl.activePlayer]);
  } else {
    const transition = document.querySelector("#transition");
    const confirmTransition = document.querySelector("#confirm-transition");

    transition.showModal();
    const humanOpponentHandler = (event) => {
      event.preventDefault();
      transition.close();
      startMain(_, "computer");
      confirmTransition.removeEventListener("click", humanOpponentHandler);
    };
    confirmTransition.addEventListener("click", humanOpponentHandler);
  }
}

export { startMain };
