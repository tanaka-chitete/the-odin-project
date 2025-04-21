"use strict";

import { Board } from "./board";
import { Player } from "./player";

describe("Player", () => {
  describe("board", () => {
    it("is retrievable", () =>
      expect(new Player().board).toBeInstanceOf(Board));
    it("is immutable", () => {
      const player = new Player();
      expect(() => (player.board = new Board())).toThrow();
    });
  });
});
