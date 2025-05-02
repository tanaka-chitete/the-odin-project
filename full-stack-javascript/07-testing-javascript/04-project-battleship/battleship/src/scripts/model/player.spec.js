"use strict";

import { Player } from "./player";

describe("Player", () => {
  describe("board", () => {
    it("is retrievable", () => expect(new Player().board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player().board = null)).toThrow();
    });
  });

  describe("place()", () =>
    it("is defined", () => expect(new Player().place).toBeDefined()));

  describe("fire()", () =>
    it("is defined", () => expect(new Player().fire).toBeDefined()));

  describe("isLoser()", () =>
    it("is defined", () => expect(new Player().isLoser).toBeDefined()));
});
