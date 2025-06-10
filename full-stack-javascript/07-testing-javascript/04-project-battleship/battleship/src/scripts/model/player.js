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
    return this.#_board;
  }

  isLoser() {
    return this.board.isEmpty();
  }

  place(x1, y1, x2, y2) {
    return this.board.place(x1, y1, x2, y2);
  }

  receive(x, y) {
    return this.board.receive(x, y);
  }
}
