"use strict";

import { Ship } from "./ship";

/**
 * Test the interface, not the implementation.
 * so, we can think of the method as being the interface, and the property as
 * the underlying implementation
 * e.g. hit() -> interface
 * e.g. hits -> implementation
 *
 * So, test hit() (since we will always need this function to play the game!).
 * But, don't test hits, since it's a glimpse into the implementation and we
 * don't want to test that. What if the hits variable is removed in the future???
 *
 */

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
    it("hits the ship only once at a time", () => {
      const ship = new Ship(2);
      expect(ship.hit()).toBe(1);
    });
    it("does not hit a previously-sunk ship", () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(() => ship.hit()).toThrow();
    });
  });

  describe("isSunk()", () => {
    it("is initially false", () => {
      const ship = new Ship(2);
      expect(ship.isSunk()).toBe(false);
    });
    it("is true when the ship is completely hit", () => {
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
