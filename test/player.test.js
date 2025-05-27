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
