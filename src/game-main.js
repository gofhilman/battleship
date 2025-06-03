import PubSub from "pubsub-js";
import { createGrid, createStatusGrid } from "./grid";
import { TURN } from "./pubsub-msg";
import gameControl from "./game-control";

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
    PubSub.publish(TURN, [gameControl.players, gameControl.activePlayer]);

  } else {
    const transition = document.querySelector("#transition");
    const confirmTransition = document.querySelector("#confirm-transition");

    transition.showModal();
    confirmTransition.addEventListener("click", (event) => {
      event.preventDefault();
      transition.close();
      startMain(_, "computer");
    });
  }
}

export { startMain };
