"use strict";

import { Missile } from "./missile";
import { Ship } from "./ship";

export class Sea {
  #map;

  constructor() {
    this.#map = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.#map[i] = new Array(10);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#map[i][j] = null;
      }
    }
  }

  getSize() {
    return this.#map.length;
  }

  getWidth() {
    return this.#map[0].length;
  }

  getElement(x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      return null;
    }

    return this.#map[y][x];
  }

  canReceiveShip(length, x, y) {
    if (
      x < 0 ||
      x > this.#map.length - 1 ||
      y < 0 ||
      y > this.#map.length - 1
    ) {
      return false;
    }

    if (x + length - 1 > this.#map.length) {
      return false;
    }

    let vacant = true;
    let j = x;
    while (j < x + length && vacant) {
      if (this.#map[y][j] !== null) {
        vacant = false;
      }

      j++;
    }

    if (!vacant) {
      return false;
    }

    return true;
  }

  receiveShip(ship, x, y) {
    if (!this.canReceiveShip(ship.getSize(), x, y)) {
      throw new Error("Path must be unobstructed");
    }

    for (let j = x; j < x + ship.getSize(); j++) {
      this.#map[y][j] = ship;
    }
  }

  hasReceivedShip(x, y) {
    if (
      x < 0 ||
      x > this.#map.length - 1 ||
      y < 0 ||
      y > this.#map.length - 1
    ) {
      return false;
    }

    if (!(this.#map[y][x] instanceof Ship)) {
      return false;
    }

    return true;
  }

  canRotateShip(x, y) {
    if (!this.hasReceivedShip(x, y)) {
      return false;
    }

    const ship = this.#map[y][x];
    let pivotX;
    let pivotY;
    outerLoop: for (let i = 0; i < this.#map.length; i++) {
      for (let j = 0; j < this.#map.length; j++) {
        if (this.#map[i][j] === ship) {
          pivotX = j;
          pivotY = i;
          break outerLoop;
        }
      }
    }

    const positionedHorizontally =
      this.#map[y][x + 1] === this.#map[pivotY][pivotX];

    // We need to check if positioning vertically is unobstructed
    if (positionedHorizontally) {
      for (let i = y + 1; i < y + ship.getSize(); i++) {
        if (i > this.#map.length - 1 || this.#map[i][x] !== null) {
          return false;
        }
      }
    }

    return true;
  }

  receiveMissile(missile, x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y <= 9)) {
      return;
    }

    if (this.#map[y][x] instanceof Missile) {
      return;
    }

    if (this.#map[y][x] instanceof Ship) {
      this.#map[y][x].receiveMissile();
      this.#map[y][x] = missile;
      this.#map[y][x].detonate();
    } else {
      this.#map[y][x] = missile;
    }
  }

  isEmpty() {
    let empty = true;
    let i = 0;
    while (empty && i < 10) {
      let j = 0;
      while (empty && j < 10) {
        if (this.#map[i][j]) {
          empty = false;
        }
        j++;
      }
      i++;
    }

    return empty;
  }
}
