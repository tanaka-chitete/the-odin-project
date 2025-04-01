"use strict";

import { Board } from "./board";
import { Coordinates } from "./coordinates";
import { Ship } from "./ship";

describe("Board", () => {
  describe("place()", () => {
    it("does not place a ship at an under-dimensions (negative) coordinate", () => {
      expect(new Board().place(new Ship(2), new Coordinates(-1, 0, 0, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, -1, 0, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, 0, -1, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, 0, 0, -1))).toBe(
        false
      );
    });

    it("does not place a ship at an over-dimensions (>=10) coordinate", () => {
      expect(new Board().place(new Ship(2), new Coordinates(10, 0, 0, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, 10, 0, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, 0, 10, 0))).toBe(
        false
      );
      expect(new Board().place(new Ship(2), new Coordinates(0, 0, 0, 10))).toBe(
        false
      );
    });
  });
});
