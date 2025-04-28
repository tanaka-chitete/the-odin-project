"use strict";

import { Board } from "./board";

describe("Board", () => {
  describe("place()", () => {
    test.each([
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [9, 0, 8, 0],
      [9, 0, 9, 1],
      [9, 9, 9, 8],
      [9, 9, 8, 9],
      [0, 9, 1, 9],
      [0, 9, 0, 8],
    ])(
      "places a ship at x1 = %i, y1 = %i, x2 = %i, y2 = %i",
      (x1, y1, x2, y2) => expect(new Board().place(x1, y1, x2, y2)).toBe(true)
    );

    // it("places a ship on a valid path: (1) integer-only (2) in-bounds, (3) aligns with board spaces, (4) well-sized (2 to 5 spaces in length), and (5) vacant", () => {
    //   const tests = ;
    //   tests.forEach(([x1, y1, x2, y2]) =>
    //     expect(new Board().place(x1, y1, x2, y2)).toBe(true)
    //   );
    // });

    it("does not place a ship on a non-integer path", () => {
      const tests = [
        [0.1, 0, 0, 1],
        ["0", 0, 0, 1],
        [Infinity, 0, 0, 1],
        [NaN, 0, 0, 1],
        [null, 0, 0, 1],
        [undefined, 0, 0, 1],
        [0, 0.1, 0, 1],
        [0, "0", 0, 1],
        [0, Infinity, 0, 1],
        [0, NaN, 0, 1],
        [0, null, 0, 1],
        [0, undefined, 0, 1],
        [0, 0, 0.1, 1],
        [0, 0, "0", 1],
        [0, 0, Infinity, 1],
        [0, 0, NaN, 1],
        [0, 0, null, 1],
        [0, 0, undefined, 1],
        [0, 0, 0, 1.1],
        [0, 0, 0, "1"],
        [0, 0, 0, Infinity],
        [0, 0, 0, NaN],
        [0, 0, 0, null],
        [0, 0, 0, undefined],
      ];

      tests.forEach(([x1, y1, x2, y2]) =>
        expect(new Board().place(x1, y1, x2, y2)).toBe(false)
      );
    });

    it("does not place a ship on an out-of-bounds path", () => {
      expect(new Board().place(-1, 0, 0, 0)).toBe(false);
      expect(new Board().place(0, -1, 0, 0)).toBe(false);
      expect(new Board().place(9, -1, 9, 0)).toBe(false);
      expect(new Board().place(10, 0, 9, 0)).toBe(false);
      expect(new Board().place(10, 9, 9, 9)).toBe(false);
      expect(new Board().place(9, 10, 9, 9)).toBe(false);
      expect(new Board().place(0, 10, 0, 9)).toBe(false);
      expect(new Board().place(-1, 9, 0, 9)).toBe(false);
    });

    it("does not place a ship on a non-aligned path", () => {
      expect(new Board().place(0, 0, 1, 1)).toBe(false);
      expect(new Board().place(9, 0, 8, 1)).toBe(false);
      expect(new Board().place(9, 9, 8, 8)).toBe(false);
      expect(new Board().place(0, 9, 1, 8)).toBe(false);
    });

    it("does not place a ship on a poorly-sized path", () => {
      expect(new Board().place(0, 0, 0, 5)).toBe(false);
      expect(new Board().place(0, 0, 5, 0)).toBe(false);
      expect(new Board().place(9, 0, 4, 0)).toBe(false);
      expect(new Board().place(9, 0, 9, 5)).toBe(false);
      expect(new Board().place(9, 9, 9, 4)).toBe(false);
      expect(new Board().place(9, 9, 4, 9)).toBe(false);
      expect(new Board().place(0, 9, 5, 9)).toBe(false);
      expect(new Board().place(0, 9, 0, 4)).toBe(false);
    });

    it("does not place a ship on an occupied path", () => {
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

  describe("fire()", () => {
    it("it fires at an in-bound coordinate", () => {
      expect(new Board().fire(0, 0)).toBe(false);
      expect(new Board().fire(9, 0)).toBe(false);
      expect(new Board().fire(9, 9)).toBe(false);
      expect(new Board().fire(0, 9)).toBe(false);
    });

    it("does not fire at a previously-hit coordinate", () => {
      let board = new Board();
      board.fire(0, 0);
      expect(board.fire(0, 0)).toBe(false);

      board = new Board();
      board.fire(9, 0);
      expect(board.fire(9, 0)).toBe(false);

      board = new Board();
      board.fire(9, 9);
      expect(board.fire(9, 9)).toBe(false);

      board = new Board();
      board.fire(0, 9);
      expect(board.fire(0, 9)).toBe(false);
    });

    it("does not fire at an out-of-bounds coordinate", () => {
      expect(new Board().fire(-1, 0)).toBe(false);
      expect(new Board().fire(0, -1)).toBe(false);
      expect(new Board().fire(9, -1)).toBe(false);
      expect(new Board().fire(10, 0)).toBe(false);
      expect(new Board().fire(10, 9)).toBe(false);
      expect(new Board().fire(9, 10)).toBe(false);
      expect(new Board().fire(0, 10)).toBe(false);
      expect(new Board().fire(-1, 9)).toBe(false);
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
