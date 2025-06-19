"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStartPreparation(this.forwardStartPreparation);
    this.#model.bindToOnPreparationStarted(this.forwardPreparationStarted);

    this.#view.bindToOnPlaceShip(this.forwardPlaceShip);
    this.#model.bindToOnShipPlaced(this.forwardShipPlaced);

    this.#view.bindToOnEndPreparation(this.forwardEndPreparation);
    this.#model.bindToOnPreparationEnded(this.forwardPreparationEnded);
    this.#model.bindToOnBattleStarted(this.forwardBattleStarted);

    this.#view.bindToOnLaunchMissile(this.forwardLaunchMissile);
    this.#model.bindToOnMissileLaunched(this.forwardMissileLaunched);
  }

  forwardStartPreparation = () => {
    this.#model.handleStartPreparation();
  };

  forwardPreparationStarted = (response) => {
    this.#view.handlePreparationStarted(response);
  };

  forwardPlaceShip = (x1, y1, x2, y2) => {
    this.#model.handlePlaceShip(x1, y1, x2, y2);
  };

  forwardShipPlaced = (response) => {
    this.#view.handleShipPlaced(response);
  };

  forwardEndPreparation = () => {
    this.#model.handleEndPreparation();
  };

  forwardPreparationEnded = (response) => {
    this.#view.handlePreparationEnded(response);
  };

  forwardBattleStarted = (response) => {
    this.#view.handleBattleStarted(response);
  };

  forwardLaunchMissile = (x, y) => {
    this.#model.handleLaunchMissile(x, y);
  };

  forwardMissileLaunched = (response) => {
    this.#view.handleMissileLaunched(response);
  };
}
