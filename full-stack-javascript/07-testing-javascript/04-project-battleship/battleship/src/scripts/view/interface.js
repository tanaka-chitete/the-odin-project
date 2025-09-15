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

        seaElementElement.setAttribute(
          "class",
          "sea__element sea__element_type_unknown-element"
        );
        seaElementElement.removeAttribute("data-id");

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
    } else if (
      state === STATE.ENGAGEMENT ||
      state === STATE.ASSESSMENT ||
      state === STATE.SETTLEMENT
    ) {
      this.#updateSeaElementForEngagement(sea);
    }
  }

  #updateConsoleElement(state = null) {
    if (this.#consoleElement === null) {
      this.#initialiseConsoleElement();
    }

    if (state === STATE.DEPLOYMENT) {
      this.#updateConsoleElementForDeployment();
    } else if (state === STATE.ENGAGEMENT) {
      this.#updateConsoleElementForEngagement();
    } else if (state === STATE.ASSESSMENT) {
      this.#updateConsoleElementForAssessment();
    } else if (state === STATE.SETTLEMENT) {
      this.#updateConsoleElementForSettlement();
    }
  }

  #updateConsoleElementForDeployment() {
    const currentPanelElement = document.querySelector(
      ".console__panel_visible"
    );
    if (currentPanelElement !== null) {
      currentPanelElement.classList.remove("console__panel_visible");
    }

    const deploymentPanelElement = document.querySelector(
      ".console__panel_type_deployment"
    );
    deploymentPanelElement.classList.add("console__panel_visible");
  }

  // TODO: Refactor to use console__panel_active class
  #updateConsoleElementForEngagement() {
    const currentPanelElement = document.querySelector(
      ".console__panel_visible"
    );
    if (currentPanelElement !== null) {
      currentPanelElement.classList.remove("console__panel_visible");
    }

    const engagementPanelElement = document.querySelector(
      ".console__panel_type_engagement"
    );
    engagementPanelElement.classList.add("console__panel_visible");
  }

  #updateConsoleElementForAssessment() {
    const currentPanelElement = document.querySelector(
      ".console__panel_visible"
    );
    if (currentPanelElement !== null) {
      currentPanelElement.classList.remove("console__panel_visible");
    }

    const assessmentPanelElement = document.querySelector(
      ".console__panel_type_assessment"
    );
    assessmentPanelElement.classList.add("console__panel_visible");
  }

  #updateConsoleElementForSettlement() {
    const currentPanelElement = document.querySelector(
      ".console__panel_visible"
    );
    if (currentPanelElement !== null) {
      currentPanelElement.classList.remove("console__panel_visible");
    }

    const settlementPanelElement = document.querySelector(
      ".console__panel_type_settlement"
    );
    settlementPanelElement.classList.add("console__panel_visible");
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
      } else if (
        newlySelectedElement.classList.contains(
          "sea__element_type_unknown-element"
        )
      ) {
        newlySelectedElement.classList.add("selected");
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

      const shipElementLength = +shipElement.getAttribute("data-ship_length");
      const shipElementMouseX =
        +event.dataTransfer.getData("shipElementMouseX");
      const shipElementMouseY =
        +event.dataTransfer.getData("shipElementMouseY");

      const cellElementBoundingBox =
        this.#seaElement.rows[0].cells[0].getBoundingClientRect();
      const seaElementIndexX =
        Math.floor(seaElementMouseX / cellElementBoundingBox.width) -
        Math.floor(shipElementMouseX / cellElementBoundingBox.width);
      const seaElementIndexY =
        Math.floor(seaElementMouseY / cellElementBoundingBox.height) -
        Math.floor(shipElementMouseY / cellElementBoundingBox.height);

      this.#operation.deployShip(
        new Ship(shipElementLength),
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

    const rotateShipButton = this.#consoleElement.querySelector(
      ".console__button_type_rotate-ship"
    );
    rotateShipButton.addEventListener("click", (event) => {
      event.preventDefault();

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
      this.#operation.rotateShip(seaElementIndexX, seaElementIndexY);

      const report = this.#operation.issueReport();
      this.#updatePortElement(report.port);
      this.#updateSeaElement(report.sea, report.state);
    });

    const endDeploymentButton = this.#consoleElement.querySelector(
      ".console__button_type_end-deployment"
    );
    endDeploymentButton.addEventListener("click", (event) => {
      event.preventDefault();

      this.#operation.endDeployment();

      const report = this.#operation.issueReport();
      this.#updateMessageElement(report.message);
      this.#updatePortElement(report.port);
      this.#updateSeaElement(report.sea, report.state);
      this.#updateConsoleElement(report.state);
    });

    const engageMissileButton = this.#consoleElement.querySelector(
      ".console__button_type_engage-missile"
    );
    engageMissileButton.addEventListener("click", (event) => {
      event.preventDefault();

      const previouslySelectedElement = document.querySelector(".selected");

      if (
        previouslySelectedElement === null ||
        !previouslySelectedElement.classList.contains(
          "sea__element_type_unknown-element"
        )
      ) {
        return;
      }

      const seaElementIndexX =
        +previouslySelectedElement.getAttribute("data-x");
      const seaElementIndexY =
        +previouslySelectedElement.getAttribute("data-y");
      this.#operation.engageMissile(
        new Missile(),
        seaElementIndexX,
        seaElementIndexY
      );

      const report = this.#operation.issueReport();
      this.#updateMessageElement(report.message);
      this.#updateSeaElement(report.sea, report.state);
      this.#updateConsoleElement(report.state);
    });

    const endAssessmentButton = this.#consoleElement.querySelector(
      ".console__button_type_end-assessment"
    );
    endAssessmentButton.addEventListener("click", (event) => {
      event.preventDefault();

      this.#operation.endAssessment();

      const report = this.#operation.issueReport();
      this.#updateMessageElement(report.message);
      this.#updateSeaElement(report.sea, report.state);
      this.#updateConsoleElement(report.state);
    });

    const endSettlementButton = this.#consoleElement.querySelector(
      ".console__button_type_end-settlement"
    );
    endSettlementButton.addEventListener("click", (event) => {
      event.preventDefault();

      this.#operation.endSettlement();

      const report = this.#operation.issueReport();
      this.#updateMessageElement(report.message);
      this.#updateSeaElement(report.sea, report.state);
      this.#updateConsoleElement(report.state);
    });
  }
}
