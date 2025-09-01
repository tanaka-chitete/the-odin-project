"use strict";

// TODO: Instantiate Ship instances here. In Interface.deployShip(x, y) -> Operation.deployShip(ship, x, y)
export class Interface {
  #operation;

  #messageElement;
  #consoleElement;

  constructor(operation) {
    this.#operation;

    this.#messageElement = document.querySelector(".message");
    this.#consoleElement = document.querySelector(".console");

    const startDeployment = this.#consoleElement.querySelector(
      ".console__button_type_start-deployment"
    );
    startDeployment.addEventListener("click", () => {
      operation.startDeployment();
      this.#renderReport(operation.getReport());
    });
  }

  #renderReport(report) {
    this.#renderMessage(report.getMessage());
    this.#renderPort(report.getPort());
    this.#renderSea(report.getSea());
  }

  #renderMessage(message) {
    this.#messageElement.textContent = message;
  }

  #renderPort(port) {}

  #renderSea(sea) {}
}
