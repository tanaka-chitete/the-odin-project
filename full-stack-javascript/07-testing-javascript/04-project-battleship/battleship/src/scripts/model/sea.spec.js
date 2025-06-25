"use strict";

import { Sea } from "./sea";

describe("Sea", () => {
  let sea;
  beforeEach(() => {
    sea = new Sea();
  });

  describe("placeShipHorizontally()", () => {
    describe("when the ship can be placed", () => {
      it("places the ship", () => {
        expect(sea.placeShipHorizontally(new Ship(1), 0, 0)).toBe(true);
      });
    });

    describe("when the ship would obstruct another ship", () => {
      it("does not place the ship", () => {
        sea.placeShipHorizontally(new Ship(1), 0, 0);
        expect(sea.placeShipHorizontally(new Ship(1), 0, 0)).toBe(true);
      });
    });
  });

  describe("receiveMissile()", () => {
    describe("when the missile will hit a ship", () => {
      it("receives the missile and rejects thereafter", () => {
        sea.placeShipHorizontally(new Ship(1), 0, 0);
        expect(sea.receiveMissile(0, 0)).toBe(true);
        expect(sea.receiveMissile(0, 0)).toBe(false);
      });
    });

    describe("when the missile will miss a ship", () => {
      it("receives the missile", () => {
        expect(sea.receiveMissile(0, 0)).toBe(false);
      });
    });

    describe("when the missile will miss a ship", () => {
      it("does not receive the missile", () => {
        expect(sea.receiveMissile(-1, 0)).toBe(false);
      });
    });
  });

  // describe("getElement()", () => {
  //   describe("when the element is an intact ship part", () => {
  //     it("provides the element", () => {
  //       const
  //     })
  //   });

  //   describe("when the element is a hit ship part", () => {});

  //   describe("when the element is intact water", () => {});

  //   describe("when the element is hit water", () => {});
  // });

  describe("isEmpty()", () => {});

  describe("isFull()", () => {});
});
