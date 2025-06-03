"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStart(this.forwardStart);
    this.#model.bindToOnAllocationGenerated(this.forwardAllocation);
  }

  forwardStart = () => {
    this.#model.handleStart();
  };

  forwardAllocation = (response) => {
    this.#view.handleAllocation(response);
  };
}
