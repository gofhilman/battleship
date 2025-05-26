class GridElement {
  constructor() {
    this.ship = null;
    this.mark = null;
  }
  
  constructShip(ship) {
    this.ship = ship;
  }

  markElement() {
    if(this.ship) this.mark = "hit";
    else this.mark = "miss";
  }
}

export default GridElement;