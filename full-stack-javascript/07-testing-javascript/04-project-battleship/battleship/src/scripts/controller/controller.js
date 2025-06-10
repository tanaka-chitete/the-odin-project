"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnGetAllocation(this.forwardGetAllocation);
    this.#model.bindToOnAllocationGotten(this.forwardAllocationGotten);
    this.#view.bindToOnPlaceShip(this.forwardPlaceShip);
    this.#model.bindToOnShipPlaced(this.forwardShipPlaced);
  }

  forwardGetAllocation = () => {
    this.#model.handleGetAllocation();
  };

  forwardAllocationGotten = (response) => {
    this.#view.handleAllocationGotten(response);
  };

  forwardPlaceShip = (x1, y1, x2, y2) => {
    this.#model.handlePlaceShip(x1, y1, x2, y2);
  };

  forwardShipPlaced = (response) => {
    this.#view.handleShipPlaced(response);
  };
}
