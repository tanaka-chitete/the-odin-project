"use strict";

import { Ship } from "./ship";

describe("Ship", () => {
  describe("constructor", () => {
    it("constructs an object with a valid length (in-range)", () => {
      expect(() => new Ship(1)).not.toThrow();
      expect(() => new Ship(2)).not.toThrow();
      expect(() => new Ship(3)).not.toThrow();
      expect(() => new Ship(4)).not.toThrow();
      expect(() => new Ship(5)).not.toThrow();
    });

    it("does not construct an object with an invalid length (out-of-range)", () => {
      expect(() => new Ship(0)).toThrow();
      expect(() => new Ship(6)).toThrow();
    });
  });

  describe("length", () => {
    it("is retrievable", () => expect(new Ship(2).length).toBe(2));

    it("is immutable", () =>
      expect(() => (new Ship(2).length = null)).toThrow());
  });

  describe("hit()", () => {
    it("hits the ship if it's in a valid state (afloat)", () => {
      const ship = new Ship(3);
      expect(ship.hit()).toBe(2);
      expect(ship.hit()).toBe(1);
      expect(ship.hit()).toBe(0);
    });

    it("does not hit the ship if it's sunk", () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hit()).toBe(0);
      expect(ship.hit()).toBe(0);
      expect(ship.hit()).toBe(0);
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
