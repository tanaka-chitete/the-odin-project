"use strict";

// TODO: Place Port, Sea, Ship, and Missile classes in here
// TODO: Delete tests associated with aforementioned
export class Admiral {
  #name;
  #port;
  #sea;

  constructor(name, port, sea) {
    this.#name = name;
    this.#port = port;
    this.#sea = sea;
  }

  canDeployShip(length, x, y) {
    if (!this.getPort().canWithdrawShip(length)) {
      return false;
    }

    if (!this.getSea().canReceiveShip(length, x, y)) {
      return false;
    }

    return true;
  }

  deployShip(length, x, y) {
    if (!this.getPort().canWithdrawShip(length)) {
      throw new Error(`Length must be inside limits`);
    }

    if (!this.getSea().canReceiveShip(length, x, y)) {
      throw new Error(`Path must be unobstructed`);
    }

    const ship = this.getPort().withdrawShip(length);
    this.getSea().receiveShip(ship, x, y);
  }

  canRotateShip(x, y) {
    if (!this.getSea().hasReceivedShip(x, y)) {
      return false;
    }

    if (!this.getSea().canRotateShip(x, y)) {
      return false;
    }

    return true;
  }

  getName() {
    return this.#name;
  }

  getPort() {
    return this.#port;
  }

  getSea() {
    return this.#sea;
  }
}
