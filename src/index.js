import "./styles.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import { displayGameSetting } from "./dialogs";
import GameControl from "./game-control";
import PubSub from "pubsub-js";
import { DISPLAY, OPPONENT } from "./pubsub-msg";
import { startMain } from "./game-main";

const gameControl = new GameControl();
PubSub.subscribe(OPPONENT.TYPE, gameControl.createPlayers.bind(gameControl));
PubSub.subscribe(DISPLAY.MAIN, startMain);
displayGameSetting(gameControl.players);
