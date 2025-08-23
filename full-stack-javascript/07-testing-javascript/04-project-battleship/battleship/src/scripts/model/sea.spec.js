"use strict";

import { Port } from "./port.js";
import { Sea } from "./sea.js";
import { Ship } from "./ship.js";
import { Missile } from "./missile.js";

describe("Sea", () => {
  describe("canDeployShip()", () => {
    describe("if the port does not have the ship", () => {
      it("denies the ship can be placed", () => {
        const port = new Port();
        const sea = new Sea(port);
        expect(sea.canDeployShip(6, 0, 0));
        expect(sea.canDeployShip(1, 0, 0));
      });
    });

    describe("if the path is outside limits", () => {
      it("denies the ship can be placed", () => {
        const sea = new Sea();
        const ship = new Ship(2);
        expect(sea.canDeployShip(ship, -1, 0)).toBe(false);
        expect(sea.canDeployShip(ship, 9, 0)).toBe(false);
        expect(sea.canDeployShip(ship, 9, 9)).toBe(false);
        expect(sea.canDeployShip(ship, -1, 9)).toBe(false);
      });
    });

    describe("if the path is occupied", () => {
      it("denies the ship can be placed", () => {
        const sea = new Sea();
        const ship1Class = 2;
        sea.deployShip(ship1, 0, 0);
        const ship2 = new Ship(2);
        expect(sea.canDeployShip(ship2, 1, 0)).toBe(false);
      });
    });

    it("confirms the ship can be placed", () => {
      const sea = new Sea();
      const ship = new Ship(2);
      expect(sea.canDeployShip(ship, 0, 0)).toBe(true);
    });
  });

  describe("deployShip()", () => {
    describe("if the path is outside limits", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship = new Ship(2);
        sea.deployShip(ship, -1, 0);
        expect(sea.getElement(-1, 0)).toBe(null);
        expect(sea.getElement(0, 0)).toBe(null);
      });
    });

    describe("if the ship is already placed", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship1 = new Ship(3);
        sea.deployShip(ship1, 7, 0);
        expect(() => sea.deployShip(ship1, 7, 1)).toThrow();
      });
    });

    describe("if the path is occupied", () => {
      it("does not place the ship", () => {
        const sea = new Sea();
        const ship1 = new Ship(2);
        sea.deployShip(ship1, 0, 0);
        const ship2 = new Ship(2);
        sea.deployShip(ship2, 1, 0);
        expect(sea.getElement(0, 0)).toBe(ship1);
        expect(sea.getElement(1, 0)).toBe(ship1);
        expect(sea.getElement(2, 0)).toBe(null);
      });
    });

    it("places the ship", () => {
      const sea = new Sea();
      const ship = new Ship(2);
      sea.deployShip(ship, 0, 0);
      expect(sea.getElement(0, 0)).toBe(ship);
      expect(sea.getElement(1, 0)).toBe(ship);
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
        sea.deployShip(ship, 0, 0);
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
        sea.deployShip(ship, 0, 0);
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
      sea.deployShip(ship, 0, 0);
      expect(sea.isEmpty()).toBe(false);
    });
  });
});
