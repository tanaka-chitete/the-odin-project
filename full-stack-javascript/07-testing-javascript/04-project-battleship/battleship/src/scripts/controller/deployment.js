"use strict";

export class Deployment {
  #operation;

  constructor(operation) {
    this.#operation = operation;
  }

  startDeployment() {
    const report = {
      message: `Position your ships, ${this.#operation
        .getAdmiral1()
        .getName()}`,
      port: this.#operation.getAdmiral1().getPort(),
      sea: this.#operation.getAdmiral1().getSea(),
    };
    this.#operation.setReport(report);

    const newState = new Deployment(this.#operation);
    this.#operation.changeState(newState);

    this.#operation.switchAdmiral();
  }

  deployShip(shipClass, x, y) {
    if (!this.#attacker.canPlaceShip(shipClass, x, y)) {
      return;
    }

    this.#attacker.deployShip(shipClass, x, y);
  }

  rotateShip(x, y) {
    if (!this.#attacker.canRotateShip(x, y)) {
      return;
    }

    this.#attacker.rotateShip(x, y);
  }

  withdrawShip(x, y) {
    if (!this.#attacker.canRemoveShip(x, y)) {
      return;
    }

    this.#attacker.withdrawShip(x, y);
  }

  endPreparation() {
    if (!this.#attacker.hasPlacedShips()) {
      return;
    }

    if (this.#attacker === admiral1) {
      this.#message = `Place your ships, ${this.#defender.getName()}`;
    } else {
      this.#message = `Launch a missile, ${this.#defender.getName()}`;
    }

    [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
  }

  engageMissile(x, y) {
    if (this.#defender.hasLostShips()) {
      return;
    }

    if (!this.#attacker.canLaunchMissile(this.#defender, x, y)) {
      return;
    }

    this.#attacker.engageMissile(this.#defender, x, y);

    this.#missileLaunched = true;

    if (this.#defender.hasDetonatedMissile(x, y)) {
      if (this.#defender.hasLostShips()) {
        this.#message = `You win, ${this.#attacker.getName()}`;
      } else {
        this.#message = `Successful missile, ${this.#attacker.getName()}`;
      }
    } else {
      this.#message = `Unsuccessful missile, ${this.#attacker.getName()}`;
    }
  }

  endSkirmish() {
    if (!this.#missileLaunched) {
      return;
    }

    this.#missileLaunched = false;

    this.#message = `Launch a missile, ${this.#defender.getName()}`;

    [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
  }
}
