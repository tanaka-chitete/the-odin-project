"use strict";

export class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.bindToOnStart(this.onStart);
    this.#model.bindToOnStartEnd(this.onStartEnd);
  }

  onStart = () => {
    this.#model.start();
  };

  onStartEnd = (message) => {
    this.#view.showMessage(message);
  };
}
