import Player from "../src/player";
import Ship from "../src/ship";

let player;
beforeEach(() => {
  player = new Player("player-one", "computer");
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

test("receiveAttackRandomly", () => {
  for(let attackIter = 0; attackIter < 10; attackIter++) {
    player.receiveAttackRandomly();
  }
  const markNumber = player.gameboard.grid.reduce((rowTotal, row) => {
    const columnTotal = row.reduce((total, gridElement) => {
      if(gridElement.mark) total++;
      return total;
    }, 0);
    return rowTotal + columnTotal;
  }, 0);
  expect(markNumber).toBe(10);
});