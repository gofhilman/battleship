import Gameboard from "./gameboard";
import { GAMEBOARD, SHIP } from "./pubsub-msg";
import Ship from "./ship";
import PubSub from "pubsub-js";

let moveHandler, placingHandler;
const dock = document.querySelector("#dock");

function handleOrientation(event, player) {
  if (
    event.target.classList.contains("horizontal") ||
    event.target.classList.contains("vertical")
  ) {
    dock.classList.add("unclickable");
    let clonedShip, shipOrientation;
    event.target.classList.add("hidden");
    if (event.target.classList.contains("horizontal")) {
      shipOrientation = "horizontal";
      clonedShip = event.target.previousElementSibling.cloneNode(true);
      event.target.previousElementSibling.classList.add("hidden");
      event.target.nextElementSibling.classList.add("hidden");
    } else {
      shipOrientation = "vertical";
      clonedShip =
        event.target.previousElementSibling.previousElementSibling.cloneNode(
          true
        );
      event.target.previousElementSibling.previousElementSibling.classList.add(
        "hidden"
      );
      event.target.previousElementSibling.classList.add("hidden");
      clonedShip.classList.add("vertical-ship");
    }
    clonedShip.classList.add("move");
    const gameSetup = document.querySelector("#game-setup");
    gameSetup.appendChild(clonedShip);
    moveHandler = (event) => handleMove(event, clonedShip, gameSetup);
    gameSetup.addEventListener("mousemove", moveHandler);
    setTimeout(() => {
      placingHandler = (event) => {
        handlePlacing(event, clonedShip, gameSetup, shipOrientation, player);
      };
      gameSetup.addEventListener("click", placingHandler);
    }, 100);
  }
}

function handleSetupReset(player) {
  player.gameboard = new Gameboard();
  const dock = document.querySelector("#dock");
  Array.from(dock.children).forEach((child) => {
    child.classList.remove("hidden");
  });
  PubSub.publish(GAMEBOARD.GRID, player.gameboard.grid);
}

function handleRandomize(player) {
  player.placeShipsRandomly();
  const dock = document.querySelector("#dock");
  Array.from(dock.children).forEach((child) => {
    child.classList.add("hidden");
  });
  PubSub.publish(GAMEBOARD.GRID, player.gameboard.grid);
}

function handleMove(event, movingElement, parent) {
  const leftOffset = parent.getBoundingClientRect().left + 70;
  const topOffset = parent.getBoundingClientRect().top + 35;
  movingElement.style.transform = `translate(${event.clientX - leftOffset}px, ${event.clientY - topOffset}px)`;
}

function handlePlacing(event, movingElement, parent, shipOrientation, player) {
  if (event.target.classList.contains("grid-element")) {
    const shipLength = movingElement.children.length;
    const gridElementNumber = Array.from(
      event.target.parentElement.children
    ).indexOf(event.target);
    const position = [
      Math.floor(gridElementNumber / 10),
      gridElementNumber % 10,
    ];
    if (player.gameboard.isValidPos(shipLength, shipOrientation, position)) {
      PubSub.publish(SHIP.STATE, [
        new Ship(shipLength),
        shipOrientation,
        position,
      ]);
      movingElement.remove();
      parent.removeEventListener("mousemove", moveHandler);
      parent.removeEventListener("click", placingHandler);
      dock.classList.remove("unclickable");
    }
  }
}

export { handleOrientation, handleSetupReset, handleRandomize };
