import Player from "./player";
import PubSub from "pubsub-js";
import { CONFIG } from "./pubsub-msg";

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
    PubSub.publish(CONFIG, [this.players, this.players[0]]);
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

  reset() {
    this.players = [];
    this.activePlayer = null;
    this.opponent = null;   
  }
}

const gameControl = new GameControl();

export default gameControl;
