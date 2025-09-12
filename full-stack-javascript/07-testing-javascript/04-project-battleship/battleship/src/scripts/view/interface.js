"use strict";

import { Missile } from "../model/missile";
import { Ship } from "../model/ship";
import { STATE } from "../controller/operation";

export class Interface {
  #operation;

  #messageElement = null;
  #portElement = null;
  #seaElement = null;
  #consoleElement = null;

  constructor(operation) {
    this.#operation = operation;

    this.#updateConsoleElement();
  }

  #updateMessageElement(message) {
    if (message === null) {
      return;
    }

    if (this.#messageElement === null) {
      this.#initialiseMessageElement();
    }

    this.#messageElement.textContent = message;
  }

  #updatePortElement(port) {
    if (port === null) {
      return;
    }

    if (this.#portElement === null) {
      this.#initialisePortElement();
    }

    this.#portElement.replaceChildren();

    for (const [length, allocation] of Object.entries(port)) {
      for (let i = 0; i < allocation; i++) {
        const shipElement = document.createElement("div");
        shipElement.setAttribute("id", `port__ship_id_${crypto.randomUUID()}`);
        shipElement.setAttribute(
          "class",
          `port__ship port__ship_length_${length}`
        );
        shipElement.setAttribute("draggable", "true");
        shipElement.setAttribute("data-ship_length", length);

        this.#portElement.append(shipElement);

        shipElement.addEventListener("dragstart", (event) => {
          event.dataTransfer.effectAllowed = "move";

          const viewportMouseX = event.clientX;
          const viewportMouseY = event.clientY;
          const shipElementBoundingBox = shipElement.getBoundingClientRect();
          const shipElementMouseX = viewportMouseX - shipElementBoundingBox.x;
          const shipElementMouseY = viewportMouseY - shipElementBoundingBox.y;

          event.dataTransfer.setData("id", shipElement.getAttribute("id"));
          event.dataTransfer.setData("shipElementMouseX", shipElementMouseX);
          event.dataTransfer.setData("shipElementMouseY", shipElementMouseY);
        });
      }
    }
  }

  #updateSeaElementForDeployment(sea) {
    const idToObject = new Map();

    for (let i = 0; i < sea.length; i++) {
      for (let j = 0; j < sea.length; j++) {
        const seaElementElement = this.#seaElement.querySelector(
          `[data-x="${j}"][data-y="${i}"]`
        );

        seaElementElement.setAttribute("class", "sea__element");
        seaElementElement.removeAttribute("data-id");

        if (sea[i][j]) {
          // Associating segments with the same ship object makes it easier to select the ship when the user clicks it
          if (!idToObject.has(sea[i][j])) {
            idToObject.set(sea[i][j], `sea__element_id_${crypto.randomUUID()}`);
          }

          seaElementElement.setAttribute(
            "class",
            "sea__element sea__element_type_ship"
          );
          seaElementElement.setAttribute("data-id", idToObject.get(sea[i][j]));
        } else {
          seaElementElement.setAttribute("class", "sea__element");
        }
      }
    }
  }

  #updateSeaElementForEngagement(sea) {
    for (let i = 0; i < sea.length; i++) {
      for (let j = 0; j < sea[i].length; j++) {
        const seaElementElement = this.#seaElement.querySelector(
          `[data-x="${j}"][data-y="${i}"]`
        );

        if (!(sea[i][j] instanceof Missile)) {
          continue;
        }

        const missile = sea[i][j];
        if (missile.hasDetonated()) {
          seaElementElement.setAttribute(
            "class",
            "sea__element sea__element_type_detonated-missile"
          );
        } else {
          seaElementElement.setAttribute(
            "class",
            "sea__element sea__element_type_undetonated-missile"
          );
        }
      }
    }
  }

  #updateSeaElement(sea, state) {
    if (sea === null) {
      return;
    }

    if (this.#seaElement === null) {
      this.#initialiseSeaElement();
    }

    if (state === STATE.DEPLOYMENT) {
      this.#updateSeaElementForDeployment(sea);
    } else {
      this.#updateSeaElementForEngagement(sea);
    }
  }

  #updateConsoleElement(state = null) {
    if (this.#consoleElement === null) {
      this.#initialiseConsoleElement();
    }

    if (state === STATE.DEPLOYMENT) {
      this.#updateConsoleElementForDeployment();
    }
  }

  #updateConsoleElementForDeployment() {
    const enlistmentPanelElement = document.querySelector(
      ".console__panel_type_enlistment"
    );
    enlistmentPanelElement.classList.add("hidden");

    const deploymentPanelElement = document.querySelector(
      ".console__panel_type_deployment"
    );
    deploymentPanelElement.classList.remove("hidden");
  }

  #initialiseMessageElement() {
    this.#messageElement = document.querySelector(".message");
  }

  #initialisePortElement() {
    this.#portElement = document.querySelector(".port");
  }

  #initialiseSeaElement() {
    this.#seaElement = document.querySelector(".sea");

    this.#seaElement.addEventListener("click", (event) => {
      // The user may have clicked a ship. A ship is represented with multiple segments.
      const previouslySelectedElements = document.querySelectorAll(".selected");
      for (const previouslySelectedElement of previouslySelectedElements) {
        previouslySelectedElement.classList.remove("selected");
      }

      const newlySelectedElement = event.target;

      if (newlySelectedElement.classList.contains("sea__element_type_ship")) {
        const shipSegmentElements = document.querySelectorAll(
          `[data-id=${newlySelectedElement.getAttribute("data-id")}]`
        );

        for (const shipSegmentElement of shipSegmentElements) {
          shipSegmentElement.classList.add("selected");
        }
      }
    });

    this.#seaElement.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });

    this.#seaElement.addEventListener("drop", (event) => {
      event.preventDefault();

      const viewportMouseX = event.clientX;
      const viewportMouseY = event.clientY;
      const seaElementBoundingBox = this.#seaElement.getBoundingClientRect();
      const seaElementMouseX = viewportMouseX - seaElementBoundingBox.x;
      const seaElementMouseY = viewportMouseY - seaElementBoundingBox.y;

      const shipElementId = event.dataTransfer.getData("id");
      const shipElement = document.querySelector(`#${shipElementId}`);

      const cellElementBoundingBox =
        this.#seaElement.rows[0].cells[0].getBoundingClientRect();
      const seaElementIndexX = Math.floor(
        seaElementMouseX / cellElementBoundingBox.width
      );
      const seaElementIndexY = Math.floor(
        seaElementMouseY / cellElementBoundingBox.height
      );

      this.#operation.deployShip(
        new Ship(+shipElement.getAttribute("data-ship_length")),
        seaElementIndexX,
        seaElementIndexY
      );

      const report = this.#operation.issueReport();
      this.#updatePortElement(report.port);
      this.#updateSeaElement(report.sea, report.state);
    });
  }

  #initialiseConsoleElement() {
    this.#consoleElement = document.querySelector(".console");

    const startDeploymentButton = this.#consoleElement.querySelector(
      ".console__button_type_start-deployment"
    );
    startDeploymentButton.addEventListener("click", () => {
      this.#operation.startDeployment();

      const report = this.#operation.issueReport();
      this.#updateMessageElement(report.message);
      this.#updatePortElement(report.port);
      this.#updateSeaElement(report.sea, report.state);
      this.#updateConsoleElement(report.state);
    });

    const recallShipButton = this.#consoleElement.querySelector(
      ".console__button_type_recall-ship"
    );
    recallShipButton.addEventListener("click", (event) => {
      event.preventDefault();

      // The user may have clicked a ship. A ship is represented with multiple segments.
      const previouslySelectedElements = document.querySelectorAll(".selected");

      if (previouslySelectedElements.length === 0) {
        return;
      }

      previouslySelectedElements.forEach((previouslySelectedElement) => {
        if (
          !previouslySelectedElement.classList.contains(
            "sea__element_type_ship"
          )
        ) {
          return;
        }
      });

      const seaElementIndexX =
        +previouslySelectedElements[0].getAttribute("data-x");
      const seaElementIndexY =
        +previouslySelectedElements[0].getAttribute("data-y");
      this.#operation.recallShip(seaElementIndexX, seaElementIndexY);

      const report = this.#operation.issueReport();
      this.#updatePortElement(report.port);
      this.#updateSeaElement(report.sea, report.state);
    });
  }
}
