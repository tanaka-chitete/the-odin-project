"use strict";

import { Ship } from "./ship";

describe("Ship", () => {
  describe("constructor", () => {
    it("constructs an object with an in-range length", () => {
      expect(() => new Ship(2)).not.toThrow();
      expect(() => new Ship(3)).not.toThrow();
      expect(() => new Ship(4)).not.toThrow();
      expect(() => new Ship(5)).not.toThrow();
    });

    it("does not construct an object with an out-of-range length", () => {
      expect(() => new Ship(1)).toThrow();
      expect(() => new Ship(6)).toThrow();
    });
  });

  describe("length", () => {
    it("is retrievable", () => expect(new Ship(2).length).toBe(2));

    it("is immutable", () =>
      expect(() => (new Ship(2).length = null)).toThrow());
  });

  describe("hit()", () => {
    it("hits the ship once at a time, sinking it", () => {
      const ship = new Ship(3);
      expect(ship.hit()).toBe(true);
      expect(ship.hit()).toBe(true);
      expect(ship.hit()).toBe(true);
      expect(ship.hit()).toBe(false);
    });
  });

  describe("isSunk()", () => {
    it("returns true only after the ship is sunk", () => {
      const ship = new Ship(3);
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
