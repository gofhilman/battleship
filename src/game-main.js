function startMain(_, secondPlayerType) {
  if (secondPlayerType === "computer") {
    const mainContainer = document.querySelector("#main-container");
    mainContainer.classList.remove("no-display");
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
