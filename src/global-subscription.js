import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, SHIP } from "./pubsub-msg";
import { startMain } from "./game-main";
import { renderGrid } from "./render";
import { setupComplete } from "./dialogs";


PubSub.subscribe(DISPLAY.MAIN, startMain);
PubSub.subscribe(GAMEBOARD.GRID, renderGrid);
PubSub.subscribe(SHIP.COMPLETE, setupComplete);