"use strict";

import { Admiral } from "./admiral";
import { Ship } from "./ship";
import { Missile } from "./missile";

let name;
let admiral;
beforeEach(() => {
  name = "";
  admiral = new Admiral(name);
});

describe("Admiral", () => {
  describe("deployShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws", () => {
        expect(() => admiral.deployShip(new Ship(2), -1, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 0, -1)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, -1)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 10, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 10, 9)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 10)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 0, 10)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), -1, 9)).toThrow();
      });
    });

    describe("the path is outside limits", () => {
      it("throws", () => {
        expect(() => admiral.deployShip(new Ship(2), -1, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 0)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), -1, 9)).toThrow();
        expect(() => admiral.deployShip(new Ship(2), 9, 9)).toThrow();
      });
    });

    describe("all ships are deployed", () => {
      it("throws", () => {
        expect(() => admiral.deployShip(new Ship(5), 0, 0)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(4), 5, 0)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(4), 0, 1)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 4, 1)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 7, 1)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 0, 2)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 3, 2)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 6, 2)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 0, 3)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(3), 3, 3)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 6, 3)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 8, 3)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 0, 4)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 2, 4)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 4, 4)).not.toThrow();
        expect(() => admiral.deployShip(new Ship(2), 6, 4)).toThrow();
      });
    });

    it("deploys the ship", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);
      const report = admiral.issueReport();
      expect(report.sea[0][0]).toBe(ship);
      expect(report.sea[0][1]).toBe(ship);
    });
  });

  describe("rotateShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws", () => {
        expect(() => admiral.rotateShip(-1, 0)).toThrow();
        expect(() => admiral.rotateShip(0, -1)).toThrow();
        expect(() => admiral.rotateShip(9, -1)).toThrow();
        expect(() => admiral.rotateShip(10, 0)).toThrow();
        expect(() => admiral.rotateShip(10, 9)).toThrow();
        expect(() => admiral.rotateShip(9, 10)).toThrow();
        expect(() => admiral.rotateShip(0, 10)).toThrow();
        expect(() => admiral.rotateShip(-1, 9)).toThrow();
      });
    });

    describe("the ship is non-existent", () => {
      it("throws", () => {
        expect(() => admiral.rotateShip(0, 0)).toThrow();
      });
    });

    describe("the path is outside limits", () => {
      it("does nothing", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 9);
        const report = admiral.issueReport();
        expect(report.sea[9][0]).toBe(ship);
        expect(report.sea[9][1]).toBe(ship);
      });
    });

    describe("the path is obstructed", () => {
      it("does nothing", () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        admiral.deployShip(ship1, 0, 0);
        admiral.deployShip(ship2, 0, 1);
        admiral.rotateShip(0, 0);

        const report = admiral.issueReport();
        expect(report.sea[1][0]).toBe(ship2);
        expect(report.sea[1][1]).toBe(ship2);
      });
    });

    describe("the ship is longitudinal", () => {
      it("rotates the ship", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 0);
        admiral.rotateShip(0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(ship);
        expect(report.sea[1][0]).toBe(ship);
        expect(report.sea[0][1]).toBe(null);
      });
    });

    describe("the ship is lateral", () => {
      it("rotates the ship", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 0);
        admiral.rotateShip(0, 0);
        admiral.rotateShip(0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(ship);
        expect(report.sea[0][1]).toBe(ship);
        expect(report.sea[1][0]).toBe(null);
      });
    });
  });

  describe("recallShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws", () => {
        expect(() => admiral.recallShip(-1, 0)).toThrow();
        expect(() => admiral.recallShip(0, -1)).toThrow();
        expect(() => admiral.recallShip(9, -1)).toThrow();
        expect(() => admiral.recallShip(10, 0)).toThrow();
        expect(() => admiral.recallShip(10, 9)).toThrow();
        expect(() => admiral.recallShip(9, 10)).toThrow();
        expect(() => admiral.recallShip(0, 10)).toThrow();
        expect(() => admiral.recallShip(-1, 9)).toThrow();
      });
    });

    describe("the ship is non-existent", () => {
      it("throws", () => {
        expect(() => admiral.recallShip(0, 0)).toThrow();
      });
    });

    describe("the ship is longitudinal", () => {
      it("recalls the ship", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        admiral.recallShip(0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(null);
        expect(report.sea[0][1]).toBe(null);
      });
    });

    describe("the ship is lateral", () => {
      it("recalls the ship", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        admiral.rotateShip(0, 0);
        admiral.recallShip(0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(null);
        expect(report.sea[1][0]).toBe(null);
      });
    });
  });

  describe("hasDeployedAllShips()", () => {
    describe("all ships are deployed", () => {
      it("confirms all ships are deployed", () => {
        admiral.deployShip(new Ship(5), 0, 0);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(4), 5, 0);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(4), 0, 1);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 4, 1);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 7, 1);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 0, 2);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 3, 2);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 6, 2);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 0, 3);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(3), 3, 3);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(2), 6, 3);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(2), 8, 3);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(2), 0, 4);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(2), 2, 4);
        expect(admiral.hasDeployedAllShips()).toBe(false);
        admiral.deployShip(new Ship(2), 4, 4);
        expect(admiral.hasDeployedAllShips()).toBe(true);
      });
    });
  });

  describe("receiveMissile()", () => {
    describe("the coordinates are outside limits", () => {
      it("throws", () => {
        expect(() => admiral.receiveMissile(new Missile(), -1, 0)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 0, -1)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 9, -1)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 10, 0)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 10, 9)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 9, 10)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), 0, 10)).toThrow();
        expect(() => admiral.receiveMissile(new Missile(), -1, 9)).toThrow();
      });
    });

    describe("the target is another missile", () => {
      it("throws", () => {
        admiral.receiveMissile(new Missile(), 0, 0);
        expect(() => admiral.receiveMissile(new Missile(), 0, 0)).toThrow();
      });
    });

    describe("the target is the water", () => {
      it("receives the missile", () => {
        const missile = new Missile();
        admiral.receiveMissile(missile, 0, 0);
        expect(missile.hasDetonated()).toBe(false);
      });
    });

    describe("the target is a ship", () => {
      it("receives the missile, recording detonation", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        const missile = new Missile();
        admiral.receiveMissile(missile, 0, 0);
        expect(missile.hasDetonated()).toBe(true);
      });
    });
  });

  describe("hasLostAllShips()", () => {
    describe("not all ships are lost", () => {
      it("denies that all ships are lost", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        expect(admiral.hasLostAllShips()).toBe(false);
      });
    });

    describe("all ships are lost", () => {
      it("confirms all ships are lost", () => {
        expect(admiral.hasLostAllShips()).toBe(true);
      });
    });
  });

  describe("issueReport()", () => {
    it("issues a report", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);
      const missile = new Missile();
      admiral.receiveMissile(missile, 0, 0);

      const report = admiral.issueReport();
      expect(report.issuer).toBe(name);
      expect(report.port).toStrictEqual({
        5: 1,
        4: 2,
        3: 7,
        2: 4,
      });
      expect(report.sea).toStrictEqual([
        [missile, ship, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ]);
    });
  });
});
