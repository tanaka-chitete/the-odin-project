"use strict";

import { Ship } from "./ship.js";

describe("Ship", () => {
  describe("constructor()", () => {
    describe("when the length is without limits", () => {
      it("does not construct an object", () => {
        expect(() => new Ship(0)).toThrow();
        expect(() => new Ship(6)).toThrow();
      });
    });

    describe("when the length is within limits", () => {
      it("constructs an object", () => {
        expect(new Ship(3).getLength()).toBe(3);
        expect(new Ship(3).getIntegrity()).toBe(3);
      });
    });
  });

  describe("receiveMissile()", () => {
    describe("when the ship is afloat", () => {
      it("receives the missile", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        expect(ship.getIntegrity()).toBe(2);
      });
    });

    describe("when the ship is sunk", () => {
      it("does not receive the missile", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        ship.receiveMissile();
        ship.receiveMissile();
        expect(ship.getIntegrity()).toBe(0);
      });
    });
  });

  describe("isActive()", () => {
    describe("when the ship is afloat", () => {
      it("states that the ship is active", () => {
        const ship = new Ship(3);
        expect(ship.isActive()).toBe(true);
      });
    });

    describe("when the ship is sunk", () => {
      it("states that the ship is not active", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        ship.receiveMissile();
        ship.receiveMissile();
        expect(ship.isActive()).toBe(false);
      });
    });
  });
});
