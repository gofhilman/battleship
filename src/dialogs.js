import PubSub from "pubsub-js";
import { GAMEBOARD, OPPONENT, SHIP } from "./pubsub-msg";
import horizontalIcon from "./assets/arrow-left-right-bold.svg";
import verticalIcon from "./assets/arrow-up-down-bold.svg";
import {
  handleOrientation,
  handleRandomize,
  handleSetupReset,
  subscriptionPromise,
} from "./event-handlers";
import { renderGrid } from "./render";

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
    displaySetup(players[0]);
    if (players[1].type === "computer") {
      PubSub.subscribe("setup", players[1].placeShipsRandomly.bind(players[1]));
    } else {
      PubSub.subscribe("setup", displayTransition);
    }
  });
}

function displaySetup(player) {
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
  PubSub.subscribe(SHIP.STATE, player.placeShipPubSub.bind(player));
  dock.addEventListener("click", (event) => handleOrientation(event, player));
  for (let elementIter = 0; elementIter < 100; elementIter++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    setupGrid.appendChild(gridElement);
  }
  PubSub.subscribe(GAMEBOARD.GRID, renderGrid);
  PubSub.subscribe(GAMEBOARD.GRID, player.isEverythingPlaced.bind(player));
  confirmSetup.disabled = true;
  PubSub.subscribe(SHIP.COMPLETE, setupComplete);
  setupReset.addEventListener("click", () => handleSetupReset(player));
  randomize.addEventListener("click", () => handleRandomize(player));
  confirmSetup.addEventListener("click", (event) => {
    event.preventDefault();
    gameSetup.close();
    PubSub.publish("setup");
  });

  // need unsubscribe when finished
  gameSetup.showModal();
}

function displayTransition(transitionType) {
  const transition = document.querySelector("#transition");

  transition.showModal();
}

function setupComplete(_, complete) {
  const confirmSetup = document.querySelector("#confirm-setup");
  const dock = document.querySelector("#dock");
  confirmSetup.disabled = complete ? false : true;
  if(complete) {
    dock.firstElementChild.textContent = "";
  } else {
    dock.firstElementChild.textContent = "Choose the orientations";
  }
}

export { displayGameSetting };
