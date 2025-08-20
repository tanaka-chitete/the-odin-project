"use strict";

export class Controller {
  #attacker;
  #defender;
  #message;
  #engagementEnded;

  constructor(admiral1, admiral2) {
    this.#attacker = admiral1;
    this.#defender = admiral2;
  }

  startGame() {
    this.#message = `Place your ships, ${this.#attacker.getName()}`;
  }

  placeShip(shipClass, x, y) {
    if (!this.#attacker.canPlaceShip(shipClass, x, y)) {
      return;
    }

    this.#attacker.placeShip(shipClass, x, y);
  }

  rotateShip(x, y) {
    if (!this.#attacker.canRotateShip(x, y)) {
      return;
    }

    this.#attacker.rotateShip(x, y);
  }

  removeShip(x, y) {
    if (!this.#attacker.canRemoveShip(x, y)) {
      return;
    }

    this.#attacker.removeShip(x, y);
  }

  endPlacement() {
    if (!this.#attacker.hasPlacedShips()) {
      return;
    }

    if (this.#attacker === admiral1) {
      this.#message = `Place your ships, ${this.#defender.getName()}`;
    } else {
      this.#message = `Launch a missile, ${this.#defender.getName()}`;
    }
  }

  launchMissile(x, y) {
    if (this.#defender.hasLostShips()) {
      return;
    }

    if (!this.#attacker.canLaunchMissile(this.#defender, x, y)) {
      return;
    }

    this.#attacker.launchMissile(this.#defender, x, y);
    this.#engagementEnded = true;

    if (this.#defender.hasReceivedMissile(x, y)) {
      if (this.#defender.hasLostShips()) {
        this.#message = `You win, ${this.#attacker.getName()}`;
      } else {
        this.#message = `Successful missile, ${this.#attacker.getName()}`;
      }
    } else {
      this.#message = `Unsuccessful missile, ${this.#attacker.getName()}`;
    }
  }

  endDebrief() {
    if (!this.#engagementEnded) {
      return;
    }

    this.#message = `Launch a missile, ${this.#defender.getName()}`;
    [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
  }
}
