import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, OPPONENT, SHIP } from "./pubsub-msg";
import horizontalIcon from "./assets/arrow-left-right-bold.svg";
import verticalIcon from "./assets/arrow-up-down-bold.svg";
import {
  handleOrientation,
  handleRandomize,
  handleSetupReset,
  subscriptionPromise,
} from "./event-handlers";
import { createGrid } from "./grid";

let setupToken, placeShipToken, checkToken;
let orientationHandler,
  setupResetHandler,
  randomizeHandler,
  confirmSetupHandler,
  confirmTransitionHandler;

function displayGameSetting(players) {
  const gameSetting = document.querySelector("#game-setting");
  const confirmSetting = document.querySelector("#confirm-setting");

  gameSetting.showModal();
  confirmSetting.addEventListener("click", async (event) => {
    event.preventDefault();
    gameSetting.close();
    const opponentType = document.querySelector(
      "[name='opponent-type']:checked"
    );
    PubSub.publish(OPPONENT.TYPE, opponentType.value);
    await subscriptionPromise;
    displaySetup(players, players[0]);
    if (players[1].type === "computer") {
      setupToken = PubSub.subscribe(
        "setup",
        players[1].placeShipsRandomly.bind(players[1])
      );
    } else {
      setupToken = PubSub.subscribe("setup", displayTransition);
    }
  });
}

function displaySetup(players, player) {
  const gameSetup = document.querySelector("#game-setup");
  const playerName = document.querySelector("#player-name");
  const dock = document.querySelector("#dock");
  const setupGrid = document.querySelector("#setup-grid");
  const setupReset = document.querySelector("#setup-reset");
  const randomize = document.querySelector("#randomize");
  const confirmSetup = document.querySelector("#confirm-setup");

  playerName.textContent = player.name;
  const shipLengths = [5, 4, 3, 3, 2];
  shipLengths.forEach((shipLength) => {
    const dockedShip = document.createElement("div");
    dockedShip.classList.add("docked-ship");
    for (let elementIter = 0; elementIter < shipLength; elementIter++) {
      const shipElement = document.createElement("div");
      shipElement.classList.add("ship-element");
      dockedShip.appendChild(shipElement);
    }
    const horizontal = document.createElement("img");
    const vertical = document.createElement("img");
    Object.assign(horizontal, {
      src: horizontalIcon,
      alt: "horizontal",
      className: "horizontal",
    });
    Object.assign(vertical, {
      src: verticalIcon,
      alt: "vertical",
      className: "vertical",
    });
    dock.append(dockedShip, horizontal, vertical);
  });
  placeShipToken = PubSub.subscribe(
    SHIP.STATE,
    player.placeShipPubSub.bind(player)
  );
  orientationHandler = (event) => handleOrientation(event, player);
  dock.addEventListener("click", orientationHandler);
  createGrid(setupGrid);
  checkToken = PubSub.subscribe(
    GAMEBOARD.GRID,
    player.isEverythingPlaced.bind(player)
  );
  confirmSetup.disabled = true;
  setupResetHandler = () => handleSetupReset(player);
  setupReset.addEventListener("click", setupResetHandler);
  randomizeHandler = () => handleRandomize(player);
  randomize.addEventListener("click", randomizeHandler);
  confirmSetupHandler = (event) => {
    event.preventDefault();
    gameSetup.close();
    dock.replaceChildren(dock.firstElementChild);
    dock.firstElementChild.textContent = "Choose the orientations";
    setupGrid.replaceChildren();
    PubSub.publish("setup", [players, players[1]]);
    if (
      players[1].type === "computer" ||
      JSON.stringify(players[1]) === JSON.stringify(player)
    ) {
      const confirmTransition = document.querySelector("#confirm-transition");
      confirmTransition.removeEventListener("click", confirmTransitionHandler);
      PubSub.publish(DISPLAY.MAIN, players[1].type);
    }
  };
  confirmSetup.addEventListener("click", confirmSetupHandler);

  gameSetup.showModal();
}

function displayTransition(transitionType, playerArray) {
  const transition = document.querySelector("#transition");
  const confirmTransition = document.querySelector("#confirm-transition");

  transition.showModal();
  confirmTransitionHandler = (event) => {
    event.preventDefault();
    transition.close();
    if (transitionType === "setup") {
      unsubscribeAll();  
      displaySetup(...playerArray);
    }
  };
  confirmTransition.addEventListener("click", confirmTransitionHandler);
}

function setupComplete(_, complete) {
  const confirmSetup = document.querySelector("#confirm-setup");
  const dock = document.querySelector("#dock");
  confirmSetup.disabled = complete ? false : true;
  if (complete) {
    dock.firstElementChild.textContent = "";
  } else {
    dock.firstElementChild.textContent = "Choose the orientations";
  }
}

function unsubscribeAll() {
  [setupToken, placeShipToken, checkToken].forEach((token) =>
    PubSub.unsubscribe(token)
  );

  const dock = document.querySelector("#dock");
  const setupReset = document.querySelector("#setup-reset");
  const randomize = document.querySelector("#randomize");
  const confirmSetup = document.querySelector("#confirm-setup");

  [
    [dock, orientationHandler],
    [setupReset, setupResetHandler],
    [randomize, randomizeHandler],
    [confirmSetup, confirmSetupHandler],
  ].forEach((pair) => {
    pair[0].removeEventListener("click", pair[1]);
  });  
}

export { displayGameSetting, setupComplete, unsubscribeAll };
