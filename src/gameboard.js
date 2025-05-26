import GridElement from "./grid-element.js";

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => {
      return Array(10).fill(null).map(() => new GridElement)
    });
    this.ships = [];
  }

  placeShip(ship, orientation, position) {
    if(!this.isValidPos(ship.length, orientation, position)) return;
    this.ships.push(ship);
    this.processPlacing(ship, orientation, position);
  }

  receiveAttack(coordinate) {
    // this.grid[coordinate[0]][coordinate[1]].markElement();
  }

  isGameOver() {

  }

  isValidPos(shipLength, orientation, position) {
    for (let placingIter = 0; placingIter < shipLength; placingIter++) {
      if(orientation === "horizontal" && 
        (!this.grid[position[0]][position[1] + placingIter] ||
          this.grid[position[0]][position[1] + placingIter].ship !== null)) {
        return false;
      } else if(orientation === "vertical" &&
        (!this.grid[position[0] + placingIter][position[1]] ||
          this.grid[position[0] + placingIter][position[1]].ship !== null)) {
        return false;
      }
    }
    return true;    
  }

  processPlacing(ship, orientation, position) {
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      if(orientation === "horizontal") {
        this.grid[position[0]][position[1] + placingIter].constructShip(ship);
      } else if(orientation === "vertical") {
        this.grid[position[0] + placingIter][position[1]].constructShip(ship);
      }
    }
    return ship;
  }
}

export default Gameboard;