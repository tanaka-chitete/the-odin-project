"use strict";

import { Board } from "./board";

describe("Board", () => {
  describe("board", () => {
    it("is retrievable", () => expect(new Board().board).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Board().board = null)).toThrow();
    });
  });

  describe("allocation", () => {
    it("is retrievable", () => expect(new Board().allocation).toBeDefined());

    it("is immutable", () => {
      expect(() => (new Board().allocation = null)).toThrow();
    });
  });

  describe("place()", () => {
    it("places a ship on a valid path (integer-only, in-bounds, space-aligned, allocation-adherent, and vacant)", () => {
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

    it("does not place a ship on an invalid path (allocation-violating)", () => {
      let board = new Board();
      expect(board.place(0, 0, 4, 0)).toBe(true);
      expect(board.place(0, 1, 4, 1)).toBe(false);

      board = new Board();
      expect(board.place(0, 0, 3, 0)).toBe(true);
      expect(board.place(0, 1, 3, 1)).toBe(true);
      expect(board.place(0, 2, 3, 2)).toBe(false);

      board = new Board();
      expect(board.place(0, 0, 2, 0)).toBe(true);
      expect(board.place(0, 1, 2, 1)).toBe(true);
      expect(board.place(0, 2, 2, 2)).toBe(true);
      expect(board.place(0, 3, 2, 3)).toBe(false);

      board = new Board();
      expect(board.place(0, 0, 1, 0)).toBe(true);
      expect(board.place(0, 1, 1, 1)).toBe(true);
      expect(board.place(0, 2, 1, 2)).toBe(true);
      expect(board.place(0, 3, 1, 3)).toBe(true);
      expect(board.place(0, 4, 1, 4)).toBe(false);

      board = new Board();
      expect(board.place(0, 0, 0, 0)).toBe(true);
      expect(board.place(0, 1, 0, 1)).toBe(true);
      expect(board.place(0, 2, 0, 2)).toBe(true);
      expect(board.place(0, 3, 0, 3)).toBe(true);
      expect(board.place(0, 4, 0, 4)).toBe(true);
      expect(board.place(0, 5, 0, 5)).toBe(false);
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
    it("receives a missile launched at a valid coordinate, hitting a ship (integer-only, in-bound, and un-hit)", () => {
      let board = new Board();
      board.place(0, 0, 1, 0);
      expect(board.receive(0, 0)).toBe(true);

      board = new Board();
      board.place(9, 0, 9, 1);
      expect(board.receive(9, 0)).toBe(true);

      board = new Board();
      board.place(9, 9, 8, 9);
      expect(board.receive(9, 9)).toBe(true);

      board = new Board();
      board.place(0, 9, 0, 8);
      expect(board.receive(0, 9)).toBe(true);
    });

    it("receives a missile launched at a valid coordinate, missing a ship (integer-only, in-bounds, and un-hit)", () => {
      expect(new Board().receive(0, 0)).toBe(false);
      expect(new Board().receive(9, 0)).toBe(false);
      expect(new Board().receive(9, 9)).toBe(false);
      expect(new Board().receive(0, 9)).toBe(false);
    });

    it("does not receive a missile launched at an invalid coordinate (non-integer)", () => {
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

    it("does not receive a missile launched at an invalid coordinate (out-of-bounds)", () => {
      expect(new Board().receive(-1, 0)).toBe(false);
      expect(new Board().receive(0, -1)).toBe(false);
      expect(new Board().receive(9, -1)).toBe(false);
      expect(new Board().receive(10, 0)).toBe(false);
      expect(new Board().receive(10, 9)).toBe(false);
      expect(new Board().receive(9, 10)).toBe(false);
      expect(new Board().receive(0, 10)).toBe(false);
      expect(new Board().receive(-1, 9)).toBe(false);
    });

    it("does not receive a missile launched at an invalid coordinate (previously-hit)", () => {
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
    it("only returns true if no ships have been placed", () => {
      let board = new Board();
      expect(new Board().isEmpty()).toBe(true);

      board = new Board();
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
  });

  describe("isFull()", () => {
    it("only returns true if all ships have been placed", () => {
      const board = new Board();
      board.place(0, 0, 4, 0);
      expect(board.isFull()).toBe(false);

      board.place(0, 0, 3, 0);
      expect(board.isFull()).toBe(false);
      board.place(0, 1, 3, 1);
      expect(board.isFull()).toBe(false);

      board.place(0, 0, 2, 0);
      expect(board.isFull()).toBe(false);
      board.place(0, 1, 2, 1);
      expect(board.isFull()).toBe(false);
      board.place(0, 2, 2, 2);
      expect(board.isFull()).toBe(false);

      board.place(0, 0, 1, 0);
      expect(board.isFull()).toBe(false);
      board.place(0, 1, 1, 1);
      expect(board.isFull()).toBe(false);
      board.place(0, 2, 1, 2);
      expect(board.isFull()).toBe(false);
      board.place(0, 3, 1, 3);
      expect(board.isFull()).toBe(false);

      board.place(0, 0, 0, 0);
      expect(board.isFull()).toBe(false);
      board.place(0, 1, 0, 1);
      expect(board.isFull()).toBe(false);
      board.place(0, 2, 0, 2);
      expect(board.isFull()).toBe(false);
      board.place(0, 3, 0, 3);
      expect(board.isFull()).toBe(false);
      board.place(0, 4, 0, 4);
      expect(board.isFull()).toBe(true);
    });
  });
});
