import { SHIP } from "./pubsub-msg";
import Ship from "./ship";
import PubSub from "pubsub-js";

let resolveSubscription;
const subscriptionPromise = new Promise((resolve) => {
  resolveSubscription = resolve;
});

function handleOrientation(event) {
  if (event.target.classList.contains("horizontal") ||
      event.target.classList.contains("vertical")) {
    let clonedShip, shipOrientation;
    event.target.classList.add("hidden");
    if(event.target.classList.contains("horizontal")) {
      shipOrientation = "horizontal";
      clonedShip = event.target.previousElementSibling.cloneNode(true);
      event.target.previousElementSibling.classList.add("hidden");
      event.target.nextElementSibling.classList.add("hidden");
    } else{
      shipOrientation = "vertical";
      clonedShip = event.target.previousElementSibling.previousElementSibling.cloneNode(true);
      event.target.previousElementSibling.previousElementSibling.classList.add("hidden");
      event.target.previousElementSibling.classList.add("hidden");
      clonedShip.classList.add("vertical-ship");
    }
    clonedShip.classList.add("move");
    const gameSetup = document.querySelector("#game-setup");
    gameSetup.appendChild(clonedShip);
    const moveHandler = (event) => handleMove(event, clonedShip, gameSetup);
    gameSetup.addEventListener("mousemove", moveHandler);
    const shipLength = clonedShip.children.length;
    setTimeout(() => {
      gameSetup.addEventListener("click", (event) => {
        if (event.target.classList.contains("grid-element")) {
          clonedShip.remove();
          gameSetup.removeEventListener("mousemove", moveHandler);
          const gridElementNumber = Array.from(event.target.parentElement.children).indexOf(event.target);
          const position = [Math.floor(gridElementNumber / 10), gridElementNumber % 10];
          PubSub.publish(SHIP.STATE, [new Ship(shipLength), shipOrientation, position]);
          // render
          console.log([new Ship(shipLength), shipOrientation, position]);
        }
      });
    }, 100);
  }
}

function handleMove(event, movingElement, parent) {
  const leftOffset = parent.getBoundingClientRect().left + 70;
  const topOffset = parent.getBoundingClientRect().top + 35;
  movingElement.style.transform = `translate(${event.clientX - leftOffset}px, ${event.clientY - topOffset}px)`;
}

export { resolveSubscription, subscriptionPromise, handleOrientation };
