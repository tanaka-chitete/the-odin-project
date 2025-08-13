"use strict";

export class View {
  #messageElement;
  #portElement;
  #seaElement;
  #consoleElement;

  constructor() {
    this.#messageElement = document.querySelector(".message");
    this.#portElement = document.querySelector(".port");
    this.#seaElement = document.querySelector(".sea");
    this.#consoleElement = document.querySelector(".console");
  }
}
