"use strict";

export class Ship {
  #length;

  constructor(length) {
    if (length < 2 || length > 5) {
      throw new Error("Length must be inside limits");
    }

    this.#length = length;
  }

  getLength() {
    return this.#length;
  }
}
