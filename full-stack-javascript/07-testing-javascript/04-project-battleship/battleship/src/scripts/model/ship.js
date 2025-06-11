"use strict";

export class Ship {
  #_length;

  constructor(length) {
    if (length < 1 || length > 5) {
      throw new Error(`length must be between 1 and 5, inclusive`);
    }

    this.#_length = length;
    this.health = this.#_length;
  }

  get length() {
    return this.#_length;
  }

  isSunk() {
    return this.health === 0;
  }

  hit() {
    if (this.isSunk()) {
      return 0;
    }

    return --this.health;
  }
}
