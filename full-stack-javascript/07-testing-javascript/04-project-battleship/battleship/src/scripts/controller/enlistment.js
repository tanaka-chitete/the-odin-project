"use strict";

export class Enlistment {
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

  deployShip(shipClass, x, y) {}

  rotateShip(x, y) {}

  withdrawShip(x, y) {}

  endDeployment() {}

  engageMissile(x, y) {}

  endEngagement() {}
}
