import Player from "./player";
import { resolveSubscription } from "./event-handlers";

class GameControl {
  constructor() {
    this.players = [];
  }

  createPlayers(_, opponentType) {
    this.players.push(
      new Player("Player 1", "human"),
      new Player(
        opponentType === "computer" ? "Computer" : "Player 2",
        opponentType
      )
    );
    resolveSubscription();
  }
}

export default GameControl;
