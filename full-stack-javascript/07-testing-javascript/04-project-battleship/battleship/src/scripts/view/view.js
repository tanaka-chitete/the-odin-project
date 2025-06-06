"use strict";

export class View {
  #dock;
  #board;
  #message;

  constructor() {
    this.#dock = document.querySelector(".dock");
    this.#board = document.querySelector(".board");
    this.#message = document.querySelector(".message");

    this.#handlePageLoaded();
  }

  // #initialiseFleet() {
  //   const ships = document.querySelectorAll(".ship");
  //   ships.forEach((ship) => {
  //     ship.addEventListener("dragstart", (event) => {
  //       event.dataTransfer.effectAllowed = "move";

  //       const boundingBox = ship.getBoundingClientRect();
  //       const offsetX = event.clientX - boundingBox.x;
  //       const offsetY = event.clientY - boundingBox.y;

  //       event.dataTransfer.setData("id", ship.id);
  //       event.dataTransfer.setData("length", ship.dataset.length);
  //       event.dataTransfer.setData("orientation", ship.dataset.orientation);
  //       event.dataTransfer.setData("offsetX", offsetX);
  //       event.dataTransfer.setData("offsetY", offsetY);
  //     });
  //   });
  // }

  // #initialiseBoard() {
  //   this.#board.addEventListener("dragover", (event) => {
  //     event.preventDefault();
  //     event.dataTransfer.dropEffect = "move";
  //   });

  //   this.#board.addEventListener("drop", (event) => {
  //     event.preventDefault();

  //     const boardBoundingBox = this.#board.getBoundingClientRect();

  //     const mouseXonViewport = event.clientX;
  //     const mouseYonViewport = event.clientY;
  //     const mouseXonBoard = mouseXonViewport - boardBoundingBox.x;
  //     const mouseYonBoard = mouseYonViewport - boardBoundingBox.y;

  //     const cellBoundingBox =
  //       this.#board.rows[0].cells[0].getBoundingClientRect();
  //     const startRow = Math.floor(mouseYonBoard / cellBoundingBox.width);
  //     const startColumn = Math.floor(mouseXonBoard / cellBoundingBox.width);
  //     const shipOrientation = event.dataTransfer.getData("orientation");
  //     const shipLength = +event.dataTransfer.getData("length");

  //     if (
  //       (shipOrientation === "horizontal" &&
  //         startColumn + shipLength - 1 >= boardLength) ||
  //       (shipOrientation === "vertical" &&
  //         startRow + shipLength - 1 >= boardLength)
  //     ) {
  //       return;
  //     }

  //     for (let i = 0; i < shipLength; i++) {
  //       const currentRow =
  //         shipOrientation === "horizontal" ? startRow : startRow + i;
  //       const currentColumn =
  //         shipOrientation === "horizontal" ? startColumn + i : startColumn;

  //       const currentCell = this.#board.rows[currentRow].cells[currentColumn];
  //       currentCell.classList.add("board__cell_occupied");
  //     }

  //     const id = event.dataTransfer.getData("id");
  //     const ship = document.querySelector(`#${id}`);
  //     ship.style.visibility = "hidden";
  //   });
  // }

  #handlePageLoaded() {
    const startButton = document.querySelector(".button_type_start");
    startButton.addEventListener("click", () => this.onStart());

    for (let row = 0; row < 10; row++) {
      const boardRow = document.createElement("tr");
      boardRow.setAttribute("class", "board__row");

      for (let column = 0; column < 10; column++) {
        const boardCell = document.createElement("td");
        boardCell.setAttribute("class", "board__cell");
        boardCell.setAttribute("data-row", row);
        boardCell.setAttribute("data-column", column);

        boardRow.append(boardCell);
      }

      this.#board.append(boardRow);
    }
  }

  bindToOnStart = (callback) => {
    this.onStart = callback;
  };

  handleDockGenerated(response) {
    this.#message.textContent = response.message;

    response.data.forEach((shipClass) => {
      for (let i = 0; i < shipClass.quantity; i++) {
        const ship = document.createElement("div");

        ship.setAttribute(
          "class",
          `dock__ship dock__ship_length_${shipClass.length}`
        );
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-length", shipClass.length);
        ship.setAttribute("data-orientation", "horizontal");

        this.#dock.append(ship);
      }

      const quantity = document.createElement("span");
      quantity.setAttribute(
        "class",
        `dock__quantity dock__quantity_length_${shipClass.length}`
      );
      quantity.textContent = shipClass.length;
      this.#dock.append(quantity);
    });
  }
}
