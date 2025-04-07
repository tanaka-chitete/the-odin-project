"use strict";

export class Coordinate {
  #_x;
  #_y;

  constructor(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("coordinate must be an integer");
    }

    this.#_x = x;
    this.#_y = y;
  }

  get x() {
    return this.#_x;
  }

  get y() {
    return this.#_y;
  }
}
