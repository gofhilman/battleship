import GridElement from "../src/grid-element";

let gridElement;
beforeEach(() => gridElement = new GridElement());

test("constructShip", () => {
  gridElement.constructShip("ship");
  expect(gridElement.ship).toBe("ship");
});

describe("markElement", () => {
  test("if there is a ship", () => {
    gridElement.constructShip("ship");
    expect(gridElement.markElement()).toBe("hit");
    expect(gridElement.mark).toBe("hit");
  });
  test("if there is no ship", () => {
    expect(gridElement.markElement()).toBe("miss");
    expect(gridElement.mark).toBe("miss");
  });
});