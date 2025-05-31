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
  setupReset.addEventListener("click", () => handleSetupReset(player));
  randomize.addEventListener("click", () => handleRandomize(player));
  // confirmSetup.addEventListener("click");

  // need unsubscribe when finished
  gameSetup.showModal();
}

export { displayGameSetting, displaySetup };
