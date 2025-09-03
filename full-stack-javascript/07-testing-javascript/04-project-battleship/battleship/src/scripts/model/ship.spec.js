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
});
