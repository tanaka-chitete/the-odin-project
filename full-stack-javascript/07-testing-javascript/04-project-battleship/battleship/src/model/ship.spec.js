"use strict";

import { Ship } from "./ship";

describe("Ship", () => {
  describe("constructor()", () => {
    it("constructs object with an in-range length", () => {
      expect(() => new Ship(2)).not.toThrow();
      expect(() => new Ship(3)).not.toThrow();
      expect(() => new Ship(4)).not.toThrow();
      expect(() => new Ship(5)).not.toThrow();
    });

    it("does not construct object with an out-of-range length", () => {
      expect(() => new Ship(1)).toThrow();
      expect(() => new Ship(6)).toThrow();
    });
  });

  describe("length", () => {
    it("is retrievable", () => expect(new Ship(2).length).toBe(2));
    it("is immutable", () => {
      const ship = new Ship(2);
      expect(() => (ship.length = 3)).toThrow();
    });
  });

  describe("hit()", () => {
    it("hits the ship once at a time, sinking it", () => {
      const ship = new Ship(3);
      expect(ship.hit()).toBe(2);
      expect(ship.hit()).toBe(1);
      expect(ship.hit()).toBe(0);
      expect(() => ship.hit()).toThrow();
    });
  });

  describe("isSunk()", () => {
    it("is only true once the ship is sunk", () => {
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
