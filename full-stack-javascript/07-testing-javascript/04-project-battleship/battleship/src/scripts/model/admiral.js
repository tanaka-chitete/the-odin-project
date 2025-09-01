"use strict";

import { Sea } from "./sea";

// TODO: Place Port, Sea, Ship, and Missile classes in here
// TODO: Delete tests associated with aforementioned
// TODO: Add method to check if coordinates are in-bounds
export class Admiral {
  #name;
  #sea;

  constructor(name) {
    this.#name = name;
    this.#sea = new Sea();
  }

  deployShip(ship, x, y) {
    this.#sea.receiveShip(ship, x, y);
  }

  rotateShip(x, y) {
    this.#sea.rotateShip(x, y);
  }

  getName() {
    return this.#name;
  }

  getElement(x, y) {
    return this.#sea.getElement(x, y);
  }

  // TODO: Implement createReport()
}
