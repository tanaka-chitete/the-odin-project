"use strict";

export class Port {
  #lengthToShips;

  constructor(ships) {
    this.#lengthToShips = new Map();
    for (const ship of ships) {
      if (!this.hasShip(ship.getLength())) {
        this.#lengthToShips.set(ship.getLength(), []);
      }

      this.#lengthToShips.get(ship.getLength()).push(ship);
    }
  }

  hasShip(length) {
    return this.#lengthToShips.has(length);
  }

  popShip(length) {
    if (!this.hasShip(length)) {
      return null;
    }

    const ship = this.#lengthToShips.get(length).pop();

    if (this.#lengthToShips.get(length).length === 0) {
      this.#lengthToShips.delete(length);
    }

    return ship;
  }
}
