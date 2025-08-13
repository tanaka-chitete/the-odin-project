"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStartGame(this.forwardStartGame);
    this.#model.bindToOnGameStarted(this.forwardGameStarted);

    this.#view.bindToOnStartPlacement(this.forwardStartPlacement);
    this.#model.bindToOnPlacementStarted(this.forwardPlacementStarted);

    this.#view.bindToOnPlaceShip(this.forwardPlaceShip);
    this.#model.bindToOnShipPlaced(this.forwardShipPlaced);

    this.#view.bindToOnEndPlacement(this.forwardEndPlacement);
    this.#model.bindToOnPlacementEnded(this.forwardPlacementEnded);

    this.#view.bindToOnStartEngagement(this.forwardStartEngagement);
    this.#model.bindToOnEngagementStarted(this.forwardEngagementStarted);

    this.#view.bindToOnLaunchMissile(this.forwardLaunchMissile);
    this.#model.bindToOnMissileLaunched(this.forwardMissileLaunched);

    this.#view.bindToOnEndEngagement(this.forwardEndEngagement);
    this.#model.bindToOnEngagementEnded(this.forwardEngagementEnded);
  }

  forwardStartGame = () => {
    this.#model.handleStartGame();
  };

  forwardGameStarted = (response) => {
    this.#view.handleGameStarted(response);
  };

  forwardStartPlacement = () => {
    this.#model.handleStartPlacement();
  };

  forwardPlacementStarted = (response) => {
    this.#view.handlePlacementStarted(response);
  };

  forwardPlaceShip = (x1, y1, x2, y2) => {
    this.#model.handlePlaceShip(x1, y1, x2, y2);
  };

  forwardShipPlaced = (response) => {
    this.#view.handleShipPlaced(response);
  };

  forwardEndPlacement = () => {
    this.#model.handleEndPlacement();
  };

  forwardPlacementEnded = (response) => {
    this.#view.handlePlacementEnded(response);
  };

  forwardStartEngagement = () => {
    this.#model.handleStartEngagement();
  };

  forwardEngagementStarted = (response) => {
    this.#view.handleEngagement(response);
  };

  forwardLaunchMissile = (x, y) => {
    this.#model.handleLaunchMissile(x, y);
  };

  forwardMissileLaunched = (response) => {
    this.#view.handleMissileLaunched(response);
  };

  forwardEndEngagement = () => {
    this.#model.handleEndEngagement();
  };

  forwardEngagementEnded = (response) => {
    this.#view.handleEngagementEnded(response);
  };
}
