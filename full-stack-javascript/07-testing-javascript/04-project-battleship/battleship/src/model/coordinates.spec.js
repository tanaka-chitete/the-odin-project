"use strict";

import { Coordinates } from "./coordinates";

describe("Coordinates", () => {
  describe("constructor()", () => {
    it("constructs object with only integer coordinates", () => {
      expect(() => new Coordinates(0, 0, 0, 0)).not.toThrow();
      expect(
        () => new Coordinates(Number.MAX_SAFE_INTEGER, 0, 0, 0)
      ).not.toThrow();
      expect(
        () => new Coordinates(0, Number.MAX_SAFE_INTEGER, 0, 0)
      ).not.toThrow();
      expect(
        () => new Coordinates(0, 0, Number.MAX_SAFE_INTEGER, 0)
      ).not.toThrow();
      expect(
        () => new Coordinates(0, 0, 0, Number.MAX_SAFE_INTEGER)
      ).not.toThrow();
    });

    it("does not construct object with a non-integer coordinate", () => {
      expect(() => new Coordinates("0", 0, 0, 0)).toThrow();
      expect(() => new Coordinates(0, "0", 0, 0)).toThrow();
      expect(() => new Coordinates(0, 0, "0", 0)).toThrow();
      expect(() => new Coordinates(0, 0, 0, "0")).toThrow();
    });
  });

  describe("startX", () => {
    it("is retrievable", () =>
      expect(new Coordinates(1, 0, 0, 0).startX).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinates(0, 0, 0, 0).startX = 1)).toThrow());
  });

  describe("startY", () => {
    it("is retrievable", () =>
      expect(new Coordinates(0, 1, 0, 0).startY).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinates(0, 0, 0, 0).startY = 1)).toThrow());
  });

  describe("endX", () => {
    it("is retrievable", () =>
      expect(new Coordinates(0, 0, 1, 0).endX).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinates(0, 0, 0, 0).endX = 1)).toThrow());
  });

  describe("endY", () => {
    it("is retrievable", () =>
      expect(new Coordinates(0, 0, 0, 1).endY).toBe(1));
    it("is immutable", () =>
      expect(() => (new Coordinates(0, 0, 0, 0).endY = 1)).toThrow());
  });
});
