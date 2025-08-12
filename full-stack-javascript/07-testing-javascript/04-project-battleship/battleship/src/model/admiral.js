"use strict";

import { Sea } from "./sea";

export class Admiral {
  #name;
  #sea;

  constructor(name) {
    if (!(typeof name === "string")) {
      throw new Error("name must be a String");
    }

    this.#name = name;
    this.#sea = new Sea();
  }

  getName() {
    return this.#name;
  }

  getSea() {
    return this.#sea;
  }
}
