"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleGetAllocation = () => {
    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: this.#attacker.allocation,
    };

    this.onAllocationGotten(response);
  };

  handlePlaceShip = (x1, y1, x2, y2) => {
    if (!this.#attacker.place(x1, y1, x2, y2)) {
      return;
    }

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: {
        board: this.#attacker.board,
        allocation: this.#attacker.allocation,
      },
    };

    this.onShipPlaced(response);
  };

  bindToOnAllocationGotten = (callback) => {
    this.onAllocationGotten = callback;
  };

  bindToOnShipPlaced = (callback) => {
    this.onShipPlaced = callback;
  };
}
