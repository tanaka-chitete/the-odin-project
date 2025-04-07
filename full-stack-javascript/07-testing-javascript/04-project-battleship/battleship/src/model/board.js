"use strict";

import { Coordinate } from "./coordinate";

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
  place(start, end) {
    // TODO: Check for equality using utilities.equals()
    // if (start === end) {
    //   return false;
    // }

    if (!this.#isInBound(start) || !this.#isInBound(end)) {
      return false;
    }

    if (!this.#isInline(start, end)) {
      return false;
    }

    // TODO: Check if coordinates would place a ship of length >5
    if (!this.#isOfSize(start, end)) {
      return false;
    }

    const path = this.#makePath(start, end);
    if (!this.#isFree(path)) {
      return false;
    }

    path.forEach(
      (coordinate) => (this.#board[coordinate.y][coordinate.x] = "x")
    );

    return true; // TODO: Return the ship
  }

  #isInline(start, end) {
    return start.x === end.x || start.y === end.y;
  }

  #isInBound(coordinate) {
    return (
      coordinate.x >= 0 &&
      coordinate.x < this.#LENGTH_OF_BOARD &&
      coordinate.y >= 0 &&
      coordinate.y < this.#LENGTH_OF_BOARD
    );
  }

  #isOfSize(start, end) {
    return (
      (start.x === end.x && Math.abs(end.y - start.y) <= 5) ||
      (start.y === end.y && Math.abs(end.x - start.x) <= 5)
    );
  }

  #isFree(path) {
    return path.every(
      (coordinate) => this.#board[coordinate.y][coordinate.x] === ""
    );
  }

  #makePath(start, end) {
    const path = [];

    if (start.x === end.x) {
      if (start.y > end.y) {
        // Coordinates need to be swapped to avoid confusion
        [start, end] = [end, start];

        // Path needs to be made using coordinates on shared vertical
        for (let row = start.y; row <= end.y; row++) {
          path.push(new Coordinate(start.x, row));
        }
      }
    } else {
      if (start.x > end.x) {
        // Coordinates need to be swapped to avoid confusion
        [start, end] = [end, start];

        // Path needs to be made using coordinates on shared horizontal
        for (let column = start.x; column <= end.x; column++) {
          path.push(new Coordinate(column, start.y));
        }
      }
    }

    return [start, ...path, end];
  }
}
