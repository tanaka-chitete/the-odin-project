"use strict";

import { Board } from "./board";
import { Player } from "./player";

describe("Player", () => {
  describe("constructor", () => {
    describe("board", () => {
      it("is a Board object", () =>
        expect(new Player().board).toBeInstanceOf(Board));

      it("is immutable", () => {
        expect(() => (new Player().board = null)).toThrow();
      });
    });
  });
});
