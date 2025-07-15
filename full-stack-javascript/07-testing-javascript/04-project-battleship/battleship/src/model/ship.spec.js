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

    describe("when the ship is not afloat", () => {
      it("does not receive the missile", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        ship.receiveMissile();
        ship.receiveMissile();
        expect(ship.getIntegrity()).toBe(0);
      });
    });
  });

  describe("isAfloat()", () => {
    describe("when the ship is afloat", () => {
      it("confirms the ship is afloat", () => {
        const ship = new Ship(3);
        expect(ship.isAfloat()).toBe(true);
      });
    });

    describe("when the ship is not afloat", () => {
      it("denies the ship is afloat", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        ship.receiveMissile();
        ship.receiveMissile();
        expect(ship.isAfloat()).toBe(false);
      });
    });
  });
});
