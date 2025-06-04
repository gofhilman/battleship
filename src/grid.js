import gameControl from "./game-control";

function createGrid(grid) {
  grid.replaceChildren();
  for (let elementIter = 0; elementIter < 100; elementIter++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    grid.appendChild(gridElement);
  }
}

function createStatusGrid(status) {
  status.replaceChildren();
  const shipLengths = [5, 4, 3, 3, 2];
  shipLengths.forEach((shipLength) => {
    const shipStatus = document.createElement("div");
    shipStatus.classList.add("ship-status");
    for (let elementIter = 0; elementIter < shipLength; elementIter++) {
      const statusElement = document.createElement("div");
      statusElement.classList.add("status-element");
      shipStatus.appendChild(statusElement);
    }
    status.appendChild(shipStatus);
  });
}

function renderSetupGrid(_, grid) {
  const setupGrid = document.querySelector("#setup-grid");
  for (let gridIter = 0; gridIter < setupGrid.children.length; gridIter++) {
    setupGrid.children[gridIter].replaceChildren();
    if (grid[Math.floor(gridIter / 10)][gridIter % 10].ship) {
      const shipElement = document.createElement("div");
      shipElement.classList.add("ship-element");
      setupGrid.children[gridIter].appendChild(shipElement);
    }
  }
}

function renderGrid(_, playerArray) {
  const gridOne = document.querySelector("#grid-one");
  const gridTwo = document.querySelector("#grid-two");
  const grids = [gridOne, gridTwo];

  for (let playerIter = 0; playerIter < 2; playerIter++) {
    for (let gridIter = 0; gridIter < 100; gridIter++) {
      const gridElement = grids[playerIter].querySelector(
        `.grid-element:nth-child(${gridIter + 1})`
      );

      gridElement.classList.remove("yellow", "red");
      const element =
        playerArray[0][playerIter].gameboard.grid[Math.floor(gridIter / 10)][
          gridIter % 10
        ];
      if (element.mark === "hit") gridElement.classList.add("red");
      else if (element.mark === "miss") gridElement.classList.add("yellow");

      grids[playerIter].classList.remove("unclickable");
      gridElement.replaceChildren();
      if (playerArray[0][playerIter] === playerArray[1]) {
        grids[playerIter].classList.add("unclickable");
        if (element.ship) {
          const shipElement = document.createElement("div");
          shipElement.classList.add("ship-element");
          gridElement.appendChild(shipElement);
        }
      }
    }
  }
}

function renderStatus() {
  const statusOne = document.querySelector("#status-one");
  const statusTwo = document.querySelector("#status-two");
  const status = [statusOne, statusTwo];
  for (let playerIter = 0; playerIter < 2; playerIter++) {
    for (let shipIter = 0; shipIter < 5; shipIter++) {
      const shipLength =
        gameControl.players[playerIter].gameboard.ships[shipIter].length;
      const shipHits =
        gameControl.players[playerIter].gameboard.ships[shipIter].hits;
      let elementIter = 1;
      while (elementIter <= shipLength - shipHits) {
        const statusElement = status[playerIter].querySelector(
          `.ship-status:nth-child(${shipIter + 1})>.status-element:nth-child(${elementIter})`
        );
        statusElement.classList.remove("green", "red");
        statusElement.classList.add("green");
        elementIter++;
      }
      while (elementIter <= shipLength) {
        const statusElement = status[playerIter].querySelector(
          `.ship-status:nth-child(${shipIter + 1})>.status-element:nth-child(${elementIter})`
        );
        statusElement.classList.remove("green", "red");
        statusElement.classList.add("red");
        elementIter++;
      }
    }
  }
}

export {
  renderSetupGrid,
  createGrid,
  createStatusGrid,
  renderGrid,
  renderStatus,
};
