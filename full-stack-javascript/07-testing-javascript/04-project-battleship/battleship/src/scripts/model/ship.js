"use strict";

import { MIN_SHIP_LENGTH, MAX_SHIP_LENGTH } from "../constants";

export class Ship {
  #_length;

  constructor(length) {
    if (length < MIN_SHIP_LENGTH || length > MAX_SHIP_LENGTH) {
      throw new Error(
        `length must be between ${MIN_SHIP_LENGTH} and ${MAX_SHIP_LENGTH}, inclusive`
      );
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
      return false;
    }

    this.health--;

    return true;
  }
}
