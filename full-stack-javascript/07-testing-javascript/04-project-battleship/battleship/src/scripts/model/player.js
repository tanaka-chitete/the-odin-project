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

  place(x1, y1, x2, y2) {
    return this.board.place(x1, y1, x2, y2);
  }

  fire(x, y) {
    return this.board.fire(x, y);
  }

  isLoser() {
    return this.board.isEmpty();
  }
}
