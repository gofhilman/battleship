import Gameboard from "./gameboard.js";
import { GAMEBOARD, SHIP } from "./pubsub-msg.js";
import Ship from "./ship.js";
import PubSub from "pubsub-js";

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
    this.memory = {
      hitShip: [],
      hitGrid: [],
      hitOrientation: null,
    };
  }

  placeShipsRandomly() {
    this.gameboard = new Gameboard();
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
    console.log(this.gameboard.grid); // Test
  }

  attack(opponentBoard, coordinate) {
    if (!this.canAttack(opponentBoard, coordinate)) return;
    opponentBoard.receiveAttack(coordinate);
  }

  attackRandomly(opponentBoard) {
    let randomCoordinate = this.randomizePosition();
    while (!this.canAttack(opponentBoard, randomCoordinate)) {
      randomCoordinate = this.randomizePosition();
    }
    this.attack(opponentBoard, randomCoordinate);
  }

  attackIntelligently(opponentBoard) {
    if (this.memory.hitShip.length === 0) {
      this.attackRandomlyAndRemember(opponentBoard);
    } else if (
      this.memory.hitShip.length > 0 &&
      this.memory.hitOrientation === null
    ) {
      this.attackIntelligentlyRandomly(opponentBoard);
    } else if (this.memory.hitOrientation) {
      this.attackWithBFS(opponentBoard);
    }
    console.log(this.memory); // Test
  }

  attackRandomlyAndRemember(opponentBoard) {
    let randomCoordinate = this.randomizePosition();
    while (!this.canAttack(opponentBoard, randomCoordinate)) {
      randomCoordinate = this.randomizePosition();
    }
    this.attack(opponentBoard, randomCoordinate);
    const hitCheck =
      opponentBoard.grid[randomCoordinate[0]][randomCoordinate[1]].ship;
    if (hitCheck) {
      this.memory.hitShip.push(hitCheck);
      this.memory.hitGrid.push([randomCoordinate]);
    }
  }

  attackIntelligentlyRandomly(opponentBoard) {
    const displacements = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
    const targetChoice = [];
    for (const displacement of displacements) {
      const target = [
        this.memory.hitGrid[0][0][0] + displacement[0],
        this.memory.hitGrid[0][0][1] + displacement[1],
      ];
      if (
        target[0] >= 0 &&
        target[1] >= 0 &&
        target[0] <= 9 &&
        target[1] <= 9 &&
        this.canAttack(opponentBoard, target)
      ) {
        targetChoice.push(target);
      }
    }
    const randomCoordinate =
      targetChoice[Math.floor(Math.random() * targetChoice.length)];
    this.attack(opponentBoard, randomCoordinate);
    const hitCheck =
      opponentBoard.grid[randomCoordinate[0]][randomCoordinate[1]].ship;
    if (hitCheck === this.memory.hitShip[0]) {
      if (hitCheck.sunk) {
        this.memory.hitShip.shift();
        this.memory.hitGrid.shift();
        this.memory.hitOrientation = null;
      } else {
        this.memory.hitGrid[0].push(randomCoordinate);
        if (this.memory.hitGrid[0][0][0] === this.memory.hitGrid[0][1][0]) {
          this.memory.hitOrientation = "horizontal";
        } else {
          this.memory.hitOrientation = "vertical";
        }
      }
    } else if (hitCheck) {
      this.memory.hitShip.push(hitCheck);
      this.memory.hitGrid.push([randomCoordinate]);
    }
  }

  attackWithBFS(opponentBoard) {
    const displacements =
      this.memory.hitOrientation === "horizontal"
        ? [
            [0, -1],
            [0, 1],
          ]
        : [
            [-1, 0],
            [1, 0],
          ];
    let coordinate;
    memoryLoop: for (const gridElement of this.memory.hitGrid[0]) {
      for (const displacement of displacements) {
        const target = [
          gridElement[0] + displacement[0],
          gridElement[1] + displacement[1],
        ];
        if (
          target[0] >= 0 &&
          target[1] >= 0 &&
          target[0] <= 9 &&
          target[1] <= 9 &&
          this.canAttack(opponentBoard, target)
        ) {
          coordinate = target;
          break memoryLoop;
        }
      }
    }
    this.attack(opponentBoard, coordinate);
    const hitCheck = opponentBoard.grid[coordinate[0]][coordinate[1]].ship;
    if (hitCheck === this.memory.hitShip[0]) {
      if (hitCheck.sunk) {
        this.memory.hitShip.shift();
        this.memory.hitGrid.shift();
        this.memory.hitOrientation = null;
      } else {
        this.memory.hitGrid[0].push(coordinate);
      }
    } else if (hitCheck) {
      this.memory.hitShip.push(hitCheck);
      this.memory.hitGrid.push([coordinate]);
    }
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

  placeShipPubSub(_, shipState) {
    this.gameboard.placeShip(...shipState);
    console.log(this.gameboard.grid); // Test
    PubSub.publish(GAMEBOARD.GRID, this.gameboard.grid);
  }

  isEverythingPlaced() {
    const complete = this.gameboard.ships.length === 5 ? true : false;
    PubSub.publish(SHIP.COMPLETE, complete);
  }
}

export default Player;
