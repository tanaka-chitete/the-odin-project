"use strict";

import { Battlefield } from "./board";

export class Player {
  #_name;
  #_board;

  constructor(name) {
    this.#_name = name;
    this.#_board = new Battlefield();
  }

  get name() {
    return this.#_name;
  }

  get board() {
    return this.#_board;
  }
}
