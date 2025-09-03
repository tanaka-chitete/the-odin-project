"use strict";

import { Missile } from "./missile";
import { Ship } from "./ship";

export class Sea {
  #map;
  #allocation;

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

    this.#allocation = new Map([
      [5, 1],
      [4, 2],
      [3, 7],
      [2, 5],
    ]);
  }

  getMap() {
    return this.#map;
  }

  deployShip(ship, x, y) {
    if (this.hasReceivedAllShips()) {
      throw new Error("All ships have been received");
    }

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

    this.#allocation.set(
      ship.getLength(),
      this.#allocation.get(ship.getLength()) - 1
    );
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

  recallShip(x, y) {
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

    let xCoordinateForFrontOfShip;
    let yCoordinateForFrontOfShip;
    outerLoop: for (let i = 0; i < this.#map.length; i++) {
      for (let j = 0; j < this.#map.length; j++) {
        if (this.#map[i][j] === ship) {
          xCoordinateForFrontOfShip = j;
          yCoordinateForFrontOfShip = i;
          break outerLoop;
        }
      }
    }

    const positionedHorizontally =
      this.#map[yCoordinateForFrontOfShip][xCoordinateForFrontOfShip + 1] ===
      ship;
    if (positionedHorizontally) {
      for (let j = x; j < x + ship.getLength(); j++) {
        this.#map[y][j] = null;
      }
    } else {
      for (let i = y; i < y + ship.getLength(); i++) {
        this.#map[i][x] = null;
      }
    }

    this.#allocation.set(
      ship.getLength(),
      this.#allocation.get(ship.getLength()) + 1
    );
  }

  hasReceivedAllShips() {
    for (const lengthOfShip of this.#allocation.keys()) {
      if (this.#allocation.get(lengthOfShip) !== 0) {
        return false;
      }
    }

    return true;
  }

  receiveMissile(missile, x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error("Coordinates must be inside limits");
    }

    if (this.#map[y][x] instanceof Missile) {
      throw new Error("Target must not be another missile");
    }

    if (this.#map[y][x] instanceof Ship) {
      this.#map[y][x] = missile;
      missile.detonate();
    } else {
      this.#map[y][x] = missile;
    }
  }

  hasLostAllShips() {
    for (let i = 0; i < this.#map.length; i++) {
      for (let j = 0; j < this.#map[0].length; j++) {
        if (this.#map[i][j] instanceof Ship) {
          return false;
        }
      }
    }

    return true;
  }
}
