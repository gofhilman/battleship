import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, SHIP, OPPONENT } from "./pubsub-msg";
import { startMain } from "./game-main";
import { renderSetupGrid } from "./grid";
import { setupComplete } from "./dialogs";
import gameControl from "./game-control";

PubSub.subscribe(DISPLAY.MAIN, startMain);
PubSub.subscribe(GAMEBOARD.GRID, renderSetupGrid);
PubSub.subscribe(SHIP.COMPLETE, setupComplete);
PubSub.subscribe(OPPONENT.TYPE, gameControl.createPlayers.bind(gameControl));
