"use strict";

import { HIT, MISS } from "../constants";

export class View {
  #messageView;
  #fleetView;
  #boardView;

  #startControls;
  #placementControls;

  constructor() {
    this.#messageView = this.#initialiseMessageView();
    this.#boardView = this.#initialiseBoardView();
    this.#startControls = this.#initialiseStartControls();
  }

  #initialiseMessageView() {
    const messageView = document.createElement("h3");
    messageView.setAttribute("class", "message");

    document.querySelector("header").append(messageView);

    return document.querySelector(".message");
  }

  #initialiseFleetView() {
    const initialiseForm = () => {
      const fleetView = document.createElement("div");
      fleetView.setAttribute("class", "fleet");

      for (let i = 5; i >= 1; i--) {
        const ship = document.createElement("div");
        ship.setAttribute("id", `class-${i}`);
        ship.setAttribute("class", `fleet__ship fleet__ship_class_${i}`);
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-class", i);
        fleetView.append(ship);

        const quantity = document.createElement("span");
        quantity.setAttribute(
          "class",
          `fleet__quantity fleet__quantity_class_${i}`
        );
        fleetView.append(quantity);
      }

      document.querySelector(".left").append(fleetView);

      return document.querySelector(".fleet");
    };

    const initialiseFunction = (fleetView) => {
      fleetView.querySelectorAll(".fleet__ship").forEach((ship) => {
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

      return fleetView;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyFleetView() {
    this.#fleetView.remove();
    this.#fleetView = null;
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
          cell.setAttribute("data-row", i);
          cell.setAttribute("data-column", j);

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

        const cellBoundingBox =
          boardView.rows[0].cells[0].getBoundingClientRect();
        const startRow = Math.floor(
          mouseYRelativeToBoard / cellBoundingBox.height
        );
        const startColumn = Math.floor(
          mouseXRelativeToBoard / cellBoundingBox.width
        );

        const id = event.dataTransfer.getData("id");
        const ship = document.querySelector(`#${id}`);
        const class_ = +ship.getAttribute("data-class");

        this.onPlaceShip(
          startColumn,
          startRow,
          startColumn + class_ - 1,
          startRow
        );
      });

      return boardView;
    };

    return initialiseFunction(initialiseForm());
  }

  #extendBoardView() {
    for (const rowElement of this.#boardView.rows) {
      for (const cellElement of rowElement.cells) {
        cellElement.setAttribute("class", "board__cell board__cell_clickable");
        cellElement.addEventListener("click", () => {
          const row = +cellElement.getAttribute("data-row");
          const column = +cellElement.getAttribute("data-column");
          console.log("row = " + row);
          console.log("column = " + column);

          this.onLaunchMissile(column, row);
        });
      }
    }
  }

  #initialiseStartControls() {
    const initialiseForm = () => {
      const startControls = document.createElement("div");
      startControls.setAttribute("class", "controls controls_type_start");

      const startButton = document.createElement("button");
      startButton.setAttribute("class", "controls__button_type_start");
      startButton.textContent = "Start";

      startControls.append(startButton);

      const middle = document.querySelector(".middle");
      middle.append(startControls);

      return document.querySelector(".controls_type_start");
    };

    const initialiseFunction = (startControls) => {
      const startButton = startControls.querySelector(
        ".controls__button_type_start"
      );
      startButton.addEventListener("click", () => this.onStartDeployment());

      return startControls;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyStartControls() {
    this.#startControls.remove();
    this.#startControls = null;
  }

  #initialisePlacementControls() {
    const initialiseForm = () => {
      const placementControls = document.createElement("div");
      placementControls.setAttribute(
        "class",
        "controls controls_type_placement"
      );

      const clearButton = document.createElement("button");
      clearButton.setAttribute("class", "controls__button_type_start");
      clearButton.textContent = "Clear";

      const rotateButton = document.createElement("button");
      rotateButton.setAttribute("class", "controls__button_type_rotate");
      rotateButton.textContent = "Rotate";

      const submitButton = document.createElement("button");
      submitButton.setAttribute("class", "controls__button_type_submit");
      submitButton.textContent = "Submit";

      placementControls.append(clearButton);
      placementControls.append(rotateButton);
      placementControls.append(submitButton);

      const middle = document.querySelector(".middle");
      middle.append(placementControls);

      return document.querySelector(".controls_type_placement");
    };

    const initialiseFunction = (placementControls) => {
      const submitButton = placementControls.querySelector(
        ".controls__button_type_submit"
      );
      submitButton.addEventListener("click", this.onSubmitBoard);

      return placementControls;
    };

    return initialiseFunction(initialiseForm());
  }

  #destroyPlacementControls() {
    this.#placementControls.remove();
    this.#placementControls = null;
  }

  handleShipPlacementStarted(response) {
    this.#destroyStartControls();

    this.#fleetView = this.#initialiseFleetView();
    this.#placementControls = this.#initialisePlacementControls();

    this.#updateMessageView(response.message);
    this.#updateFleetView(response.data.fleet);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handleShipPlaced(response) {
    this.#updateMessageView(response.message);
    this.#updateFleetView(response.data.fleet);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handleBoardSubmitted(response) {
    this.#updateMessageView(response.message);
    this.#updateFleetView(response.data.fleet);
    this.#updateBoardViewForPlacement(response.data.board);
  }

  handleBattleStarted(response) {
    this.#destroyFleetView();
    this.#destroyPlacementControls();

    this.#extendBoardView();

    this.#updateMessageView(response.message);
    this.#updateBoardViewForBattle(response.data.board);
  }

  handleMissileLaunched(response) {
    this.#updateMessageView(response.message);
    this.#updateBoardViewForBattle(response.data.board);
  }

  #updateMessageView(message) {
    this.#messageView.textContent = message;
  }

  #updateFleetView(fleet) {
    for (const [length, quantity] of Object.entries(fleet)) {
      const quantityElement = this.#fleetView.querySelector(
        `.fleet__quantity_class_${length}`
      );
      quantityElement.textContent = quantity;
    }
  }

  #updateBoardViewForPlacement(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = this.#boardView.querySelector(
          `[data-row="${i}"][data-column="${j}"]`
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
    console.log(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = this.#boardView.querySelector(
          `[data-row="${i}"][data-column="${j}"]`
        );

        switch (board[i][j]) {
          case HIT:
            cell.setAttribute("class", "board__cell board__cell_type_hit");
            break;
          case MISS:
            cell.setAttribute("class", "board__cell board__cell_type_miss");
            break;
          default:
            cell.setAttribute("class", "board__cell board__cell_type_unknown");
        }
      }
    }
  }

  bindToOnStartShipPlacement(callback) {
    this.onStartDeployment = callback;
  }

  bindToOnPlaceShip(callback) {
    this.onPlaceShip = callback;
  }

  bindToOnSubmitBoard(callback) {
    this.onSubmitBoard = callback;
  }

  bindToOnLaunchMissile(callback) {
    this.onLaunchMissile = callback;
  }
}
