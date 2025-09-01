"use strict";

import { Ship } from "./ship.js";

describe("Ship", () => {
  describe("constructor()", () => {
    describe("if the size is outside limits", () => {
      it("does not construct an object", () => {
        expect(() => new Ship(1)).toThrow();
        expect(() => new Ship(6)).toThrow();
      });
    });
  });

  describe("getLength()", () => {
    it("gets the size", () => {
      expect(new Ship(3).getLength()).toBe(3);
    });
  });

  describe("getIntegrity()", () => {
    it("gets the integrity", () => {
      expect(new Ship(3).getIntegrity()).toBe(3);
    });
  });

  describe("receiveMissile()", () => {
    describe("if the ship is afloat", () => {
      it("records a hit", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        expect(ship.getIntegrity()).toBe(2);
      });
    });

    describe("if the ship is not afloat", () => {
      it("does not record a hit", () => {
        const ship = new Ship(3);
        ship.receiveMissile();
        ship.receiveMissile();
        ship.receiveMissile();
        expect(ship.getIntegrity()).toBe(0);
      });
    });
  });

  describe("isAfloat()", () => {
    describe("if the ship is afloat", () => {
      it("confirms the ship is afloat", () => {
        const ship = new Ship(3);
        expect(ship.isAfloat()).toBe(true);
      });
    });

    describe("if the ship is not afloat", () => {
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
