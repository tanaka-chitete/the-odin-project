"use strict";

import { Board } from "./board";
import { Coordinate } from "./coordinate";

describe("Board", () => {
  describe("place()", () => {
    it("does not place a ship at an under-dimensions (negative) position", () => {
      expect(
        new Board().place(new Coordinate(-1, 0), new Coordinate(0, 0))
      ).toBe(false);

      // expect(
      //   new Board().place(new Ship(2), [
      //     new Coordinate(0, -1),
      //     new Coordinate(0, 0),
      //   ])
      // ).toBe(false);

      // expect(
      //   new Board().place(new Ship(2), [
      //     new Coordinate(0, 0),
      //     new Coordinate(-1, 0),
      //   ])
      // ).toBe(false);

      // expect(
      //   new Board().place(new Ship(2), [
      //     new Coordinate(0, 0),
      //     new Coordinate(0, -1),
      //   ])
      // ).toBe(false);
    });

    // it("only places the ship at linear coordinates", () => {
    //   // Doesn't place diagonally
    //   // Doesn't place scattered
    //   // Doesn't place in a box
    // })

    // it("does not place a ship at an over-dimensions (>=10) position", () => {
    //   expect(
    //     new Board().place(new Ship(2), [
    //       new Coordinate(10, 0),
    //       new Coordinate(0, 0),
    //     ])
    //   ).toBe(false);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 10),
    //   //     new Coordinate(0, 0),
    //   //   ])
    //   // ).toBe(false);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 0),
    //   //     new Coordinate(10, 0),
    //   //   ])
    //   // ).toBe(false);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 0),
    //   //     new Coordinate(0, 10),
    //   //   ])
    //   // ).toBe(false);
    // });

    // it("places ship at in-bound position", () => {
    //   expect(
    //     new Board().place(new Ship(2), [
    //       new Coordinate(0, 0),
    //       new Coordinate(0, 1),
    //     ])
    //   ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 0),
    //   //     new Coordinate(1, 0),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 9),
    //   //     new Coordinate(0, 8),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(0, 9),
    //   //     new Coordinate(1, 9),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(9, 9),
    //   //     new Coordinate(8, 9),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(9, 9),
    //   //     new Coordinate(9, 8),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(9, 0),
    //   //     new Coordinate(9, 1),
    //   //   ])
    //   // ).toBe(true);

    //   // expect(
    //   //   new Board().place(new Ship(2), [
    //   //     new Coordinate(9, 0),
    //   //     new Coordinate(8, 0),
    //   //   ])
    //   // ).toBe(true);
    // });

    // it("does not place ship at currently-occupied position", () => {
    //   const board = new Board();

    //   expect(
    //     board.place(new Ship(2), [new Coordinate(0, 0), new Coordinate(0, 1)])
    //   ).toBe(true);

    //   // expect(
    //   //   board.place(new Ship(2), [new Coordinate(0, 0), new Coordinate(0, 1)])
    //   // ).toBe(false);
    // });

    // it("does not place ship at non-inline coordinates", () => {
    //   expect(
    //     new Board().place(new Ship(3), [
    //       new Coordinate(0, 0),
    //       new Coordinate(1, 0),
    //       new Coordinate(1, 1),
    //     ])
    //   ).toBe(false);
    // });

    // it("does not place ship at non-consecutive coordinates", () => {
    //   expect(
    //     new Board().place(new Ship(2), [
    //       new Coordinate(0, 0),
    //       new Coordinate(2, 0),
    //     ])
    //   ).toBe(false);
    // });
  });
});
