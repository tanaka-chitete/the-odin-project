"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  start = () => {
    this.onStartEnd(`Your turn, ${this.#attacker.name}`);
  };

  bindToOnStartEnd(callback) {
    this.onStartEnd = callback;
  }
}
