"use strict";

import { Ship } from "./ship.js";

export class Port {
  #classToShips;

  constructor() {
    this.#classToShips = new Map([
      [5, [new Ship(5)]],
      [4, [new Ship(4), new Ship(4)]],
      [
        3,
        [
          new Ship(3),
          new Ship(3),
          new Ship(3),
          new Ship(3),
          new Ship(3),
          new Ship(3),
          new Ship(3),
        ],
      ],
      [2, [new Ship(2), new Ship(2), new Ship(2), new Ship(2), new Ship(2)]],
    ]);
  }

  hasShip(length) {
    return this.#classToShips.has(length);
  }

  popShip(length) {
    if (!this.hasShip(length)) {
      return null;
    }

    const ship = this.#classToShips.get(length).pop();

    if (this.#classToShips.get(length).length === 0) {
      this.#classToShips.delete(length);
    }

    return ship;
  }
}
