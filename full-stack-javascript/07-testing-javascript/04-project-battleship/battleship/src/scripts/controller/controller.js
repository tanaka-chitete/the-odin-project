"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnGetDock(this.forwardGetDock);
    this.#model.bindToOnDockGotten(this.forwardDockGotten);
    this.#view.bindToOnPlaceShip(this.forwardPlaceShip);
    this.#model.bindToOnShipPlaced(this.forwardShipPlaced);
  }

  forwardGetDock = () => {
    this.#model.handleGetDock();
  };

  forwardDockGotten = (response) => {
    this.#view.handleDockGotten(response);
  };

  forwardPlaceShip = (x1, y1, x2, y2) => {
    this.#model.handlePlaceShip(x1, y1, x2, y2);
  };

  forwardShipPlaced = (response) => {
    this.#view.handleShipPlaced(response);
  };
}
