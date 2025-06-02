import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, SHIP } from "./pubsub-msg";
import { startMain } from "./game-main";
import { renderSetupGrid } from "./grid";
import { setupComplete } from "./dialogs";

PubSub.subscribe(DISPLAY.MAIN, startMain);
PubSub.subscribe(GAMEBOARD.GRID, renderSetupGrid);
PubSub.subscribe(SHIP.COMPLETE, setupComplete);
