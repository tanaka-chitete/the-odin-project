"use strict";

import { Board } from "./board";

describe("Board", () => {
  describe("board", () => {
    it("is retrievable", () => expect(new Board().board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Board().board = null)).toThrow();
    });
  });

  describe("place()", () => {
    it("places a ship on a valid path (integer-only, in-bounds, space-aligned, well-sized, and vacant)", () => {
      expect(new Board().place(0, 0, 0, 1)).toBe(true);
      expect(new Board().place(0, 0, 1, 0)).toBe(true);
      expect(new Board().place(9, 0, 8, 0)).toBe(true);
      expect(new Board().place(9, 0, 9, 1)).toBe(true);
      expect(new Board().place(9, 9, 9, 8)).toBe(true);
      expect(new Board().place(9, 9, 8, 9)).toBe(true);
      expect(new Board().place(0, 9, 1, 9)).toBe(true);
      expect(new Board().place(0, 9, 0, 8)).toBe(true);
    });

    it("does not place a ship on an invalid path (non-integer)", () => {
      expect(new Board().place(0.1, 0, 0, 1)).toBe(false);
      expect(new Board().place("0", 0, 0, 1)).toBe(false);
      expect(new Board().place(Infinity, 0, 0, 1)).toBe(false);
      expect(new Board().place(NaN, 0, 0, 1)).toBe(false);
      expect(new Board().place(null, 0, 0, 1)).toBe(false);
      expect(new Board().place(undefined, 0, 0, 1)).toBe(false);
      expect(new Board().place(0, 0.1, 0, 1)).toBe(false);
      expect(new Board().place(0, "0", 0, 1)).toBe(false);
      expect(new Board().place(0, Infinity, 0, 1)).toBe(false);
      expect(new Board().place(0, NaN, 0, 1)).toBe(false);
      expect(new Board().place(0, null, 0, 1)).toBe(false);
      expect(new Board().place(0, undefined, 0, 1)).toBe(false);
      expect(new Board().place(0, 0, 0.1, 1)).toBe(false);
      expect(new Board().place(0, 0, "0", 1)).toBe(false);
      expect(new Board().place(0, 0, Infinity, 1)).toBe(false);
      expect(new Board().place(0, 0, NaN, 1)).toBe(false);
      expect(new Board().place(0, 0, null, 1)).toBe(false);
      expect(new Board().place(0, 0, undefined, 1)).toBe(false);
      expect(new Board().place(0, 0, 0, 1.1)).toBe(false);
      expect(new Board().place(0, 0, 0, "1")).toBe(false);
      expect(new Board().place(0, 0, 0, Infinity)).toBe(false);
      expect(new Board().place(0, 0, 0, NaN)).toBe(false);
      expect(new Board().place(0, 0, 0, null)).toBe(false);
      expect(new Board().place(0, 0, 0, undefined)).toBe(false);
    });

    it("does not place a ship on an invalid path (out-of-bounds)", () => {
      expect(new Board().place(-1, 0, 0, 0)).toBe(false);
      expect(new Board().place(0, -1, 0, 0)).toBe(false);
      expect(new Board().place(9, -1, 9, 0)).toBe(false);
      expect(new Board().place(10, 0, 9, 0)).toBe(false);
      expect(new Board().place(10, 9, 9, 9)).toBe(false);
      expect(new Board().place(9, 10, 9, 9)).toBe(false);
      expect(new Board().place(0, 10, 0, 9)).toBe(false);
      expect(new Board().place(-1, 9, 0, 9)).toBe(false);
    });

    it("does not place a ship on an invalid path (non-aligned)", () => {
      expect(new Board().place(0, 0, 1, 1)).toBe(false);
      expect(new Board().place(9, 0, 8, 1)).toBe(false);
      expect(new Board().place(9, 9, 8, 8)).toBe(false);
      expect(new Board().place(0, 9, 1, 8)).toBe(false);
    });

    it("does not place a ship on an invalid path (poorly-sized)", () => {
      expect(new Board().place(0, 0, 0, 5)).toBe(false);
      expect(new Board().place(0, 0, 5, 0)).toBe(false);
      expect(new Board().place(9, 0, 4, 0)).toBe(false);
      expect(new Board().place(9, 0, 9, 5)).toBe(false);
      expect(new Board().place(9, 9, 9, 4)).toBe(false);
      expect(new Board().place(9, 9, 4, 9)).toBe(false);
      expect(new Board().place(0, 9, 5, 9)).toBe(false);
      expect(new Board().place(0, 9, 0, 4)).toBe(false);
    });

    it("does not place a ship on an invalid path (occupied)", () => {
      let board = new Board();
      expect(board.place(0, 0, 0, 1)).toBe(true);
      expect(board.place(0, 1, 0, 2)).toBe(false);

      board = new Board();
      expect(board.place(0, 0, 1, 0)).toBe(true);
      expect(board.place(1, 0, 2, 0)).toBe(false);

      board = new Board();
      expect(board.place(9, 0, 8, 0)).toBe(true);
      expect(board.place(8, 0, 7, 0)).toBe(false);

      board = new Board();
      expect(board.place(9, 0, 9, 1)).toBe(true);
      expect(board.place(9, 1, 9, 2)).toBe(false);

      board = new Board();
      expect(board.place(9, 9, 9, 8)).toBe(true);
      expect(board.place(9, 8, 9, 7)).toBe(false);

      board = new Board();
      expect(board.place(9, 9, 8, 9)).toBe(true);
      expect(board.place(8, 9, 7, 9)).toBe(false);

      board = new Board();
      expect(board.place(0, 9, 1, 9)).toBe(true);
      expect(board.place(1, 9, 2, 9)).toBe(false);

      board = new Board();
      expect(board.place(0, 9, 0, 8)).toBe(true);
      expect(board.place(0, 8, 0, 7)).toBe(false);
    });
  });

  describe("receive()", () => {
    it("it receives a shot at a valid coordinate (integer-only, in-bounds, and un-hit)", () => {
      expect(new Board().receive(0, 0)).toBe(true);
      expect(new Board().receive(9, 0)).toBe(true);
      expect(new Board().receive(9, 9)).toBe(true);
      expect(new Board().receive(0, 9)).toBe(true);
    });

    it("does not receive shot at an invalid coordinate (non-integer)", () => {
      expect(new Board().receive(0.1, 0)).toBe(false);
      expect(new Board().receive("0", 0)).toBe(false);
      expect(new Board().receive(Infinity, 0)).toBe(false);
      expect(new Board().receive(NaN, 0)).toBe(false);
      expect(new Board().receive(null, 0)).toBe(false);
      expect(new Board().receive(undefined, 0)).toBe(false);
      expect(new Board().receive(0, 0.1)).toBe(false);
      expect(new Board().receive(0, "0")).toBe(false);
      expect(new Board().receive(0, Infinity)).toBe(false);
      expect(new Board().receive(0, NaN)).toBe(false);
      expect(new Board().receive(0, null)).toBe(false);
      expect(new Board().receive(0, undefined)).toBe(false);
    });

    it("does not receive a shot at an invalid coordinate (out-of-bounds)", () => {
      expect(new Board().receive(-1, 0)).toBe(false);
      expect(new Board().receive(0, -1)).toBe(false);
      expect(new Board().receive(9, -1)).toBe(false);
      expect(new Board().receive(10, 0)).toBe(false);
      expect(new Board().receive(10, 9)).toBe(false);
      expect(new Board().receive(9, 10)).toBe(false);
      expect(new Board().receive(0, 10)).toBe(false);
      expect(new Board().receive(-1, 9)).toBe(false);
    });

    it("does not receive a shot at an invalid coordinate (previously-hit)", () => {
      let board = new Board();
      board.receive(0, 0);
      expect(board.receive(0, 0)).toBe(false);

      board = new Board();
      board.receive(9, 0);
      expect(board.receive(9, 0)).toBe(false);

      board = new Board();
      board.receive(9, 9);
      expect(board.receive(9, 9)).toBe(false);

      board = new Board();
      board.receive(0, 9);
      expect(board.receive(0, 9)).toBe(false);
    });
  });

  describe("isEmpty()", () => {
    it("returns false if there is at least one ship", () => {
      let board = new Board();
      board.place(0, 0, 0, 1);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(0, 0, 1, 0);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(9, 0, 8, 0);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(9, 0, 9, 1);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(9, 9, 9, 8);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(9, 9, 8, 9);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(0, 9, 1, 9);
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(0, 9, 0, 8);
      expect(board.isEmpty()).toBe(false);
    });

    it("returns true if there are no ships", () => {
      expect(new Board().isEmpty()).toBe(true);
    });
  });
});
