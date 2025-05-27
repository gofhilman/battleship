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

  attack(opponentBoard, coordinate) {
    if (!this.canAttack(opponentBoard, coordinate)) return;
    opponentBoard.receiveAttack(coordinate);
  }

  attackRandomly(opponentBoard) {
    let randomCoordinate = this.randomizePosition();
    while(!this.canAttack(opponentBoard, randomCoordinate)) {
      randomCoordinate = this.randomizePosition();
    }
    this.attack(opponentBoard, randomCoordinate);
  }

  randomizeOrientation() {
    if (Math.random() < 0.5) return "horizontal";
    return "vertical";
  }

  randomizePosition() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }

  canAttack(opponentBoard, coordinate) {
    return opponentBoard.isAttacked(coordinate);
  }
}

export default Player;