"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStartShipPlacement(this.forwardStartShipPlacement);
    this.#model.bindToOnShipPlacementStarted(this.forwardShipPlacementStarted);

    this.#view.bindToOnPlaceShip(this.forwardPlaceShip);
    this.#model.bindToOnShipPlaced(this.forwardShipPlaced);

    this.#view.bindToOnSubmitBoard(this.forwardSubmitBoard);
    this.#model.bindToOnBoardSubmitted(this.forwardBoardSubmitted);

    // The battle automatically starts after Player 2 ends placement
    this.#model.bindToOnBattleStarted(this.forwardBattleStarted);

    this.#view.bindToOnLaunchMissile(this.forwardLaunchMissile);
  }

  forwardStartShipPlacement = () => {
    this.#model.handleStartShipPlacement();
  };

  forwardShipPlacementStarted = (response) => {
    this.#view.handleShipPlacementStarted(response);
  };

  forwardPlaceShip = (x1, y1, x2, y2) => {
    this.#model.handlePlaceShip(x1, y1, x2, y2);
  };

  forwardShipPlaced = (response) => {
    this.#view.handleShipPlaced(response);
  };

  forwardSubmitBoard = () => {
    this.#model.handleSubmitBoard();
  };

  forwardBoardSubmitted = (response) => {
    this.#view.handleBoardSubmitted(response);
  };

  forwardLaunchMissile = (x, y) => {
    this.#model.handleLaunchMissile(x, y);
  };

  forwardBattleStarted = (response) => {
    this.#view.handleBattleStarted(response);
  };
}
