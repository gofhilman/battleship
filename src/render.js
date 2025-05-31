function renderGrid(_, grid) {
  const setupGrid = document.querySelector("#setup-grid");
  for(let gridIter = 0; gridIter < setupGrid.children.length; gridIter++) {
    setupGrid.children[gridIter].replaceChildren();
    if(grid[Math.floor(gridIter / 10)][gridIter % 10].ship) {
      const shipElement = document.createElement("div");
      shipElement.classList.add("ship-element");
      setupGrid.children[gridIter].appendChild(shipElement);
    } 
  }
}

export { renderGrid };