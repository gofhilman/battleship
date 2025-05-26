class GridElement {
  constructor() {
    this.ship = null;
    this.mark = null;
  }
  
  constructShip(ship) {
    this.ship = ship;
  }

  markElement() {
    if(this.ship) return this.mark = "hit";
    else return this.mark = "miss";
  }
}

export default GridElement;