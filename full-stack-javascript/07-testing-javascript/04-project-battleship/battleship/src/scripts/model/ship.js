"use strict";

// TODO: Remove length variable. It's unused
export class Ship {
  #length;
  #integrity;

  constructor(length) {
    if (length < 2 || length > 5) {
      throw new Error("Length must be inside limits");
    }

    this.#length = length;
    this.#integrity = length;
  }

  getLength() {
    return this.#length;
  }
}
