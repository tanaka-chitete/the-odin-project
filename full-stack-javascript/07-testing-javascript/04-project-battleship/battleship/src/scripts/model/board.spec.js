"use strict";

import { Board } from "./board";
import { Coordinate } from "./coordinate";

describe("Board", () => {
  describe("place()", () => {
    it("places a ship on a valid path: (1) in-bounds, (2) aligns with board spaces, (3) well-sized (2 to 5 spaces in length), and (4) vacant", () => {
      expect(
        new Board().place(new Coordinate(0, 0), new Coordinate(0, 1))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(0, 0), new Coordinate(1, 0))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(9, 0), new Coordinate(8, 0))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(9, 0), new Coordinate(9, 1))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(9, 9), new Coordinate(9, 8))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(9, 9), new Coordinate(8, 9))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(0, 9), new Coordinate(1, 9))
      ).toBe(true);

      expect(
        new Board().place(new Coordinate(0, 9), new Coordinate(0, 8))
      ).toBe(true);
    });

    it("does not place a ship on an out-of-bounds path", () => {
      expect(
        new Board().place(new Coordinate(-1, 0), new Coordinate(0, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(0, -1), new Coordinate(0, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, -1), new Coordinate(9, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(10, 0), new Coordinate(9, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(10, 9), new Coordinate(9, 9))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, 10), new Coordinate(9, 9))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(0, 10), new Coordinate(0, 9))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(-1, 9), new Coordinate(0, 9))
      ).toBe(false);
    });

    it("does not place a ship on a path that doesn't align with board spaces", () => {
      expect(new Board().place(new Coordinate(0, 0), (1, 1))).toBe(false);

      expect(new Board().place(new Coordinate(9, 0), (8, 1))).toBe(false);

      expect(new Board().place(new Coordinate(9, 9), (8, 8))).toBe(false);

      expect(new Board().place(new Coordinate(0, 9), (1, 8))).toBe(false);
    });

    it("does not place a ship on a path that isn't well-sized", () => {
      expect(
        new Board().place(new Coordinate(0, 0), new Coordinate(0, 5))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(0, 0), new Coordinate(5, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, 0), new Coordinate(4, 0))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, 0), new Coordinate(9, 5))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, 9), new Coordinate(9, 4))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(9, 9), new Coordinate(4, 9))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(0, 9), new Coordinate(5, 9))
      ).toBe(false);

      expect(
        new Board().place(new Coordinate(0, 9), new Coordinate(0, 4))
      ).toBe(false);
    });

    it("does not place a ship on an occupied path", () => {
      let board = new Board();
      expect(board.place(new Coordinate(0, 0), new Coordinate(0, 1))).toBe(
        true
      );
      expect(board.place(new Coordinate(0, 1), new Coordinate(0, 2))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(0, 0), new Coordinate(1, 0))).toBe(
        true
      );
      expect(board.place(new Coordinate(1, 0), new Coordinate(2, 0))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(9, 0), new Coordinate(8, 0))).toBe(
        true
      );
      expect(board.place(new Coordinate(8, 0), new Coordinate(7, 0))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(9, 0), new Coordinate(9, 1))).toBe(
        true
      );
      expect(board.place(new Coordinate(9, 1), new Coordinate(9, 2))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(9, 9), new Coordinate(9, 8))).toBe(
        true
      );
      expect(board.place(new Coordinate(9, 8), new Coordinate(9, 7))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(9, 9), new Coordinate(8, 9))).toBe(
        true
      );
      expect(board.place(new Coordinate(8, 9), new Coordinate(7, 9))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(0, 9), new Coordinate(1, 9))).toBe(
        true
      );
      expect(board.place(new Coordinate(1, 9), new Coordinate(2, 9))).toBe(
        false
      );

      board = new Board();
      expect(board.place(new Coordinate(0, 9), new Coordinate(0, 8))).toBe(
        true
      );
      expect(board.place(new Coordinate(0, 8), new Coordinate(0, 7))).toBe(
        false
      );
    });
  });

  describe("fire()", () => {
    it("does not fire at an out-of-bounds coordinate", () => {
      expect(new Board().fire(new Coordinate(-1, 0))).toBe(false);
      expect(new Board().fire(new Coordinate(0, -1))).toBe(false);
      expect(new Board().fire(new Coordinate(9, -1))).toBe(false);
      expect(new Board().fire(new Coordinate(10, 0))).toBe(false);
      expect(new Board().fire(new Coordinate(10, 9))).toBe(false);
      expect(new Board().fire(new Coordinate(9, 10))).toBe(false);
      expect(new Board().fire(new Coordinate(0, 10))).toBe(false);
      expect(new Board().fire(new Coordinate(-1, 9))).toBe(false);
    });

    it("does not fire at a previously-hit coordinate", () => {
      let board = new Board();
      board.fire(new Coordinate(0, 0));
      expect(board.fire(new Coordinate(0, 0))).toBe(false);

      board = new Board();
      board.fire(new Coordinate(9, 0));
      expect(board.fire(new Coordinate(9, 0))).toBe(false);

      board = new Board();
      board.fire(new Coordinate(9, 9));
      expect(board.fire(new Coordinate(9, 9))).toBe(false);

      board = new Board();
      board.fire(new Coordinate(0, 9));
      expect(board.fire(new Coordinate(0, 9))).toBe(false);
    });

    it("it fires at an in-bounds coordinate, hitting a ship", () => {
      let board = new Board();
      board.place(new Coordinate(0, 0), new Coordinate(1, 0));
      expect(board.fire(new Coordinate(0, 0))).toBe(true);

      board = new Board();
      board.place(new Coordinate(9, 0), new Coordinate(9, 1));
      expect(board.fire(new Coordinate(9, 0))).toBe(true);

      board = new Board();
      board.place(new Coordinate(9, 9), new Coordinate(8, 9));
      expect(board.fire(new Coordinate(9, 9))).toBe(true);

      board = new Board();
      board.place(new Coordinate(0, 9), new Coordinate(0, 8));
      expect(board.fire(new Coordinate(0, 9))).toBe(true);
    });

    it("it fires at an in-bound coordinate, missing a ship", () => {
      expect(new Board().fire(new Coordinate(0, 0))).toBe(false);
      expect(new Board().fire(new Coordinate(9, 0))).toBe(false);
      expect(new Board().fire(new Coordinate(9, 9))).toBe(false);
      expect(new Board().fire(new Coordinate(0, 9))).toBe(false);
    });
  });

  describe("isEmpty()", () => {
    it("returns false if there is at least one ship", () => {
      let board = new Board();
      board.place(new Coordinate(0, 0), new Coordinate(0, 1));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(0, 0), new Coordinate(1, 0));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(9, 0), new Coordinate(8, 0));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(9, 0), new Coordinate(9, 1));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(9, 9), new Coordinate(9, 8));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(9, 9), new Coordinate(8, 9));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(0, 9), new Coordinate(1, 9));
      expect(board.isEmpty()).toBe(false);

      board = new Board();
      board.place(new Coordinate(0, 9), new Coordinate(0, 8));
      expect(board.isEmpty()).toBe(false);
    });

    it("returns false if there are no ships", () => {
      expect(new Board().isEmpty()).toBe(true);
    });
  });
});
