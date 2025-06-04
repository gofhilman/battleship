import Player from "./player";
import { resolveSubscription } from "./event-handlers";

class GameControl {
  constructor() {
    this.players = [];
    this.activePlayer = null;
    this.opponent = null;
  }

  createPlayers(_, opponentType) {
    this.players.push(
      new Player("Player 1", "human"),
      new Player(
        opponentType === "computer" ? "Computer" : "Player 2",
        opponentType
      )
    );
    this.activePlayer = this.players[0];
    this.opponent = this.players[1];
    resolveSubscription();
  }

  switchActivePlayer() {
    this.activePlayer =
      this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
    this.opponent = 
      this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  sortShips() {
    this.players.forEach((player) => {
      player.gameboard.ships.sort((a, b) => b.length - a.length);
    });
  }
}

const gameControl = new GameControl();

export default gameControl;
