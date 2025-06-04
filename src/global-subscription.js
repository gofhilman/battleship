import PubSub from "pubsub-js";
import { DISPLAY, GAMEBOARD, SHIP, OPPONENT, TURN } from "./pubsub-msg";
import { startMain } from "./game-main";
import { renderGrid, renderSetupGrid, renderStatus } from "./grid";
import { setupComplete } from "./dialogs";
import gameControl from "./game-control";

PubSub.subscribe(DISPLAY.MAIN, startMain);
PubSub.subscribe(GAMEBOARD.GRID, renderSetupGrid);
PubSub.subscribe(SHIP.COMPLETE, setupComplete);
PubSub.subscribe(OPPONENT.TYPE, gameControl.createPlayers.bind(gameControl));
PubSub.subscribe(TURN, renderGrid)
PubSub.subscribe(TURN, renderStatus);

const gridOne = document.querySelector("#grid-one");
const gridTwo = document.querySelector("#grid-two");
const grids = [gridOne, gridTwo];

