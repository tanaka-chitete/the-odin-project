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
    startButton.addEventListener("click", () => this.onGetDock());

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
      event.dataTransfer.dropEffect = "move";
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

      this.onPlaceShip(
        startColumn,
        startRow,
        startColumn + shipLength - 1,
        startRow
      );
    });
  }

  handleDockGotten(response) {
    this.#message.textContent = response.message;

    response.data.forEach((group) => {
      for (let i = 0; i < group.quantity; i++) {
        const ship = document.createElement("div");

        ship.setAttribute("id", `ship-length-${group.length}_${i}`);
        ship.setAttribute(
          "class",
          `dock__ship dock__ship_length_${group.length}`
        );
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-length", group.length);
        ship.setAttribute("data-orientation", "horizontal");

        ship.addEventListener("dragstart", (event) => {
          event.dataTransfer.effectAllowed = "move";

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

        this.#dock.append(ship);
      }

      const quantity = document.createElement("span");
      quantity.setAttribute(
        "class",
        `dock__quantity dock__quantity_length_${group.length}`
      );
      quantity.textContent = group.quantity;
      this.#dock.append(quantity);
    });
  }

  // This response object should contain a board AND the dock
  handleShipPlaced(response) {
    this.#message = response.message;
    this.refreshBoard(response.data);
  }

  refreshBoard(board) {
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
  }

  bindToOnGetDock = (callback) => {
    this.onGetDock = callback;
  };

  bindToOnPlaceShip = (callback) => {
    this.onPlaceShip = callback;
  };
}
