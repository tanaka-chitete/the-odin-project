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

  describe("allocation", () => {
    it("is retrievable", () => expect(new Player().allocation).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player().allocation = null)).toThrow();
    });
  });

  describe("place()", () =>
    it("is defined", () => expect(new Player("Player 1").place).toBeDefined()));

  describe("receive()", () =>
    it("is defined", () =>
      expect(new Player("Player 1").receive).toBeDefined()));

  describe("isLoser()", () =>
    it("is defined", () =>
      expect(new Player("Player 1").isLoser).toBeDefined()));
});
