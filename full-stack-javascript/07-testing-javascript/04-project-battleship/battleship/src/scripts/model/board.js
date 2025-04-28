"use strict";

import { Ship } from "./ship";

class Space {
  constructor(x, y) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("coordinates must be integers");
    }

    this.x = x;
    this.y = y;
  }
}

export class Board {
  #LENGTH_OF_BOARD = 10;

  #board;

  constructor() {
    this.#board = new Array(this.#LENGTH_OF_BOARD);
    for (let row = 0; row < this.#LENGTH_OF_BOARD; row++) {
      this.#board[row] = new Array(this.#LENGTH_OF_BOARD);
    }
  }

  place(x1, y1, x2, y2) {
    let startSpace;
    let endSpace;
    try {
      startSpace = new Space(x1, y1);
      endSpace = new Space(x2, y2);
    } catch (Error) {
      return false;
    }

    if (!this.#isInBounds(startSpace) || !this.#isInBounds(endSpace)) {
      return false;
    }

    if (!this.#isAlignedWithSpaces(startSpace, endSpace)) {
      return false;
    }

    const path = this.#makePath(startSpace, endSpace);

    if (!this.#isWellSized(path)) {
      return false;
    }

    if (!this.#isVacant(path)) {
      return false;
    }

    const ship = new Ship(path.length);
    path.forEach((space) => (this.#board[space.y][space.x] = ship));

    return true;
  }

  fire(space) {
    if (!this.#isInBounds(space)) {
      return false;
    }

    if (this.#board[space.y][space.x] === "x") {
      return false;
    }

    const hit = this.#board[space.y][space.x] instanceof Ship ? true : false;

    this.#board[space.y][space.x] = "x";

    return hit;
  }

  isEmpty() {
    for (let i = 0; i < this.#board.length; i++) {
      for (let j = 0; j < this.#board[i].length; j++) {
        if (this.#board[i][j] instanceof Ship) {
          return false;
        }
      }
    }

    return true;
  }

  #isInBounds(space) {
    return (
      space.x >= 0 &&
      space.x < this.#LENGTH_OF_BOARD &&
      space.y >= 0 &&
      space.y < this.#LENGTH_OF_BOARD
    );
  }

  #isAlignedWithSpaces(startSpace, endSpace) {
    return startSpace.x === endSpace.x || startSpace.y === endSpace.y;
  }

  #makePath(startSpace, endSpace) {
    const path = [];

    // Intuitively, the start space should be "before" the end space
    if (startSpace.y > endSpace.y || startSpace.x > endSpace.x) {
      [startSpace, endSpace] = [endSpace, startSpace];
    }

    // A shared x-axis means that the path is vertical
    if (startSpace.x === endSpace.x) {
      for (let row = startSpace.y; row <= endSpace.y; row++) {
        path.push(new Space(startSpace.x, row));
      }
    } else {
      for (let column = startSpace.x; column <= endSpace.x; column++) {
        path.push(new Space(column, startSpace.y));
      }
    }

    return path;
  }

  #isWellSized(path) {
    return 2 <= path.length && path.length <= 5;
  }

  #isVacant(path) {
    return path.every((space) => !this.#board[space.y][space.x]);
  }
}
