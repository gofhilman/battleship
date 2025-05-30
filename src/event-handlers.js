let resolveSubscription;
const subscriptionPromise = new Promise((resolve) => {
  resolveSubscription = resolve;
});

function handleOrientation(event) {
  if (event.target.classList.contains("horizontal")) {
    const clonedShip = event.target.previousElementSibling.cloneNode(true);
    clonedShip.classList.add("move");
    const gameSetup = document.querySelector("#game-setup")
    gameSetup.appendChild(clonedShip);
    document.addEventListener("mousemove", (event) => {
      handleMove(event, clonedShip);
    });
  }
}

function handleMove(event, movingElement) {
  movingElement.style.transform = `translate(${event.clientX-830}px, ${event.clientY-195}px)`;
}

export { resolveSubscription, subscriptionPromise, handleOrientation };
