"use strict";

import { Port } from "./port";
import { Ship } from "./ship";

describe("hasShip()", () => {
  describe("when the ship is available", () => {
    it("states the ship is available", () => {
      const port = new Port([new Ship(1)]);
      expect(port.hasShip(1)).toBe(true);
    });
  });

  describe("when the ship is unavailable", () => {
    it("states the ship is unavailable", () => {
      const port = new Port([new Ship(1)]);
      expect(port.hasShip(0)).toBe(false);
    });
  });
});

describe("getShip()", () => {
  describe("when the ship is available", () => {
    it("retrieves the ship and removes it from the port", () => {
      const expectedShip = new Ship(1);
      const port = new Port([expectedShip]);
      const actualShip = port.getShip(1);
      expect(actualShip).toBe(expectedShip);
      expect(port.getShip(1)).toBe(null);
    });
  });

  describe("when the ship is unavailable", () => {
    it("retrieves nothing", () => {
      const port = new Port([new Ship(1)]);
      expect(port.getShip(0)).toBe(null);
    });
  });
});
