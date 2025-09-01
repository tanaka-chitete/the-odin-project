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

  getElement(x, y) {
    if (
      x < 0 ||
      x > this.#map.length - 1 ||
      y < 0 ||
      y > this.#map.length - 1
    ) {
      throw new Error("Coordinates must be inside limits");
    }

    return this.#map[y][x];
  }

  receiveShip(ship, x, y) {
    if (
      x < 0 ||
      x > this.#map.length - 1 ||
      y < 0 ||
      y > this.#map.length - 1
    ) {
      throw new Error("Coordinates must be inside limits");
    }

    for (let j = x; j < x + ship.getLength(); j++) {
      if (j > this.#map.length - 1 || this.#map[y][j] !== null) {
        throw new Error("Path must be unobstructed");
      }
    }

    for (let j = x; j < x + ship.getLength(); j++) {
      this.#map[y][j] = ship;
    }
  }

  rotateShip(x, y) {
    if (
      x < 0 ||
      x > this.#map.length - 1 ||
      y < 0 ||
      y > this.#map.length - 1
    ) {
      throw new Error("Coordinates must be inside limits");
    }

    if (!(this.#map[y][x] instanceof Ship)) {
      throw new Error("Ship must have been received");
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
      for (let i = y + 1; i < y + ship.getLength(); i++) {
        if (i > this.#map.length - 1 || this.#map[i][x] !== null) {
          return;
        }
      }

      for (let j = x + 1; j < x + ship.getLength(); j++) {
        this.#map[y][j] = null;
      }

      for (let i = y + 1; i < y + ship.getLength(); i++) {
        this.#map[i][x] = ship;
      }
    } else {
      for (let j = x + 1; j < x + ship.getLength(); j++) {
        if (j > this.#map.length - 1 || this.#map[y][j] !== null) {
          return;
        }
      }

      for (let i = y + 1; i < y + ship.getLength(); i++) {
        this.#map[i][x] = null;
      }

      for (let j = x + 1; j < x + ship.getLength(); j++) {
        this.#map[y][j] = ship;
      }
    }
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

  getLength() {
    return this.#map.length;
  }
}
