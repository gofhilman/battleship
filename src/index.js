import "./styles.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import "./global-subscription";
import { displayGameSetting } from "./dialogs";
import GameControl from "./game-control";
import PubSub from "pubsub-js";
import { OPPONENT } from "./pubsub-msg";


const gameControl = new GameControl();
PubSub.subscribe(OPPONENT.TYPE, gameControl.createPlayers.bind(gameControl));
displayGameSetting(gameControl.players);
