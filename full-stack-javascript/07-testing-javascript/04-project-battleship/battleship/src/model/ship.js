"use strict";

export class Ship {
  #LENGTH_OF_SMALLEST_SHIP = 2;
  #LENGTH_OF_BIGGEST_SHIP = 5;

  #_length;

  constructor(length) {
    if (
      length < this.#LENGTH_OF_SMALLEST_SHIP ||
      length > this.#LENGTH_OF_BIGGEST_SHIP
    ) {
      throw new Error("length must be between 2 and 5, inclusive");
    }

    this.#_length = length;
    this.hits = 0;
  }

  get length() {
    return this.#_length;
  }

  isSunk() {
    return this.hits === this.length;
  }

  hit() {
    if (this.isSunk()) {
      throw new Error("ship has already been sunk");
    }

    return ++this.hits;
  }
}
