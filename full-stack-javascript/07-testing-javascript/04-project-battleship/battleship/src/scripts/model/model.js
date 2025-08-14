"use strict";

import { Admiral } from "./admiral";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Admiral("Admiral 1");
    this.#defender = new Admiral("Admiral 2");
  }

  handleStartGame = () => {
    // const response = {
    //   message: `Start placement, ${this.#attacker.getName()}`,
    // };
    const response = new Response(
      `Start preparation, ${this.#attacker.getName()}`
    );

    this.onGameStarted(response);
  };
}
