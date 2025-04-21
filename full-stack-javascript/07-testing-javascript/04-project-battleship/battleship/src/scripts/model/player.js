"use strict";

import { Board } from "./board";

export class Player {
  #_board;

  constructor() {
    this.#_board = new Board();
  }

  get board() {
    return this.#_board;
  }

  isLoser() {
    return this.#_board.isEmpty();
  }
}
