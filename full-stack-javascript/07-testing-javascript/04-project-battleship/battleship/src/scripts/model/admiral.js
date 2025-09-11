"use strict";

import { Ship } from "./ship";
import { Missile } from "./missile";

export class Admiral {
  #name;
  #sea;

  constructor(name) {
    this.#name = name;
    this.#sea = new Sea();
  }

  deployShip(ship, x, y) {
    this.#sea.deployShip(ship, x, y);
  }

  rotateShip(x, y) {
    this.#sea.rotateShip(x, y);
  }

  recallShip(x, y) {
    this.#sea.recallShip(x, y);
  }

  hasDeployedAllShips() {
    return this.#sea.hasReceivedAllShips();
  }

  receiveMissile(missile, x, y) {
    this.#sea.receiveMissile(missile, x, y);
  }

  hasLostAllShips() {
    return this.#sea.hasLostAllShips();
  }

  issueReport() {
    return {
      issuer: this.#name,
      port: Object.fromEntries(this.#sea.shipLengthToAllocation),
      sea: this.#sea.getMap(),
    };
  }
}

class Sea {
  map;
  shipLengthToAllocation;

  constructor() {
    this.map = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.map[i] = new Array(10);
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.map[i][j] = null;
      }
    }

    this.shipLengthToAllocation = new Map([
      [5, 1],
      [4, 2],
      [3, 7],
      [2, 5],
    ]);
  }

  getMap() {
    return this.map;
  }

  deployShip(ship, x, y) {
    if (this.shipLengthToAllocation.get(ship.getLength()) <= 0) {
      return;
    }

    if (x < 0 || x > this.map.length - 1 || y < 0 || y > this.map.length - 1) {
      return;
    }

    for (let j = x; j < x + ship.getLength(); j++) {
      if (j > this.map.length - 1 || this.map[y][j] !== null) {
        return;
      }
    }

    for (let j = x; j < x + ship.getLength(); j++) {
      this.map[y][j] = ship;
    }

    this.shipLengthToAllocation.set(
      ship.getLength(),
      this.shipLengthToAllocation.get(ship.getLength()) - 1
    );
  }

  rotateShip(x, y) {
    if (x < 0 || x > this.map.length - 1 || y < 0 || y > this.map.length - 1) {
      return;
    }

    if (!(this.map[y][x] instanceof Ship)) {
      return;
    }

    const ship = this.map[y][x];
    let shipFrontX;
    let shipFrontY;
    outerLoop: for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map.length; j++) {
        if (this.map[i][j] === ship) {
          shipFrontX = j;
          shipFrontY = i;
          break outerLoop;
        }
      }
    }

    const shipLateral = this.map[y][x + 1] === this.map[shipFrontY][shipFrontX];

    // We need to check if positioning vertically is unobstructed
    if (shipLateral) {
      for (let i = y + 1; i < y + ship.getLength(); i++) {
        if (i > this.map.length - 1 || this.map[i][x] !== null) {
          return;
        }
      }

      for (let j = x + 1; j < x + ship.getLength(); j++) {
        this.map[y][j] = null;
      }

      for (let i = y + 1; i < y + ship.getLength(); i++) {
        this.map[i][x] = ship;
      }
    } else {
      for (let j = x + 1; j < x + ship.getLength(); j++) {
        if (j > this.map.length - 1 || this.map[y][j] !== null) {
          return;
        }
      }

      for (let i = y + 1; i < y + ship.getLength(); i++) {
        this.map[i][x] = null;
      }

      for (let j = x + 1; j < x + ship.getLength(); j++) {
        this.map[y][j] = ship;
      }
    }
  }

  recallShip(x, y) {
    if (x < 0 || x > this.map.length - 1 || y < 0 || y > this.map.length - 1) {
      return;
    }

    if (!(this.map[y][x] instanceof Ship)) {
      return;
    }

    const ship = this.map[y][x];

    let shipFrontX;
    let shipFrontY;
    outerLoop: for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map.length; j++) {
        if (this.map[i][j] === ship) {
          shipFrontX = j;
          shipFrontY = i;
          break outerLoop;
        }
      }
    }

    const shipLateral = this.map[shipFrontY][shipFrontX + 1] === ship;
    if (shipLateral) {
      for (let j = x; j < x + ship.getLength(); j++) {
        this.map[y][j] = null;
      }
    } else {
      for (let i = y; i < y + ship.getLength(); i++) {
        this.map[i][x] = null;
      }
    }

    this.shipLengthToAllocation.set(
      ship.getLength(),
      this.shipLengthToAllocation.get(ship.getLength()) + 1
    );
  }

  hasReceivedAllShips() {
    for (const shipLength of this.shipLengthToAllocation.keys()) {
      if (this.shipLengthToAllocation.get(shipLength) !== 0) {
        return false;
      }
    }

    return true;
  }

  receiveMissile(missile, x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return;
    }

    if (this.map[y][x] instanceof Missile) {
      return;
    }

    if (this.map[y][x] instanceof Ship) {
      this.map[y][x] = missile;
      missile.detonate();
    } else {
      this.map[y][x] = missile;
    }
  }

  hasLostAllShips() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] instanceof Ship) {
          return false;
        }
      }
    }

    return true;
  }
}
