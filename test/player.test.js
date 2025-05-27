import Gameboard from "../src/gameboard";
import Player from "../src/player";
import Ship from "../src/ship";

let player, opponentBoard;
beforeEach(() => {
  player = new Player("player-one", "computer");
  opponentBoard = new Gameboard();
});

test("placeShipsRandomly", () => {
  player.placeShipsRandomly();
  expect(player.gameboard.ships).toEqual([
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ]);
});

test("canAttack and attack", () => {
  expect(player.canAttack(opponentBoard, [4, 4])).toBe(true);
  player.attack(opponentBoard, [4, 4]);
  expect(player.canAttack(opponentBoard, [4, 4])).toBe(false);
  player.attack(opponentBoard, [4, 4]);
  const refBoard = new Gameboard();
  refBoard.grid[4][4].mark = "miss";
  expect(opponentBoard.grid).toEqual(refBoard.grid);
});

test("attackRandomly", () => {
  for(let attackIter = 0; attackIter < 10; attackIter++) {
    player.attackRandomly(opponentBoard);
  }
  const markNumber = opponentBoard.grid.reduce((rowTotal, row) => {
    const columnTotal = row.reduce((total, gridElement) => {
      if(gridElement.mark) total++;
      return total;
    }, 0);
    return rowTotal + columnTotal;
  }, 0);
  expect(markNumber).toBe(10);
});