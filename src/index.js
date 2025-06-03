import "./styles.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import "./global-subscription";
import { displayGameSetting } from "./dialogs";
import gameControl from "./game-control";

displayGameSetting(gameControl.players);
