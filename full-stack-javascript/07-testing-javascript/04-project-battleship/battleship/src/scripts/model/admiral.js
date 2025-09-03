"use strict";

import { Sea } from "./sea";

export class Admiral {
  #name;
  #sea;

  constructor(name) {
    this.#name = name;
    this.#sea = new Sea();
  }

  issueReport() {
    return {
      name: this.#name,
      sea: this.#sea.getMap(),
    };
  }

  deployShip(ship, x, y) {
    this.#sea.deployShip(ship, x, y);
  }

  rotateShip(x, y) {
    this.#sea.rotateShip(x, y);
  }

  recallShip(x, y) {
    this.#sea.recallShip(x, y);
  }

  hasDeployedAllShips() {
    return this.#sea.hasReceivedAllShips();
  }

  receiveMissile(missile, x, y) {
    this.#sea.receiveMissile(missile, x, y);
  }

  hasLostAllShips() {
    return this.#sea.hasLostAllShips();
  }
}
