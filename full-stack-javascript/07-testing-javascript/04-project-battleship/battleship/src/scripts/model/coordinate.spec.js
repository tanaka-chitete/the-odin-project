"use strict";

import { Coordinate } from "./coordinate";

describe("Coordinate", () => {
  describe("constructor", () => {
    it("constructs object with only integer axes", () => {
      expect(
        () => new Coordinate(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
      ).not.toThrow();
      expect(
        () => new Coordinate(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
      ).not.toThrow();
      expect(
        () => new Coordinate(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ).not.toThrow();
      expect(
        () => new Coordinate(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ).not.toThrow();
    });

    it("does not construct object with a non-integer axis", () => {
      expect(() => new Coordinate(expect.any(String), 0)).toThrow();
      expect(() => new Coordinate(0, expect.any(String))).toThrow();
    });
  });

  describe("x", () => {
    it("is retrievable", () => expect(new Coordinate(1, 0).x).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinate(0, 0).x = 1)).toThrow());
  });

  describe("y", () => {
    it("is retrievable", () => expect(new Coordinate(0, 1).y).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinate(0, 0).y = 1)).toThrow());
  });
});
