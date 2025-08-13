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

  getLength() {
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

  placeShipHorizontally(ship, x, y) {
    if (!(x >= 0 && x + ship.getLength() - 1 <= 9 && y >= 0 && y <= 9)) {
      return;
    }

    let vacant = true;
    let j = x;
    while (vacant && j < x + ship.getLength()) {
      if (this.#map[y][j]) {
        vacant = false;
      }
      j++;
    }

    if (!vacant) {
      return;
    }

    for (let j = x; j < x + ship.getLength(); j++) {
      this.#map[y][j] = ship;
    }
  }

  placeShipVertically(ship, x, y) {
    if (!(x >= 0 && x <= 9 && y >= 0 && y + ship.getLength() - 1 <= 9)) {
      return;
    }

    let vacant = true;
    let i = y;
    while (vacant && i < y + ship.getLength()) {
      if (this.#map[i][x]) {
        vacant = false;
      }
      i++;
    }

    if (!vacant) {
      return;
    }

    for (let i = y; i < y + ship.getLength(); i++) {
      this.#map[i][x] = ship;
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
      this.#map[y][x].recordHit();
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
