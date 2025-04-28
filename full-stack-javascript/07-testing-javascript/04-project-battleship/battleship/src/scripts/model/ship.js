"use strict";

export class Ship {
  #LOWER_LENGTH = 2;
  #UPPER_LENGTH = 5;

  #_length;

  constructor(length) {
    if (length < this.#LOWER_LENGTH || length > this.#UPPER_LENGTH) {
      throw new Error("length must be between 2 and 5, inclusive");
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
