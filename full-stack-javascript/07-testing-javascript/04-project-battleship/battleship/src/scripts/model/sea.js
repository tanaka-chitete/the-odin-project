"use strict";

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

  placeShip(ship, x, y) {
    if (!(x >= 0 && x + ship.getSize() - 1 <= 9 && y >= 0 && y <= 9)) {
      return;
    }

    let vacant = true;
    let j = x;
    while (vacant && j < x + ship.getSize()) {
      if (this.#map[y][j]) {
        vacant = false;
      }
      j++;
    }

    if (!vacant) {
      return;
    }

    for (let j = x; j < x + ship.getSize(); j++) {
      this.#map[y][j] = ship;
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
}
