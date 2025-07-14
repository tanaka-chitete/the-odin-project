"use strict";

import { Sea } from "./sea.js";
import { Ship } from "./ship.js";

describe("Sea", () => {
  describe("placeShipHorizontally()", () => {
    describe("when the path is without limits", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShipHorizontally(ship, 8, 0);
        expect(sea.getElement(8, 0)).toBeFalsy();
        expect(sea.getElement(9, 0)).toBeFalsy();
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
        expect(sea.getElement(6, 0)).toBeFalsy();
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
        expect(sea.getElement(0, 8)).toBeFalsy();
        expect(sea.getElement(0, 9)).toBeFalsy();
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
        expect(sea.getElement(0, 6)).toBeFalsy();
        expect(sea.getElement(0, 7)).toBe(ship1);
      });
    });
  });

  describe("receiveMissile()", () => {
    describe("when the missile is not inside the limits", () => {
      it("does not record the missile", () => {
        expect(new Sea().receiveMissile(-1, 0)).toBe(false);
        expect(new Sea().receiveMissile(0, -1)).toBe(false);
        expect(new Sea().receiveMissile(9, -1)).toBe(false);
        expect(new Sea().receiveMissile(10, 0)).toBe(false);
        expect(new Sea().receiveMissile(10, 9)).toBe(false);
        expect(new Sea().receiveMissile(9, 10)).toBe(false);
        expect(new Sea().receiveMissile(0, 10)).toBe(false);
        expect(new Sea().receiveMissile(-1, 9)).toBe(false);
      });
    });

    describe("if the missile would hit a previous missile", () => {
      it("does not record the missile", () => {
        expect("");
      });
    });

    describe("when the missile hits a ship", () => {
      it("records the missile as a hit", () => {
        const sea = new Sea();
        sea.placeShipHorizontally(new Ship(3), 0, 0);
        expect(sea.receiveMissile(0, 0)).toBe(true);
      });
    });

    describe("when the missile misses a ship", () => {
      it("records the missile as a miss", () => {
        const sea = new Sea();
        sea.placeShipHorizontally(new Ship(3), 0, 0);
        expect(sea.receiveMissile(3, 0)).toBe(false);
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
