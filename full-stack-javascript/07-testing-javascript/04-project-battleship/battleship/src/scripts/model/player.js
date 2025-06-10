"use strict";

import { Board } from "./board";

export class Player {
  #_name;
  #_board;

  constructor(name) {
    this.#_name = name;
    this.#_board = new Board();
  }

  get name() {
    return this.#_name;
  }

  get board() {
    return this.#_board.board;
  }

  get allocation() {
    return this.#_board.allocation;
  }

  get isLoser() {
    return this.#_board.isEmpty();
  }

  place(x1, y1, x2, y2) {
    return this.#_board.place(x1, y1, x2, y2);
  }

  receive(x, y) {
    return this.#_board.receive(x, y);
  }
}
