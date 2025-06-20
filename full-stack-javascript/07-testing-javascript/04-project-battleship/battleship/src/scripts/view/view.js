"use strict";

import { MISSILE_HIT, MISSILE_MISS } from "../constants";

export class View {
  #messageView;
  #allocationView;
  #boardView;

  #welcomeControls;
  #preparationControls;
  #battleControls;

  constructor() {
    this.#messageView = this.#initialiseMessageView();
    this.#boardView = this.#initialiseBoardView();
    this.#welcomeControls = this.#initialiseWelcomeControls();
  }

  #initialiseMessageView() {
    const messageView = document.createElement("h3");
    messageView.setAttribute("class", "message");

    document.querySelector("header").append(messageView);

    return document.querySelector(".message");
  }

  #initialiseAllocationView() {
    const initialiseForm = () => {
      const allocationView = document.createElement("div");
      allocationView.setAttribute("class", "allocation");

      for (let i = 5; i >= 1; i--) {
        const ship = document.createElement("div");
        ship.setAttribute("id", `allocation__ship_class_${i}`);
        ship.setAttribute(
          "class",
          `allocation__ship allocation__ship_class_${i}`
        );
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-class", i);

        const quantity = document.createElement("span");
        quantity.setAttribute(
          "class",
          `allocation__quantity allocation__quantity_class_${i}`
        );

        allocationView.append(ship);
        allocationView.append(quantity);
      }

      const left = document.querySelector(".left");
      left.append(allocationView);

      return document.querySelector(".allocation");
    };

    const initialiseFunction = (allocationView) => {
      allocationView.querySelectorAll(".allocation__ship").forEach((ship) => {
        ship.addEventListener("dragstart", (event) => {
          event.dataTransfer.effectAllowed = "copy";

          const mouseXRelativeToViewport = event.clientX;
          const mouseYRelativeToViewport = event.clientY;
          const shipBoundingBox = ship.getBoundingClientRect();
          const mouseXRelativeToShip =
            mouseXRelativeToViewport - shipBoundingBox.x;
          const mouseYRelativeToShip =
            mouseYRelativeToViewport - shipBoundingBox.y;

          event.dataTransfer.setData("id", ship.getAttribute("id"));
          event.dataTransfer.setData(
            "mouseXRelativeToShip",
            mouseXRelativeToShip
          );
          event.dataTransfer.setData(
            "mouseYRelativeToShip",
            mouseYRelativeToShip
          );
        });
      });

      return allocationView;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyAllocationView() {
    this.#allocationView.remove();
    this.#allocationView = null;
  }

  #initialiseBoardView() {
    const initialiseForm = () => {
      const boardView = document.createElement("table");
      boardView.setAttribute("class", "board");

      for (let i = 0; i < 10; i++) {
        const row = document.createElement("tr");
        row.setAttribute("class", "board__row");

        for (let j = 0; j < 10; j++) {
          const cell = document.createElement("td");
          cell.setAttribute("class", "board__cell");
          cell.setAttribute("data-x", j);
          cell.setAttribute("data-y", i);

          row.append(cell);
        }

        boardView.append(row);
      }

      document.querySelector(".middle").append(boardView);

      return document.querySelector(".board");
    };

    const initialiseFunction = (boardView) => {
      boardView.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      });

      boardView.addEventListener("drop", (event) => {
        event.preventDefault();

        const mouseXRelativeToViewport = event.clientX;
        const mouseYRelativeToViewport = event.clientY;
        const boardBoundingBox = boardView.getBoundingClientRect();
        const mouseXRelativeToBoard =
          mouseXRelativeToViewport - boardBoundingBox.x;
        const mouseYRelativeToBoard =
          mouseYRelativeToViewport - boardBoundingBox.y;

        const id = event.dataTransfer.getData("id");
        const ship = document.querySelector(`#${id}`);

        const cellBoundingBox =
          boardView.rows[0].cells[0].getBoundingClientRect();
        const x1 = Math.floor(mouseXRelativeToBoard / cellBoundingBox.width);
        const y1 = Math.floor(mouseYRelativeToBoard / cellBoundingBox.height);
        const x2 = x1 + +ship.getAttribute("data-class") - 1;
        const y2 = y1;

        this.onPlaceShip(x1, y1, x2, y2);
      });

      return boardView;
    };

    return initialiseFunction(initialiseForm());
  }

  #extendBoardView() {
    for (const row of this.#boardView.rows) {
      for (const cell of row.cells) {
        cell.setAttribute("class", "board__cell board__cell_clickable");
        cell.addEventListener("click", () => {
          const currentTaggedCell = document.querySelector(
            "#board__cell_type_tagged"
          );
          if (currentTaggedCell) {
            currentTaggedCell.setAttribute("id", "");
          }

          cell.setAttribute("id", "board__cell_type_tagged");
        });
      }
    }
  }

  #initialiseWelcomeControls() {
    const initialiseForm = () => {
      const welcomeControls = document.createElement("div");
      welcomeControls.setAttribute("class", "controls controls_type_welcome");

      const startGameButton = document.createElement("button");
      startGameButton.setAttribute("class", "controls__button_type_start-game");
      startGameButton.textContent = "Start";

      welcomeControls.append(startGameButton);

      const middle = document.querySelector(".middle");
      middle.append(welcomeControls);

      return document.querySelector(".controls_type_welcome");
    };

    const initialiseFunction = (welcomeControls) => {
      const startGameButton = welcomeControls.querySelector(
        ".controls__button_type_start-game"
      );
      startGameButton.addEventListener("click", () => this.onStartDeployment());

      return welcomeControls;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyStartControls() {
    this.#welcomeControls.remove();
    this.#welcomeControls = null;
  }

  #initialisePreparationControls() {
    const initialiseForm = () => {
      const preparationControls = document.createElement("div");
      preparationControls.setAttribute(
        "class",
        "controls controls_type_preparation"
      );

      const clearShipsButton = document.createElement("button");
      clearShipsButton.setAttribute(
        "class",
        "controls__button_type_clear-ships"
      );
      clearShipsButton.textContent = "Clear";

      const rotateShipButton = document.createElement("button");
      rotateShipButton.setAttribute(
        "class",
        "controls__button_type_rotate-ship"
      );
      rotateShipButton.textContent = "Rotate";

      const endPreparationButton = document.createElement("button");
      endPreparationButton.setAttribute(
        "class",
        "controls__button_type_end-preparation"
      );
      endPreparationButton.textContent = "Submit";

      preparationControls.append(clearShipsButton);
      preparationControls.append(rotateShipButton);
      preparationControls.append(endPreparationButton);

      const middle = document.querySelector(".middle");
      middle.append(preparationControls);

      return document.querySelector(".controls_type_preparation");
    };

    const initialiseFunction = (preparationControls) => {
      const endPreparationButton = preparationControls.querySelector(
        ".controls__button_type_end-preparation"
      );
      endPreparationButton.addEventListener("click", () =>
        this.onEndPreparation()
      );

      return preparationControls;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyPreparationControls() {
    this.#preparationControls.remove();
    this.#preparationControls = null;
  }

  #initialiseBattleControls() {
    const initialiseForm = () => {
      const battleControls = document.createElement("div");
      battleControls.setAttribute("class", "controls controls_type_battle");

      const launchMissileButton = document.createElement("button");
      launchMissileButton.setAttribute(
        "class",
        "controls__button_type_launch-missile"
      );
      launchMissileButton.textContent = "Launch";

      battleControls.append(launchMissileButton);

      const middle = document.querySelector(".middle");
      middle.append(battleControls);

      return document.querySelector(".controls_type_battle");
    };

    const initialiseFunction = (battleControls) => {
      const launchMissileButton = battleControls.querySelector(
        ".controls__button_type_launch-missile"
      );
      launchMissileButton.addEventListener("click", () => {
        const taggedCell = document.querySelector("#board__cell_type_tagged");
        taggedCell.setAttribute("id", "");
        const x = +taggedCell.getAttribute("data-x");
        const y = +taggedCell.getAttribute("data-y");
        this.onLaunchMissile(x, y);
      });
    };

    return initialiseFunction(initialiseForm());
  }

  handlePreparationStarted(response) {
    this.#destroyStartControls();

    this.#allocationView = this.#initialiseAllocationView();
    this.#preparationControls = this.#initialisePreparationControls();

    this.#updateMessageView(response.message);
    this.#updateAllocationView(response.data.allocation);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handleShipPlaced(response) {
    this.#updateMessageView(response.message);
    this.#updateAllocationView(response.data.allocation);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handlePreparationEnded(response) {
    this.#updateMessageView(response.message);
    this.#updateAllocationView(response.data.allocation);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handleBattleStarted(response) {
    this.#destroyAllocationView();
    this.#destroyPreparationControls();

    this.#extendBoardView();

    this.#updateMessageView(response.message);
    this.#battleControls = this.#initialiseBattleControls();
    this.#updateBoardViewForBattle(response.data.board);
  }

  handleMissileLaunched(response) {
    this.#updateMessageView(response.message);
    this.#updateBoardViewForBattle(response.data.board);
  }

  #updateMessageView(message) {
    this.#messageView.textContent = message;
  }

  #updateAllocationView(allocation) {
    for (const [length, quantity] of Object.entries(allocation)) {
      const quantityElement = this.#allocationView.querySelector(
        `.allocation__quantity_class_${length}`
      );
      quantityElement.textContent = quantity;
    }
  }

  #updateBoardViewForPlacement(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = this.#boardView.querySelector(
          `[data-x="${j}"][data-y="${i}"]`
        );

        if (board[i][j]) {
          cell.setAttribute("class", "board__cell board__cell_type_ship");
        } else {
          cell.setAttribute("class", "board__cell");
        }
      }
    }
  }

  #updateBoardViewForBattle(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = this.#boardView.querySelector(
          `[data-x="${j}"][data-y="${i}"]`
        );

        switch (board[i][j]) {
          case MISSILE_HIT:
            cell.setAttribute(
              "class",
              "board__cell board__cell_type_missile-hit"
            );
            break;
          case MISSILE_MISS:
            cell.setAttribute(
              "class",
              "board__cell board__cell_type_missile-miss"
            );
            break;
          default:
            cell.setAttribute("class", "board__cell board__cell_type_unknown");
        }
      }
    }
  }

  bindToOnStartPreparation(callback) {
    this.onStartDeployment = callback;
  }

  bindToOnPlaceShip(callback) {
    this.onPlaceShip = callback;
  }

  bindToOnEndPreparation(callback) {
    this.onEndPreparation = callback;
  }

  bindToOnLaunchMissile(callback) {
    this.onLaunchMissile = callback;
  }
}
