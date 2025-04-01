"use strict";

export class Coordinates {
  #_startX;
  #_startY;
  #_endX;
  #_endY;

  constructor(startX, startY, endX, endY) {
    if (
      !Number.isInteger(startX) ||
      !Number.isInteger(startY) ||
      !Number.isInteger(endX) ||
      !Number.isInteger(endY)
    ) {
      throw new Error("coordinate must be an integer");
    }

    this.#_startX = startX;
    this.#_startY = startY;
    this.#_endX = endX;
    this.#_endY = endY;
  }

  get startX() {
    return this.#_startX;
  }

  get startY() {
    return this.#_startY;
  }

  get endX() {
    return this.#_endX;
  }

  get endY() {
    return this.#_endY;
  }
}
