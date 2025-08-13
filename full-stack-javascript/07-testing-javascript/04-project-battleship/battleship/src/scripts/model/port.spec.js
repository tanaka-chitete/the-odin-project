"use strict";

import { Port } from "./port.js";
import { Ship } from "./ship.js";

describe("Port", () => {
  describe("hasShip()", () => {
    describe("when the port has the ship", () => {
      it("confirms the port has the ship", () => {
        const ship = new Ship(3);
        const port = new Port([ship]);
        expect(port.hasShip(3)).toBe(true);
      });
    });

    describe("when the port does not have the ship", () => {
      it("denies the port has the ship", () => {
        const ship = new Ship(3);
        const port = new Port([ship]);
        expect(port.hasShip(4)).toBe(false);
      });
    });
  });

  describe("popShip()", () => {
    describe("when the port has the ship", () => {
      it("gets the ship from the port", () => {
        const ship = new Ship(3);
        const port = new Port([ship]);
        expect(port.popShip(3)).toBe(ship);
      });

      it("removes the ship from the port", () => {
        const ship = new Ship(3);
        const port = new Port([ship]);
        port.popShip(3);
        expect(port.popShip(3)).toBe(null);
      });
    });

    describe("when the port does not have the ship", () => {
      it("does not remove anything", () => {
        const ship = new Ship(3);
        const port = new Port([ship]);
        expect(port.popShip(4)).toBe(null);
      });
    });
  });
});
