"use strict";

import { Port } from "./port";
import { Ship } from "./ship";

describe("Port", () => {
  let port;
  let ship;

  beforeEach(() => {
    ship = new Ship(1);
    port = new Port([ship]);
  });

  describe("hasShip()", () => {
    describe("when the ship is available", () => {
      it("states the ship is available", () => {
        expect(port.hasShip(1)).toBe(true);
      });
    });

    describe("when the ship is unavailable", () => {
      it("states the ship is unavailable", () => {
        expect(port.hasShip(0)).toBe(false);
      });
    });
  });

  describe("removeShip()", () => {
    describe("when the ship is available", () => {
      it("removes the ship from the port", () => {
        expect(port.removeShip(1)).toBe(ship);
        expect(port.removeShip(1)).toBe(null);
      });
    });

    describe("when the ship is unavailable", () => {
      it("removes nothing", () => {
        expect(port.removeShip(0)).toBe(null);
      });
    });
  });
});
