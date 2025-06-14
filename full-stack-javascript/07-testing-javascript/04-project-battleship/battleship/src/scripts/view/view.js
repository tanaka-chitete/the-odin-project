"use strict";

export class View {
  #message;
  #allocation;
  #board;

  constructor() {
    this.#message = document.querySelector(".message");
    this.#allocation = document.querySelector(".allocation");
    this.#board = document.querySelector(".board");

    this.#initialiseStartControls();
    this.#initialiseBoard();
  }

  #initialiseStartControls() {
    const startButton = document.querySelector(".button_type_start");
    startButton.addEventListener("click", () => this.onGetAllocation());
  }

  #destroyStartControls() {
    document.querySelector(".controls_type_start").remove();
  }

  #initialisePositionControls() {
    const initialiseForm = () => {
      const positionControls = document.createElement("div");
      positionControls.setAttribute("class", "controls controls_type_position");

      const resetButton = document.createElement("button");
      resetButton.setAttribute("class", "button button_type_reset");
      resetButton.textContent = "Reset";

      const rotateButton = document.createElement("button");
      rotateButton.setAttribute("class", "button_type_rotate");
      rotateButton.textContent = "Rotate";

      const submitButton = document.createElement("button");
      submitButton.setAttribute("class", "button_type_submit");
      submitButton.textContent = "Submit";

      positionControls.append(resetButton);
      positionControls.append(rotateButton);
      positionControls.append(submitButton);

      const middle = document.querySelector(".middle");
      middle.append(positionControls);
    };

    const initialiseFunction = () => {
      const submitButton = document.querySelector(".button_type_submit");
      submitButton.addEventListener("click", this.onSubmitBoard);
    };

    initialiseForm();
    initialiseFunction();
  }

  #destroyPositionControls() {
    document.querySelector(".controls_type_position").remove();
  }

  #initialiseBattleControls() {
    const initialiseForm = () => {
      const battleControls = document.createElement("div");
      battleControls.setAttribute("class", "controls controls_type_battle");

      const launchMissileButton = document.createElement("button");
      launchMissileButton.setAttribute(
        "class",
        "button button_type_launch-missile"
      );

      const middle = document.querySelector(".middle");
      middle.append(battleControls);
    };

    const initialiseFunction = () => {
      const launchMissileButton = document.querySelector(
        ".button_type_launch-missile"
      );
      launchMissileButton.addEventListener("click", this.onLaunchMissile);
    };

    initialiseForm();
    initialiseFunction();
  }

  #initialiseAllocation(allocation) {
    const initialiseForm = () => {
      for (const [length, quantity] of Object.entries(allocation)) {
        const ship = document.createElement("div");
        ship.setAttribute("id", `length-${length}`);
        ship.setAttribute(
          "class",
          `allocation__ship allocation__ship_length_${length}`
        );
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-length", length);

        this.#allocation.append(ship);

        const quantityHTML = document.createElement("span");
        quantityHTML.setAttribute(
          "class",
          `allocation__quantity allocation__quantity_length_${length}`
        );
        quantityHTML.textContent = quantity;
        this.#allocation.append(quantityHTML);
      }
    };

    const initialiseFunction = () => {
      for (const [length, _] of Object.entries(allocation)) {
        const ship = document.querySelector(
          `.allocation__ship_length_${length}`
        );
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
      }
    };

    initialiseForm();
    initialiseFunction();
  }

  #destroyAllocation() {
    this.#allocation.remove();
  }

  #initialiseBoard() {
    const initialiseForm = () => {
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
    };

    const initialiseFunction = () => {
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

        this.onPlaceShip(
          startColumn,
          startRow,
          startColumn + shipLength - 1,
          startRow
        );
      });
    };

    initialiseForm();
    initialiseFunction();
  }

  handleAllocationGotten(response) {
    this.#message.textContent = response.message;

    this.#destroyStartControls();

    this.#initialiseAllocation(response.data);
    this.#initialisePositionControls();
  }

  handleShipPlaced(response) {
    this.#message.textContent = response.message;

    this.#refreshAllocation(response.data.allocation);
    this.#refreshDeploymentBoard(response.data.board);
  }

  // This should only get called once (after player 1 submits)
  // When player 2 submits, the handleBattleStarted event should start
  handleBoardSubmitted(response) {
    this.#message.textContent = response.message;

    this.#refreshAllocation(response.data.allocation);
    this.#refreshDeploymentBoard(response.data.board);
  }

  handleBattleStarted(response) {
    this.#message.textContent = response.message;

    this.#destroyAllocation();
    this.#destroyPositionControls();

    this.#initialiseBattleControls();

    this.#refreshBattleBoard(response.data.board);
  }

  #refreshAllocation(allocation) {
    for (const [length, quantity] of Object.entries(allocation)) {
      const quantityHTML = document.querySelector(
        `.allocation__quantity_length_${length}`
      );
      quantityHTML.textContent = quantity;
    }
  }

  #refreshBattleBoard(board) {
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
        const cell = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );

        if (board[row][column] === "x") {
          cell.setAttribute("class", "board__cell board__cell_type_missile");
        } else {
          cell.setAttribute("class", "board__cell");
        }
      }
    }
  }

  #refreshDeploymentBoard(board) {
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
        const cell = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );

        if (board[row][column]) {
          cell.setAttribute("class", "board__cell board__cell_type_ship");
        } else {
          cell.setAttribute("class", "board__cell");
        }
      }
    }
  }

  bindToOnGetAllocation(callback) {
    this.onGetAllocation = callback;
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
