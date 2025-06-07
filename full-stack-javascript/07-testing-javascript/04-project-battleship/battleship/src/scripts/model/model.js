"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleGetDock = () => {
    const dock = [
      {
        length: 5,
        quantity: 1,
      },
      {
        length: 4,
        quantity: 2,
      },
      {
        length: 3,
        quantity: 3,
      },
      {
        length: 2,
        quantity: 4,
      },
      {
        length: 1,
        quantity: 5,
      },
    ];

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: dock,
    };

    this.onDockGotten(response);
  };

  handlePlaceShip = (x1, y1, x2, y2) => {
    if (!this.#attacker.place(x1, y1, x2, y2)) {
      return;
    }

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: this.#attacker.board.board,
    };

    this.onShipPlaced(response);
  };

  bindToOnDockGotten = (callback) => {
    this.onDockGotten = callback;
  };

  bindToOnShipPlaced = (callback) => {
    this.onShipPlaced = callback;
  };
}
