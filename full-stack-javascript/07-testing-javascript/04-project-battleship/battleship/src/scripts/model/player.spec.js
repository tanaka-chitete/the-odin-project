"use strict";

import { Player } from "./player";

describe("Player", () => {
  describe("name", () => {
    it("is retrievable", () =>
      expect(new Player("Player 1").name).toBe("Player 1"));

    it("is immutable", () => {
      expect(() => (new Player("Player 1").name = null)).toThrow();
    });
  });

  describe("board", () => {
    it("is retrievable", () =>
      expect(new Player("Player 1").board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player("Player 1").board = null)).toThrow();
    });
  });
});
