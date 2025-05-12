"use strict";

import { Player } from "./player";

describe("Player", () => {
  describe("name", () => {
    it("is retrievable", () => expect(new Player().name).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player().name = null)).toThrow();
    });
  });

  describe("board", () => {
    it("is retrievable", () => expect(new Player().board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player().board = null)).toThrow();
    });
  });

  describe("place()", () =>
    it("is defined", () => expect(new Player().place).toBeDefined()));

  describe("receive()", () =>
    it("is defined", () => expect(new Player().receive).toBeDefined()));

  describe("isLoser()", () =>
    it("is defined", () => expect(new Player().isLoser).toBeDefined()));
});
