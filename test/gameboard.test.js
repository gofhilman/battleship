import Gameboard from "../src/gameboard";

let gameboard;
const ship = { length: 3 };
beforeEach(() => gameboard = new Gameboard());

describe("isValidShip and placeShip", () => {
  test("horizontal ship that can be put on the grid", () => {
    expect(gameboard.isValidPos(ship.length, "horizontal", [0, 4])).toBe(true);
    gameboard.placeShip(ship, "horizontal", [0, 4]);
    expect(gameboard.ships).toEqual([ship]);
    const finalGrid = new Gameboard().grid;
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      finalGrid[0][4 + placingIter].constructShip(ship);
    }
    expect(gameboard.grid).toEqual(finalGrid);
  });

  test("vertical ship that can be put on the grid", () => {
    expect(gameboard.isValidPos(ship.length, "vertical", [3, 3])).toBe(true);
    gameboard.placeShip(ship, "vertical", [3, 3]);
    expect(gameboard.ships).toEqual([ship]);
    const finalGrid = new Gameboard().grid;
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      finalGrid[3 + placingIter][3].constructShip(ship);
    }
    expect(gameboard.grid).toEqual(finalGrid);    
  });

  test("ship outside the grid", () => {
    expect(gameboard.isValidPos(ship.length, "horizontal", [0, 8])).toBe(false);
    gameboard.placeShip(ship, "horizontal", [0, 8]);
    expect(gameboard.ships).toEqual([]);
    const finalGrid = new Gameboard().grid;
    expect(gameboard.grid).toEqual(finalGrid);
  });

  test("ships that cannot overlap", () => {
    gameboard.placeShip(ship, "horizontal", [0,3]);
    expect(gameboard.isValidPos(ship.length, "vertical", [0, 4])).toBe(false);
    gameboard.placeShip(ship, "vertical", [0, 4]);
    expect(gameboard.ships).toEqual([ship]);
    const finalGrid = new Gameboard().grid;
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      finalGrid[0][3 + placingIter].constructShip(ship);
    }
    expect(gameboard.grid).toEqual(finalGrid);
  });

});
