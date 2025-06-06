"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleStart = () => {
    const allocation = [
      {
        id: shipLength5,
        quantity: 1,
      },
      {
        id: shipLength4,
        quantity: 2,
      },
      {
        id: shipLength3,
        quantity: 3,
      },
      {
        id: shipLength2,
        quantity: 4,
      },
      {
        id: shipLength1,
        quantity: 5,
      },
    ];

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      allocation,
    };

    this.onAllocationGenerated(response);
  };

  bindToOnAllocationGenerated = (callback) => {
    this.onAllocationGenerated = callback;
  };
}
