"use strict";

import {
  BOARD_LENGTH,
  CLASS_1_LENGTH,
  CLASS_2_LENGTH,
  CLASS_3_LENGTH,
  CLASS_4_LENGTH,
  CLASS_5_LENGTH,
  CLASS_1_QUANTITY,
  CLASS_2_QUANTITY,
  CLASS_3_QUANTITY,
  CLASS_4_QUANTITY,
  CLASS_5_QUANTITY,
  MISSILE_HIT,
  MISSILE_MISS,
  EMPTY,
} from "../constants";

import { Ship } from "./ship";

export class Board {
  #_board;
  #_allocation;

  constructor() {
    this.#_board = new Array(BOARD_LENGTH);
    for (let i = 0; i < this.#_board.length; i++) {
      this.#_board[i] = new Array(this.#_board.length);
    }

    for (let i = 0; i < this.#_board.length; i++) {
      for (let j = 0; j < this.#_board[i].length; j++) {
        this.#_board[i][j] = EMPTY;
      }
    }

    this.#_allocation = {
      [CLASS_5_LENGTH]: CLASS_5_QUANTITY,
      [CLASS_4_LENGTH]: CLASS_4_QUANTITY,
      [CLASS_3_LENGTH]: CLASS_3_QUANTITY,
      [CLASS_2_LENGTH]: CLASS_2_QUANTITY,
      [CLASS_1_LENGTH]: CLASS_1_QUANTITY,
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

    if (this.board[y][x] === MISSILE_HIT || this.board[y][x] === MISSILE_MISS) {
      return false;
    }

    if (this.board[y][x] === EMPTY) {
      this.board[y][x] = MISSILE_MISS;
      return false;
    }

    this.board[y][x] = MISSILE_HIT;

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

  isFull() {
    for (const quantity of Object.values(this.allocation)) {
      if (quantity) {
        return false;
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
      for (let i = y1; i <= y2; i++) {
        path.push([x1, i]);
      }
    } else {
      for (let j = x1; j <= x2; j++) {
        path.push([j, y1]);
      }
    }

    return path;
  }
}
