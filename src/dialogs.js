import PubSub from "pubsub-js";
import { OPPONENT } from "./pubsub-msg";

const gameSetting = document.querySelector("#game-setting");
const confirmSetting = document.querySelector("#confirm-setting");

function displayGameSetting(players) {
  gameSetting.showModal();
  confirmSetting.addEventListener("click", (event) => {
    event.preventDefault();
    gameSetting.close();
    const opponentType = document.querySelector(
      "[name='opponent-type']:checked"
    );
    PubSub.publish(OPPONENT.TYPE, opponentType.value);
    displaySetup(players);
  });
}

function displaySetup(players) {
  
}

export { displayGameSetting, displaySetup };
