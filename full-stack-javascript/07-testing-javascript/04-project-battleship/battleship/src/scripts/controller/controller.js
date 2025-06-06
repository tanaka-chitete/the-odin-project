"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStart(this.forwardStart);
    this.#model.bindToOnDockGenerated(this.forwardDockGenerated);
  }

  forwardStart = () => {
    this.#model.handleStart();
  };

  forwardDockGenerated = (response) => {
    this.#view.handleDockGenerated(response);
  };
}
