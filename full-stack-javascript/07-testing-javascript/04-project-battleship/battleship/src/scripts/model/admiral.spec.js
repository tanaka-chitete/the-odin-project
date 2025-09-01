// TODO: Rename to Commander

"use strict";

import { Admiral } from "./admiral";
import { Ship } from "./ship";

let name;
let admiral;
beforeEach(() => {
  name = "";
  admiral = new Admiral(name);
});

describe("Admiral", () => {
  describe("deployShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws an error", () => {
        expect(() => admiral.deployShip(new Ship(2), -1, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 0, -1)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, -1)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 10, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 10, 9)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 10)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 0, 10)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), -1, 9)).toThrow();
      });
    });

    describe("the path is outside limits", () => {
      it("throws an error", () => {
        expect(() => admiral.deployShip(new Ship(2), -1, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), -1, 9)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 9)).toThrow();
      });
    });

    it("deploys the ship", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);
      expect(admiral.getElement(0, 0)).toBe(ship);
      expect(admiral.getElement(1, 0)).toBe(ship);
    });
  });

  describe("rotateShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws an error", () => {
        expect(() => admiral.rotateShip(-1, 0)).toThrow();
        expect(() => admiral.rotateShip(0, -1)).toThrow();
        expect(() => admiral.rotateShip(9, -1)).toThrow();
        expect(() => admiral.rotateShip(10, 0)).toThrow();
        expect(() => admiral.rotateShip(10, 9)).toThrow();
        expect(() => admiral.rotateShip(9, 10)).toThrow();
        expect(() => admiral.rotateShip(0, 10)).toThrow();
        expect(() => admiral.rotateShip(-1, 9)).toThrow();
      });
    });

    describe("the ship is non-existent", () => {
      it("throws an error", () => {
        expect(() => admiral.rotateShip(0, 0)).toThrow();
      });
    });

    describe("the prospective path is outside limits", () => {
      it("does nothing", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 9);
        expect(admiral.getElement(0, 9)).toBe(ship);
        expect(admiral.getElement(1, 9)).toBe(ship);
      });
    });

    describe("the prospective path is obstructed", () => {
      it("does nothing", () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        admiral.deployShip(ship1, 0, 0);
        admiral.deployShip(ship2, 0, 1);
        admiral.rotateShip(0, 0);
        expect(admiral.getElement(0, 1)).toBe(ship2);
        expect(admiral.getElement(0, 1)).toBe(ship2);
      });
    });

    it("rotates the ship clockwise", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);
      admiral.rotateShip(0, 0);
      expect(admiral.getElement(0, 0)).toBe(ship);
      expect(admiral.getElement(0, 1)).toBe(ship);
      expect(admiral.getElement(1, 0)).toBe(null);
    });

    it("rotates the ship anticlockwise", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);
      admiral.rotateShip(0, 0);
      admiral.rotateShip(0, 0);
      expect(admiral.getElement(0, 0)).toBe(ship);
      expect(admiral.getElement(1, 0)).toBe(ship);
      expect(admiral.getElement(0, 1)).toBe(null);
    });
  });
});
