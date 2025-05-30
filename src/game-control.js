import PubSub from "pubsub-js";
import Player from "./player";
import { OPPONENT } from "./pubsub-msg";
import { resolveSubscription } from "./event-handlers";

class GameControl {
  constructor() {
    this.players = [];
    PubSub.subscribe(OPPONENT.TYPE, this.createPlayers.bind(this));
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
