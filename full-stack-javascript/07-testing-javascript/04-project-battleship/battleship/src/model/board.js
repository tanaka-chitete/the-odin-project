"use strict";

export class Board {
  #LENGTH_OF_BOARD = 10;

  #board;

  constructor() {
    this.#board = new Array(this.#LENGTH_OF_BOARD);
    for (let row = 0; row < this.#LENGTH_OF_BOARD; row++) {
      this.#board[row] = new Array(this.#LENGTH_OF_BOARD);
    }
  }

  // TODO: Mark places using "x" and "o" for each player
  place(ship, coordinates) {
    if (
      coordinates.startX < 0 ||
      coordinates.startX >= this.#LENGTH_OF_BOARD ||
      coordinates.startY < 0 ||
      coordinates.startY >= this.#LENGTH_OF_BOARD ||
      coordinates.endX < 0 ||
      coordinates.endX >= this.#LENGTH_OF_BOARD ||
      coordinates.endY < 0 ||
      coordinates.endY >= this.#LENGTH_OF_BOARD
    ) {
      return false;
    }

    // Case 1: ship at coordinates is invalid -> true
    // if ()
    // Case 2: ship at coordinates is valid -> false
  }
}
