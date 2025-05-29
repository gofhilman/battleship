import "./styles.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import { displayGameSetting } from "./dialogs";
import GameControl from "./game-control";

const gameControl = new GameControl();
displayGameSetting(gameControl.players);
