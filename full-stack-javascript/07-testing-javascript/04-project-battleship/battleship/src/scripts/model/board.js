"use strict";

import { Ship } from "./ship";

export class Board {
  #_board;
  #_allocation;

  constructor() {
    this.#_board = new Array(10);
    for (let row = 0; row < this.#_board.length; row++) {
      this.#_board[row] = new Array(this.#_board.length);
    }
    this.#_allocation = {
      5: 1,
      4: 2,
      3: 3,
      2: 4,
      1: 5,
    };
  }

  get board() {
    return this.#_board;
  }

  get allocation() {
    return this.#_allocation;
  }

  place(x1, y1, x2, y2) {
    if (
      !Number.isInteger(x1) ||
      !Number.isInteger(y1) ||
      !Number.isInteger(x2) ||
      !Number.isInteger(y2)
    ) {
      return false;
    }

    if (
      x1 < 0 ||
      x1 >= this.board.length ||
      x2 < 0 ||
      x2 >= this.board.length ||
      y1 < 0 ||
      y1 >= this.board[0].length ||
      y2 < 0 ||
      y2 >= this.board[0].length
    ) {
      return false;
    }

    // The path must align with board spaces
    if (x1 !== x2 && y1 !== y2) {
      return false;
    }

    const path = this.#makePath(x1, y1, x2, y2);

    // The path must correspond with an available ship
    if (!this.allocation[path.length]) {
      return false;
    }

    this.allocation[path.length]--;

    // The path must be vacant
    if (path.some(([x, y]) => this.board[y][x])) {
      return false;
    }

    const ship = new Ship(path.length);
    path.forEach(([x, y]) => (this.board[y][x] = ship));

    return true;
  }

  receive(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      return false;
    }

    if (x < 0 || x >= this.board.length || y < 0 || y >= this.board[0].length) {
      return false;
    }

    if (this.board[y][x] === "x") {
      return false;
    }

    if (this.board[y][x] instanceof Ship) {
      this.board[y][x].hit();
    }

    this.board[y][x] = "x";

    return true;
  }

  isEmpty() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] instanceof Ship) {
          return false;
        }
      }
    }

    return true;
  }

  #makePath(x1, y1, x2, y2) {
    const path = [];

    // Intuitively, the start space should be "before" the end space
    if (y1 > y2 || x1 > x2) {
      [x1, y1, x2, y2] = [x2, y2, x1, y1];
    }

    // A shared x-axis means that the path is vertical
    if (x1 === x2) {
      for (let row = y1; row <= y2; row++) {
        path.push([x1, row]);
      }
    } else {
      for (let column = x1; column <= x2; column++) {
        path.push([column, y1]);
      }
    }

    return path;
  }
}
