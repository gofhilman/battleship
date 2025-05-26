import Ship from "../src/ship";

let ship;

beforeEach(() => ship = new Ship(3));

test("hit()", () => {
  ship.hits = 1;
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("isSunk()", () => {
  ship.hits = ship.length;
  ship.isSunk();
  expect(ship.sunk).toBe(true);
})