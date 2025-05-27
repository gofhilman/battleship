import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }

  placeShipsRandomly() {
    const shipLengths = [5, 4, 3, 3, 2];
    let shipIter = 0;
    while (shipIter < 5) {
      const randomOrientation = this.randomizeOrientation();
      const randomPosition = this.randomizePosition();
      if (
        this.gameboard.isValidPos(
          shipLengths[shipIter],
          randomOrientation,
          randomPosition
        )
      ) {
        this.gameboard.placeShip(
          new Ship(shipLengths[shipIter]),
          randomOrientation,
          randomPosition
        );
        shipIter++;
      }
    }
  }

  receiveAttackRandomly() {
    let attack;
    while(!attack) {
      attack = this.gameboard.receiveAttack(this.randomizePosition());
    }
  }

  randomizeOrientation() {
    if (Math.random() < 0.5) return "horizontal";
    return "vertical";
  }

  randomizePosition() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}

export default Player;