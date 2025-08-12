"use strict";

import { Missile } from "./missile.js";
import { Sea } from "./sea.js";
import { Ship } from "./ship.js";

describe("Sea", () => {
  describe("constructor()", () => {
    it("constructs an object", () => {
      const sea = new Sea();
      expect(sea.getLength()).toBe(10);
      expect(sea.getWidth()).toBe(10);
    });
  });

  describe("placeShipHorizontally()", () => {
    describe("when the path is without limits", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipHorizontally(ship, 8, 0);
        expect(sea.getElement(8, 0)).toBe(null);
        expect(sea.getElement(9, 0)).toBe(null);
      });
    });

    describe("when the path is within limits", () => {
      it("places the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipHorizontally(ship, 7, 0);
        expect(sea.getElement(7, 0)).toBe(ship);
        expect(sea.getElement(8, 0)).toBe(ship);
        expect(sea.getElement(9, 0)).toBe(ship);
      });

      it("does not replace the ship", () => {
        const sea = new Sea();
        const ship1 = new Ship(3);
        sea.placeShipHorizontally(ship1, 7, 0);
        const ship2 = new Ship(3);
        sea.placeShipHorizontally(ship2, 6, 0);
        expect(sea.getElement(6, 0)).toBe(null);
        expect(sea.getElement(7, 0)).toBe(ship1);
      });
    });
  });

  describe("placeShipVertically()", () => {
    describe("when the path is without limits", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipVertically(ship, 0, 8);
        expect(sea.getElement(0, 8)).toBe(null);
        expect(sea.getElement(0, 9)).toBe(null);
      });
    });

    describe("when the path is within limits", () => {
      it("places the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipVertically(ship, 0, 7);
        expect(sea.getElement(0, 7)).toBe(ship);
        expect(sea.getElement(0, 8)).toBe(ship);
        expect(sea.getElement(0, 9)).toBe(ship);
      });

      it("does not replace the ship", () => {
        const sea = new Sea();
        const ship1 = new Ship(3);
        sea.placeShipVertically(ship1, 0, 7);
        const ship2 = new Ship(3);
        sea.placeShipVertically(ship2, 0, 6);
        expect(sea.getElement(0, 6)).toBe(null);
        expect(sea.getElement(0, 7)).toBe(ship1);
      });
    });
  });

  describe("recordHit()", () => {
    describe("when the missile is without limits", () => {
      it("does not record the missile", () => {
        const sea = new Sea();
        sea.receiveMissile(-1, 0);
        expect(sea.getElement(-1, 0)).toBe(null);
        sea.receiveMissile(0, -1);
        expect(sea.getElement(0, -1)).toBe(null);
        sea.receiveMissile(9, -1);
        expect(sea.getElement(9, -1)).toBe(null);
        sea.receiveMissile(10, 0);
        expect(sea.getElement(10, 0)).toBe(null);
        sea.receiveMissile(10, 9);
        expect(sea.getElement(10, 9)).toBe(null);
        sea.receiveMissile(9, 10);
        expect(sea.getElement(9, 10)).toBe(null);
        sea.receiveMissile(0, 10);
        expect(sea.getElement(0, 10)).toBe(null);
        sea.receiveMissile(-1, 9);
        expect(sea.getElement(-1, 9)).toBe(null);
      });
    });

    describe("when the missile hits a ship", () => {
      it("records the missile as a hit", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipHorizontally(ship, 0, 0);
        const missile = new Missile();
        sea.receiveMissile(missile, 0, 0);
        expect(sea.getElement(0, 0)).toBe(missile);
        expect(sea.getElement(0, 0).didDetonate()).toBe(true);
      });
    });

    describe("when the missile misses a ship", () => {
      it("records the missile as a miss", () => {
        const sea = new Sea();
        sea.placeShipHorizontally(new Ship(3), 0, 0);
        const missile = new Missile();
        sea.receiveMissile(missile, 3, 0);
        expect(sea.getElement(3, 0)).toBe(missile);
        expect(sea.getElement(3, 0).didDetonate()).toBe(false);
      });
    });
  });

  describe("isEmpty()", () => {
    describe("when there are no ships placed", () => {
      it("states that the sea is empty", () => {
        const sea = new Sea();
        expect(sea.isEmpty()).toBe(true);
      });
    });

    describe("when there is at leas one ship placed", () => {
      it("states that the sea is not empty", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipHorizontally(ship, 0, 0);
        expect(sea.isEmpty()).toBe(false);
      });
    });
  });
});
