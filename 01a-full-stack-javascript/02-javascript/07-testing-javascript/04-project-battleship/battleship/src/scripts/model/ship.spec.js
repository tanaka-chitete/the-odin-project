"use strict";

import { Ship } from "./ship.js";

describe("Ship", () => {
  describe("constructor()", () => {
    describe("the length is outside limits", () => {
      it("throws", () => {
        expect(() => new Ship(1)).toThrow();
        expect(() => new Ship(6)).toThrow();
      });
    });
  });

  describe("getLength()", () => {
    it("gets the length", () => {
      expect(new Ship(3).getLength()).toBe(3);
    });
  });
});
