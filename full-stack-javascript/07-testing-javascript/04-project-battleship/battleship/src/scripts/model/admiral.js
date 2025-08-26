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

  canDeployShip(shipClass, x, y) {
    if (!this.getPort().canWithdrawShip(shipClass)) {
      return false;
    }

    if (!this.getSea().canReceiveShip(shipClass, x, y)) {
      return false;
    }

    return true;
  }

  deployShip(shipClass, x, y) {
    if (!this.getPort().canWithdrawShip(shipClass)) {
      throw new Error(`Class must be within limits`);
    }

    if (!this.getSea().canReceiveShip(shipClass, x, y)) {
      throw new Error(`Path must be within limits`);
    }

    const ship = this.getPort().withdrawShip(shipClass);
    this.getSea().receiveShip(ship, x, y);
  }

  canRotateShip(x, y) {}

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
