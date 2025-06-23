"use strict";

export class Port {
  #lengthToShip;

  constructor(ships) {
    this.#lengthToShip = new Map();
    ships.forEach((ship) => {
      if (!this.#lengthToShip.has(ship.length)) {
        this.#lengthToShip.set(ship.length, []);
      }
      this.#lengthToShip.get(ship.length).push(ship);
    });
  }

  hasShip(length) {
    return this.#lengthToShip.has(length);
  }

  getShip(length) {
    if (!this.hasShip(length)) {
      return null;
    }

    const ship = this.#lengthToShip.get(length).pop();

    // if the list is now empty, remove the key
    if (this.#lengthToShip.get(length).length === 0) {
      this.#lengthToShip.delete(length);
    }

    return ship;
  }
}
