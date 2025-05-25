class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }

  placeShip(ship, orientation, position) {
    if(!this.isValidPos(ship.length, orientation, position)) return null;
    this.ships.push(ship);
    return this.processPlacing(ship, orientation, position);
  }

  receiveAttack() {

  }

  recordMiss() {

  }

  isValidPos(shipLength, orientation, position) {
    const gridPart = (orientation === "horizontal") ? 1 : 0;
    for(let invalidIndex = 9; invalidIndex > 10 - shipLength; invalidIndex--) {
      if(invalidIndex === position[gridPart]) return false;
    }
    return true;
  }

  processPlacing(ship, orientation, position) {
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      if(orientation === "horizontal") {
        this.grid[position[0]][position[1] + placingIter] = ship;
      } else if(orientation === "vertical") {
        this.grid[position[0] + placingIter][position[1]] = ship;
      }
    }
    return ship;
  }
}

export default Gameboard;