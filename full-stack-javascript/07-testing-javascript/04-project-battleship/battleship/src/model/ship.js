"use strict";

export class Ship {
  #length;
  #integrity;

  constructor(length) {
    if (length < 1 || length > 5) {
      throw new Error("the length must be within limits");
    }

    this.#length = length;
    this.#integrity = length;
  }

  getLength() {
    return this.#length;
  }

  getIntegrity() {
    return this.#integrity;
  }

  receiveMissile() {
    if (!this.isAfloat()) {
      return;
    }

    --this.#integrity;
  }

  isAfloat() {
    return this.#integrity > 0;
  }
}
