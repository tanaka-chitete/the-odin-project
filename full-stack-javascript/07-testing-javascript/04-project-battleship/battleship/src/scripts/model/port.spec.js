"use strict";

import { Port } from "./port.js";
import { Ship } from "./ship.js";

describe("Port", () => {
  describe("hasShip()", () => {
    describe("if the port has the ship", () => {
      it("confirms the port has the ship", () => {
        const port = new Port();
        expect(port.hasShip(5)).toBe(true);
        expect(port.hasShip(4)).toBe(true);
        expect(port.hasShip(3)).toBe(true);
        expect(port.hasShip(2)).toBe(true);
      });
    });

    describe("if the port does not have the ship", () => {
      it("denies the port has the ship", () => {
        const port = new Port();
        expect(port.hasShip(6)).toBe(false);
        expect(port.hasShip(1)).toBe(false);
      });
    });
  });

  describe("popShip()", () => {
    describe("if the port has the ship", () => {
      it("gets the ship from the port", () => {
        const port = new Port();
        expect(port.popShip(5)).toBeInstanceOf(Ship);
      });

      it("removes the ship from the port", () => {
        const port = new Port();
        port.popShip(5);
        expect(port.popShip(5)).toBe(null);
      });
    });

    describe("if the port does not have the ship", () => {
      it("does not remove anything", () => {
        const port = new Port();
        expect(port.popShip(6)).toBe(null);
      });
    });
  });

  describe("isEmpty()", () => {
    describe("if there are no ships", () => {
      it("confirms it is empty", () => {
        const port = new Port();
        port.popShip(5);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(4);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(4);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.popShip(2);
        expect(new Port().isEmpty()).toBe(true);
      });
    });
  });
});
