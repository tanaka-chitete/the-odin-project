"use strict";

import { BOARD_LENGTH } from "../constants";

export class View {
  #board;
  #message;

  constructor() {
    this.#board = document.querySelector(".board");
    this.#message = document.querySelector(".message");
    this.#initialiseDisplay();
  }

  #initialiseDisplay() {
    this.#initialiseFleet();
    this.#initialiseBoard();
    this.#initialiseControls();
  }

  #initialiseFleet() {
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      ship.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = "move";

        const boundingBox = ship.getBoundingClientRect();
        const offsetX = event.clientX - boundingBox.x;
        const offsetY = event.clientY - boundingBox.y;

        event.dataTransfer.setData("id", ship.id);
        event.dataTransfer.setData("length", ship.dataset.length);
        event.dataTransfer.setData("orientation", ship.dataset.orientation);
        event.dataTransfer.setData("offsetX", offsetX);
        event.dataTransfer.setData("offsetY", offsetY);
      });
    });
  }

  #initialiseBoard() {
    this.#board.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });

    this.#board.addEventListener("drop", (event) => {
      event.preventDefault();

      const boardBoundingBox = this.#board.getBoundingClientRect();

      const mouseXonViewport = event.clientX;
      const mouseYonViewport = event.clientY;
      const mouseXonBoard = mouseXonViewport - boardBoundingBox.x;
      const mouseYonBoard = mouseYonViewport - boardBoundingBox.y;

      const cellBoundingBox =
        this.#board.rows[0].cells[0].getBoundingClientRect();
      const startRow = Math.floor(mouseYonBoard / cellBoundingBox.width);
      const startColumn = Math.floor(mouseXonBoard / cellBoundingBox.width);
      const shipOrientation = event.dataTransfer.getData("orientation");
      const shipLength = +event.dataTransfer.getData("length");

      if (
        (shipOrientation === "horizontal" &&
          startColumn + shipLength - 1 >= BOARD_LENGTH) ||
        (shipOrientation === "vertical" &&
          startRow + shipLength - 1 >= BOARD_LENGTH)
      ) {
        return;
      }

      for (let i = 0; i < shipLength; i++) {
        const currentRow =
          shipOrientation === "horizontal" ? startRow : startRow + i;
        const currentColumn =
          shipOrientation === "horizontal" ? startColumn + i : startColumn;

        const currentCell = this.#board.rows[currentRow].cells[currentColumn];
        currentCell.classList.add("board__cell_occupied");
      }

      const id = event.dataTransfer.getData("id");
      const ship = document.querySelector(`#${id}`);
      ship.style.visibility = "hidden";
    });
  }

  #initialiseControls() {
    const startButton = document.querySelector(".button_type_start");
    startButton.addEventListener("click", () => this.onStart());
  }

  updateDisplay() {}

  bindToOnStart = (callback) => {
    this.onStart = callback;
  };

  showMessage(message) {
    this.#message.textContent = message;
  }
}
