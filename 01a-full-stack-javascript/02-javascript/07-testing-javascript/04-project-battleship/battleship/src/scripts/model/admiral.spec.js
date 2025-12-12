"use strict";

import { Admiral } from "./admiral";
import { Ship } from "./ship";
import { Missile } from "./missile";

const fullPort = { 5: 1, 4: 2, 3: 7, 2: 5 };
const emptySea = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
];

let name;
let admiral;
beforeEach(() => {
  name = "";
  admiral = new Admiral(name);
});

describe("Admiral", () => {
  describe("deployShip()", () => {
    describe("the allocation is exhausted", () => {
      it("does nothing", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        admiral.deployShip(new Ship(2), 0, 1);
        admiral.deployShip(new Ship(2), 0, 2);
        admiral.deployShip(new Ship(2), 0, 3);
        admiral.deployShip(new Ship(2), 0, 4);
        admiral.deployShip(new Ship(2), 0, 5);

        const report = admiral.issueReport();
        expect(report.port[2]).toBe(0);
        expect(report.sea[5][0]).toBe(null);
        expect(report.sea[5][1]).toBe(null);
      });
    });

    describe("the path is outside limits", () => {
      it("does nothing", () => {
        admiral.deployShip(new Ship(2), -1, 0);
        admiral.deployShip(new Ship(2), 0, -1);
        admiral.deployShip(new Ship(2), 9, -1);
        admiral.deployShip(new Ship(2), 10, 0);
        admiral.deployShip(new Ship(2), 10, 9);
        admiral.deployShip(new Ship(2), 9, 10);
        admiral.deployShip(new Ship(2), 0, 10);
        admiral.deployShip(new Ship(2), -1, 9);

        const report = admiral.issueReport();
        expect(report.port).toStrictEqual(fullPort);
        expect(report.sea).toStrictEqual(emptySea);
      });
    });

    describe("the path is occupied", () => {
      it("does nothing", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 0);
        admiral.deployShip(new Ship(2), 0, 0);

        const report = admiral.issueReport();
        expect(report.port[2]).toBe(4);
        expect(report.sea[0][0]).toBe(ship);
        expect(report.sea[0][1]).toBe(ship);
      });
    });

    it("deploys the ship", () => {
      const ship = new Ship(2);
      admiral.deployShip(ship, 0, 0);

      const report = admiral.issueReport();
      expect(report.port[2]).toBe(4);
      expect(report.sea[0][0]).toBe(ship);
      expect(report.sea[0][1]).toBe(ship);
    });
  });

  describe("rotateShip()", () => {
    describe("the ship is non-existent", () => {
      it("does nothing", () => {
        admiral.rotateShip(0, 0);

        const report = admiral.issueReport();
        expect(report.port).toStrictEqual(fullPort);
        expect(report.sea).toStrictEqual(emptySea);
      });
    });

    describe("the path is outside limits", () => {
      it("does nothing", () => {
        const ship = new Ship(2);
        admiral.deployShip(ship, 0, 9);
        admiral.rotateShip(0, 9);

        const report = admiral.issueReport();
        expect(report.sea[9][0]).toBe(ship);
        expect(report.sea[9][1]).toBe(ship);
      });
    });

    describe("the path is occupied", () => {
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
        expect(report.port[2]).toBe(4);
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
        expect(report.port[2]).toBe(4);
        expect(report.sea[0][0]).toBe(ship);
        expect(report.sea[0][1]).toBe(ship);
        expect(report.sea[1][0]).toBe(null);
      });
    });
  });

  describe("recallShip()", () => {
    describe("the point is outside limits", () => {
      it("does nothing", () => {
        admiral.recallShip(-1, 0);
        admiral.recallShip(0, -1);
        admiral.recallShip(9, -1);
        admiral.recallShip(10, 0);
        admiral.recallShip(10, 9);
        admiral.recallShip(9, 10);
        admiral.recallShip(0, 10);
        admiral.recallShip(-1, 9);

        const report = admiral.issueReport();
        expect(report.sea).toStrictEqual(emptySea);
      });
    });

    describe("the ship is non-existent", () => {
      it("does nothing", () => {
        admiral.recallShip(0, 0);

        const report = admiral.issueReport();
        expect(report.port).toStrictEqual(fullPort);
        expect(report.sea).toStrictEqual(emptySea);
      });
    });

    describe("the ship is longitudinal", () => {
      it("recalls the ship", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        admiral.recallShip(0, 0);

        const report = admiral.issueReport();
        expect(report.port).toStrictEqual(fullPort);
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
        expect(report.port).toStrictEqual(fullPort);
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
    describe("the point is outside limits", () => {
      it("does nothing", () => {
        admiral.receiveMissile(new Missile(), -1, 0);
        admiral.receiveMissile(new Missile(), 0, -1);
        admiral.receiveMissile(new Missile(), 9, -1);
        admiral.receiveMissile(new Missile(), 10, 0);
        admiral.receiveMissile(new Missile(), 10, 9);
        admiral.receiveMissile(new Missile(), 9, 10);
        admiral.receiveMissile(new Missile(), 0, 10);
        admiral.receiveMissile(new Missile(), -1, 9);

        const report = admiral.issueReport();
        expect(report.sea).toStrictEqual(emptySea);
      });
    });

    describe("the point is occupied by a missile", () => {
      it("does nothing", () => {
        const missile = new Missile();
        admiral.receiveMissile(missile, 0, 0);
        admiral.receiveMissile(new Missile(), 0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(missile);
      });
    });

    describe("the point is unoccupied", () => {
      it("receives the missile", () => {
        const missile = new Missile();
        admiral.receiveMissile(missile, 0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(missile);
      });
    });

    describe("the point is occupied by a ship", () => {
      it("receives the missile", () => {
        admiral.deployShip(new Ship(2), 0, 0);
        const missile = new Missile();
        admiral.receiveMissile(missile, 0, 0);

        const report = admiral.issueReport();
        expect(report.sea[0][0]).toBe(missile);
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
});
