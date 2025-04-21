"use strict";

import { Coordinate } from "./coordinate";
import { Ship } from "./ship";

export class Board {
  #LENGTH_OF_BOARD = 10;

  #board;

  constructor() {
    this.#board = new Array(this.#LENGTH_OF_BOARD);
    for (let row = 0; row < this.#LENGTH_OF_BOARD; row++) {
      this.#board[row] = new Array(this.#LENGTH_OF_BOARD);
    }
  }

  place(startCoordinate, endCoordinate) {
    if (
      !this.#isInBounds(startCoordinate) ||
      !this.#isInBounds(endCoordinate)
    ) {
      throw new Error("Path must be in-bounds");
    }

    if (!this.#doesAlign(startCoordinate, endCoordinate)) {
      throw new Error("Path must align with board spaces");
    }

    const path = this.#makePath(startCoordinate, endCoordinate);

    if (!this.#isWellSized(path)) {
      throw new Error("Path must be 2 to 5 spaces in length");
    }

    if (!this.#isVacant(path)) {
      throw new Error("Path must be vacant");
    }

    const ship = new Ship(path.length);
    path.forEach(
      (coordinate) => (this.#board[coordinate.y][coordinate.x] = ship)
    );
  }

  fire(coordinate) {
    if (!this.#isInBounds(coordinate)) {
      throw new Error("Coordinate must be in-bounds");
    }

    if (this.#board[coordinate.y][coordinate.x] === "x") {
      throw new Error("Coordinate must not have already been fired at");
    }

    const hit =
      typeof this.#board[coordinate.y][coordinate.x] === "undefined"
        ? false
        : true;

    this.#board[coordinate.y][coordinate.x] = "x";

    return hit;
  }

  #isInBounds(coordinate) {
    return (
      coordinate.x >= 0 &&
      coordinate.x < this.#LENGTH_OF_BOARD &&
      coordinate.y >= 0 &&
      coordinate.y < this.#LENGTH_OF_BOARD
    );
  }

  #doesAlign(startCoordinate, endCoordinate) {
    return (
      startCoordinate.x === endCoordinate.x ||
      startCoordinate.y === endCoordinate.y
    );
  }

  #makePath(startCoordinate, endCoordinate) {
    const path = [];

    // Intuitively, the start coordinate should be "before" the end coordinate
    if (
      startCoordinate.y > endCoordinate.y ||
      startCoordinate.x > endCoordinate.x
    ) {
      [startCoordinate, endCoordinate] = [endCoordinate, startCoordinate];
    }

    // A shared x-axis means that the path is vertical
    if (startCoordinate.x === endCoordinate.x) {
      for (let row = startCoordinate.y; row <= endCoordinate.y; row++) {
        path.push(new Coordinate(startCoordinate.x, row));
      }
    } else {
      for (
        let column = startCoordinate.x;
        column <= endCoordinate.x;
        column++
      ) {
        path.push(new Coordinate(column, startCoordinate.y));
      }
    }

    return path;
  }

  #isWellSized(path) {
    return 2 <= path.length && path.length <= 5;
  }

  #isVacant(path) {
    return path.every((coordinate) => !this.#board[coordinate.y][coordinate.x]);
  }
}
