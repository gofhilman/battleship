import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

let gameboard, ship;
beforeEach(() => {
  gameboard = new Gameboard();
  ship = new Ship(3);
});

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
    gameboard.placeShip(ship, "horizontal", [0, 3]);
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

describe("receiveAttack", () => {
  test("not hitting ship", () => {
    const attacked = gameboard.receiveAttack([0, 0]);
    expect(attacked).toBe(true);
    const refGrid = new Gameboard().grid;
    refGrid[0][0].mark = "miss";
    expect(gameboard.grid).toEqual(refGrid);
  });

  test("hitting ship without sinking it", () => {
    gameboard.placeShip(ship, "horizontal", [0, 0]);
    const attacked = gameboard.receiveAttack([0,1]);
    expect(attacked).toBe(true);
    expect(ship.hits).toBe(1);
    expect(ship.sunk).toBe(false);
    const refBoard = new Gameboard();
    refBoard.placeShip(ship, "horizontal", [0, 0]);
    refBoard.grid[0][1].mark = "hit";
    expect(gameboard.grid).toEqual(refBoard.grid);
  });

  test("hitting ship and sinking it", () => {
    gameboard.placeShip(ship, "horizontal", [0, 0]);
    for(let attackIter = 0; attackIter < 3; attackIter++) {
      gameboard.receiveAttack([0,attackIter]);
    }
    expect(ship.hits).toBe(3);
    expect(ship.sunk).toBe(true);
    const refShip = new Ship(3);
    refShip.hits = 3;
    refShip.sunk = true;
    const refBoard = new Gameboard();
    refBoard.placeShip(refShip, "horizontal", [0, 0]);
    for(let attackIter = 0; attackIter < 3; attackIter++) {
      refBoard.grid[0][attackIter].mark = "hit";
    }
    expect(gameboard.grid).toEqual(refBoard.grid);
  });

  test("cannot attack the same grid element", () => {
    gameboard.receiveAttack([0, 0]);
    const secondAttack = gameboard.receiveAttack([0, 0]);
    expect(secondAttack).toBe(false);
    const refGrid = new Gameboard().grid;
    refGrid[0][0].mark = "miss";
    expect(gameboard.grid).toEqual(refGrid);
  });
});