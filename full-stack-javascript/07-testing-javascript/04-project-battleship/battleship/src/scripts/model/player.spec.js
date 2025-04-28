"use strict";

import { Player } from "./player";

describe("Player", () => {
  describe("board", () => {
    it("is retrievable", () => expect(new Player().board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Player().board = null)).toThrow();
    });
  });
});
