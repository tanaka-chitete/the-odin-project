"use strict";

import { Player } from "../model/player";

export class GameController {
  #attacker;
  #defender;
  #over;

  #_message;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
    this.#_message = `Your turn, ${this.#attacker.name}`;
    this.#over = false;
  }

  get message() {
    return this.#_message;
  }

  play(x, y) {
    if (this.#over) {
      return;
    }

    if (!this.#defender.receive(x, y)) {
      this.#_message = `Invalid coordinates, ${this.#attacker.name}`;
      return;
    }

    if (this.#defender.isLoser()) {
      this.#over = true;
      this.#_message = `You win, ${this.#attacker.name}!`;
      return;
    }

    this.#_message = `Your turn, ${this.#defender.name}`;

    [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
  }
}
