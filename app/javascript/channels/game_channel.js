import consumer from "./consumer";

const gameChannel = consumer.subscriptions.create("GameChannel", {
  received(data) {},

  startNewGame() {
    this.perform("start_new_game");
  },

  move() {
    this.perform("move");
  },
});

export default gameChannel;
