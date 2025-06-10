"use strict";

export class View {
  #allocation;
  #board;
  #message;

  constructor() {
    this.#allocation = document.querySelector(".allocation");
    this.#board = document.querySelector(".board");
    this.#message = document.querySelector(".message");

    this.#handlePageLoaded();
  }

  // #initialiseBoard() {
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
    startButton.addEventListener("click", () => this.onGetAllocation());

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

    this.#board.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    });

    this.#board.addEventListener("drop", (event) => {
      event.preventDefault();

      const mouseXRelativeToViewport = event.clientX;
      const mouseYRelativeToViewport = event.clientY;
      const boardBoundingBox = this.#board.getBoundingClientRect();
      const mouseXRelativeToBoard =
        mouseXRelativeToViewport - boardBoundingBox.x;
      const mouseYRelativeToBoard =
        mouseYRelativeToViewport - boardBoundingBox.y;

      const cellBoundingBox =
        this.#board.rows[0].cells[0].getBoundingClientRect();
      const startRow = Math.floor(
        mouseYRelativeToBoard / cellBoundingBox.height
      );
      const startColumn = Math.floor(
        mouseXRelativeToBoard / cellBoundingBox.width
      );

      const shipId = event.dataTransfer.getData("id");
      const ship = document.querySelector(`#${shipId}`);
      const shipLength = +ship.getAttribute("data-length");

      console.debug("startColumn = " + startColumn);
      console.debug("startRow = " + startRow);
      console.debug("endColumn = " + (startColumn + shipLength - 1));
      console.debug("endRow = " + startRow);

      this.onPlaceShip(
        startColumn,
        startRow,
        startColumn + shipLength - 1,
        startRow
      );
    });
  }

  handleAllocationGotten(response) {
    this.#message.textContent = response.message;

    for (const [length, quantity] of Object.entries(response.data)) {
      const ship = document.createElement("div");

      ship.setAttribute("id", `length-${length}`);
      ship.setAttribute(
        "class",
        `allocation__ship allocation__ship_length_${length}`
      );
      ship.setAttribute("draggable", "true");
      ship.setAttribute("data-length", length);
      ship.setAttribute("data-orientation", "horizontal");

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

      this.#allocation.append(ship);

      const quantityHTML = document.createElement("span");
      quantityHTML.setAttribute(
        "class",
        `allocation__quantity allocation__quantity_length_${length}`
      );
      quantityHTML.textContent = quantity;
      this.#allocation.append(quantityHTML);
    }
  }

  // This response object should contain a board AND the allocation
  handleShipPlaced(response) {
    this.#message = response.message;

    const board = response.data.board;
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
        const cell = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );

        if (!board[row][column]) {
          cell.setAttribute("class", "board__cell");
        } else if (board[row][column] === "x") {
          cell.setAttribute("class", "board__cell board__cell_type_hit");
        } else {
          cell.setAttribute("class", "board__cell board__cell_type_ship");
        }
      }
    }

    const allocation = response.data.allocation;
    for (const [length, quantity] of Object.entries(allocation)) {
      const quantityHTML = document.querySelector(
        `.allocation__quantity_length_${length}`
      );
      quantityHTML.textContent = quantity;
    }
  }

  bindToOnGetAllocation = (callback) => {
    this.onGetAllocation = callback;
  };

  bindToOnPlaceShip = (callback) => {
    this.onPlaceShip = callback;
  };
}
