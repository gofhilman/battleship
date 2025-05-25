import Gameboard from "../src/gameboard";

let gameboard = new Gameboard();
const ship = { length: 3 };
beforeEach(() => gameboard = new Gameboard());

describe("placeShip", () => {
  test("ship added to this.ships", () => {
    gameboard.placeShip(ship, "horizontal", [0, 4]);
    expect(gameboard.ships).toEqual([ship]);
  });

  test("horizontal ship that can be put on the grid", () => {
    const shipObj = gameboard.placeShip(ship, "horizontal", [0, 4]);
    const finalGrid = new Gameboard().grid;
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      finalGrid[0][4 + placingIter] = ship;
    }
    expect(shipObj).toEqual(ship);
    expect(gameboard.grid).toEqual(finalGrid);
  });

  test("vertical ship that can be put on the grid", () => {
    const shipObj = gameboard.placeShip(ship, "vertical", [3, 3]);
    const finalGrid = new Gameboard().grid;
    for (let placingIter = 0; placingIter < ship.length; placingIter++) {
      finalGrid[3 + placingIter][3] = ship;
    }
    expect(shipObj).toEqual(ship);
    expect(gameboard.grid).toEqual(finalGrid);    
  });

  test("ship that cannot be put on the grid", () => {
    const shipObj = gameboard.placeShip(ship, "horizontal", [0, 8]);
    const finalGrid = new Gameboard().grid;
    expect(shipObj).toBeNull();
    expect(gameboard.grid).toEqual(finalGrid);
  })

});
