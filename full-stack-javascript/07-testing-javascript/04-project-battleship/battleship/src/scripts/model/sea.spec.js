"use strict";

import { Sea } from "./sea.js";
import { Ship } from "./ship.js";

describe("Sea", () => {
  describe("canPlaceShip()", () => {
    describe("if the path is outside limits", () => {
      it("denies the ship can be placed", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        expect(sea.canPlaceShip(ship, 8, 0)).toBe(false);
      });
    });

    describe("if the path is inside limits", () => {
      describe("if the ship has already been placed", () => {
        it("denies the ship can be placed", () => {
          const sea = new Sea();
          const ship1 = new Ship(3);
          sea.placeShip(ship1, 7, 0);
          expect(sea.canPlaceShip(ship1, 7, 1)).toBe(false);
        });
      });

      describe("if the path is not vacant", () => {
        it("denies the ship can be placed", () => {
          const sea = new Sea();
          const ship1 = new Ship(3);
          sea.placeShip(ship1, 7, 0);
          const ship2 = new Ship(3);
          expect(sea.canPlaceShip(ship2, 6, 0)).toBe(false);
        });
      });

      describe("if the path is vacant", () => {
        it("confirms the ship can be placed", () => {
          const sea = new Sea();
          const ship = new Ship(3);
          expect(sea.canPlaceShip(ship, 7, 0)).toBe(true);
        });
      });
    });
  });

  describe("placeShip()", () => {
    describe("if the path is outside limits", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShip(ship, 8, 0);
        expect(sea.getElement(8, 0)).toBe(null);
        expect(sea.getElement(9, 0)).toBe(null);
      });
    });

    describe("if the path is inside limits", () => {
      describe("if the ship has already been placed", () => {
        it("does not place the ship", () => {
          const sea = new Sea();
          const ship1 = new Ship(3);
          sea.placeShip(ship1, 7, 0);
          expect(() => sea.placeShip(ship1, 7, 1)).toThrow();
        });
      });

      describe("if the path is not vacant (occupied by another missile)", () => {
        it("does not replace the ship", () => {
          const sea = new Sea();
          const ship1 = new Ship(3);
          sea.placeShip(ship1, 7, 0);
          const ship2 = new Ship(3);
          sea.placeShip(ship2, 6, 0);
          expect(sea.getElement(6, 0)).toBe(null);
          expect(sea.getElement(7, 0)).toBe(ship1);
          expect(sea.getElement(8, 0)).toBe(ship1);
          expect(sea.getElement(9, 0)).toBe(ship1);
        });
      });

      describe("if the path is vacant", () => {
        it("places the ship", () => {
          const sea = new Sea();
          const ship = new Ship(3);
          sea.placeShip(ship, 7, 0);
          expect(sea.getElement(7, 0)).toBe(ship);
          expect(sea.getElement(8, 0)).toBe(ship);
          expect(sea.getElement(9, 0)).toBe(ship);
        });
      });
    });
  });

  describe("canReceiveMissile()", () => {
    describe("if the point is outside limits", () => {
      it("denies the missile can be received", () => {
        const sea = new Sea();
        const missile = new Missile();
        expect(sea.canReceiveMissile(missile, 10, 0)).toBe(false);
      });
    });

    describe("if the point is inside limits", () => {
      describe("if the missile has already been received", () => {
        it("denies the missile can be received", () => {
          const sea = new Sea();
          const missile = new Missile();
          sea.receiveMissile(missile, 0, 0);
          expect(sea.canReceiveMissile(missile, 0, 1)).toBe(false);
        });
      });

      describe("if the point is not vacant (occupied by another missile)", () => {
        it("denies the missile can be received", () => {
          const sea = new Sea();
          const missile1 = new Missile();
          sea.receiveMissile(missile1, 0, 0);
          const missile2 = new Missile();
          expect(sea.canReceiveMissile(missile2, 0, 0)).toBe(false);
        });
      });

      describe("if the point is not vacant (occupied by a ship)", () => {
        it("confirms the missile can be received", () => {
          const sea = new Sea();
          const ship = new Ship(3);
          sea.placeShip(ship, 0, 0);
          const missile = new Missile();
          expect(sea.canReceiveMissile(missile, 0, 0)).toBe(true);
        });
      });

      describe("if the point is vacant", () => {
        it("confirms the missile can be received", () => {
          const sea = new Sea();
          const missile = new Missile();
          expect(sea.canReceiveMissile(missile, 0, 0)).toBe(true);
        });
      });
    });
  });

  describe("receiveMissile()", () => {
    describe("if the point is outside limits", () => {
      it("does not receive the missile", () => {
        const sea = new Sea();
        sea.receiveMissile(new Missile(), 10, 0);
        expect(sea.getElement(10, 0)).toBe(null);
      });
    });

    describe("if the point is inside limits", () => {
      describe("if the missile has already been received", () => {
        it("does not receive the missile", () => {
          const sea = new Sea();
          const missile = new Missile();
          sea.receiveMissile(new Missile(), 0, 0);
          expect(() => sea.receiveMissile(missile, 0, 1)).toThrow();
        });
      });

      describe("if the point is not vacant (occupied by another missile)", () => {
        it("does not receive the missile", () => {
          const sea = new Sea();
          const missile1 = new Missile();
          sea.receiveMissile(missile1, 0, 0);
          const missile2 = new Missile();
          sea.receiveMissile(missile2, 0, 0);
          expect(sea.getElement(0, 0)).toBe(missile1);
        });
      });

      describe("if the point is not vacant (occupied by a ship)", () => {
        it("receives the missile", () => {
          const sea = new Sea();
          const ship = new Ship(3);
          sea.placeShip(ship, 0, 0);
          const missile = new Missile();
          sea.receiveMissile(missile, 0, 0);
          expect(sea.getElement(0, 0)).toBe(missile);
        });
      });

      describe("if the point is vacant", () => {
        it("receives the missile", () => {
          const sea = new Sea();
          const missile = new Missile();
          sea.receiveMissile(missile, 0, 0);
          expect(sea.getElement(0, 0)).toBe(missile);
        });
      });
    });
  });

  describe("isEmpty()", () => {
    describe("if there are no ships", () => {
      it("confirms it is empty", () => {
        const sea = new Sea();
        expect(sea.isEmpty()).toBe(true);
      });
    });

    describe("if there is at least one ship", () => {
      it("denies it is empty", () => {
        const sea = new Sea();
        const ship = new Ship(3);
        sea.placeShip(ship, 0, 0);
        expect(sea.isEmpty()).toBe(false);
      });
    });
  });
});
