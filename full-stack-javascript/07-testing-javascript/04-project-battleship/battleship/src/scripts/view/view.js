"use strict";

export class View {
  #messageView;
  #fleetView;
  #boardView;

  constructor() {
    this.#messageView = this.#initialiseMessageView();
    this.#boardView = this.#initialiseBoardView();
    


    this.#initialiseStartControls();
  }

  #initialiseFleetView() {
    const fleetView = document.createElement("div");
    fleetView.setAttribute("class", "fleet");
    document.querySelector(".left").append(fleetView);
    
    return document.querySelector(".fleet");
  }

  #initialiseMessageView() {
    const messageView = document.createElement("h3");
    messageView.setAttribute("class", "message");
    document.querySelector("header").append(messageView);

    return document.querySelector(".message");
  }

  #initialiseStartControls() {
    this.#fleetView = this.#initialiseFleetView();
    
    const startButton = document.querySelector(".button_type_start");
    startButton.addEventListener("click", () => this.onStartDeployment());
  }

  #destroyStartControls() {
    const startButton = document.querySelector(".controls_type_start");
    startButton.remove();
  }

  #initialisePlacementControls() {
    const initialiseForm = () => {
      const placementControls = document.createElement("div");
      placementControls.setAttribute(
        "class",
        "controls controls_type_placement"
      );

      const clearButton = document.createElement("button");
      clearButton.setAttribute("class", "button button_type_clear");
      clearButton.textContent = "Clear";

      const rotateButton = document.createElement("button");
      rotateButton.setAttribute("class", "button_type_rotate");
      rotateButton.textContent = "Rotate";

      const submitButton = document.createElement("button");
      submitButton.setAttribute("class", "button_type_submit");
      submitButton.textContent = "Submit";

      placementControls.append(clearButton);
      placementControls.append(rotateButton);
      placementControls.append(submitButton);

      const middle = document.querySelector(".middle");
      middle.append(placementControls);
    };

    const initialiseFunction = () => {
      const submitButton = document.querySelector(".button_type_submit");
      submitButton.addEventListener("click", this.onSubmitBoard);
    };

    initialiseForm();
    initialiseFunction();
  }

  #destroyPlacementControls() {
    const placementControls = document.querySelector(
      ".controls_type_placement"
    );
    placementControls.remove();
  }

  #initialiseFleetView(fleet) {
    const initialiseForm = () => {
      for (const [_class, quantity] of Object.entries(fleet)) {
        const ship = document.createElement("div");
        ship.setAttribute("id", `class-${_class}`);
        ship.setAttribute("class", `fleet__ship fleet__ship_class_${_class}`);
        ship.setAttribute("draggable", "true");
        ship.setAttribute("data-class", _class);

        this.#fleetView.append(ship);

        const quantityView = document.createElement("span");
        quantityView.setAttribute(
          "class",
          `allocation__quantity allocation__quantity_class_${_class}`
        );
        quantityView.textContent = quantity;
        this.#fleetView.append(quantityView);
      }
    };

    const initialiseFunction = () => {
      for (const [_class, _quantity] of Object.entries(fleet)) {
        const ship = document.querySelector(`.fleet__ship_class_${_class}`);
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

  #destroyFleetView() {
    this.#fleetView.remove();
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

        this.onDeployShip(
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

  handlePlacementStarted(response) {
    this.#destroyStartControls();

    this.#messageView.textContent = response.message;

    this.#initialiseFleetView(response.data.fleet);
    this.#initialiseBoardView(response.data.board);

    this.#initialisePlacementControls();
  }

  handleShipPlaced(response) {
    this.#messageView.textContent = response.message;

    this.#refreshFleetView(response.data.fleet);
    this.#refreshDeploymentBoardView(response.data.board);
  }

  handleBoardSubmitted(response) {
    this.#messageView.textContent = response.message;

    this.#refreshFleetView(response.data.fleet);
    this.#refreshDeploymentBoardView(response.data.board);
  }

  handleBattleStarted(response) {
    this.#messageView.textContent = response.message;

    this.#destroyFleetView();
    this.#destroyPlacementControls();

    this.#refreshBattleBoardView(response.data.board);
  }

  #refreshFleetView(fleet) {
    for (const [length, quantity] of Object.entries(fleet)) {
      const quantityView = document.querySelector(
        `.allocation__quantity_class_${length}`
      );
      quantityView.textContent = quantity;
    }
  }

  #refreshBattleBoardView(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-column="${j}"]`
        );

        if (board[i][j] === "x") {
          cell.setAttribute("class", "board__cell board__cell_type_missile");
        } else {
          cell.setAttribute("class", "board__cell");
        }
      }
    }
  }

  #refreshDeploymentBoardView(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = document.querySelector(
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

  bindToOnStartPlacement(callback) {
    this.onStartDeployment = callback;
  }

  bindToOnPlaceShip(callback) {
    this.onDeployShip = callback;
  }

  bindToOnSubmitBoard(callback) {
    this.onSubmitBoard = callback;
  }

  bindToOnLaunchMissile(callback) {
    this.onLaunchMissile = callback;
  }
}
