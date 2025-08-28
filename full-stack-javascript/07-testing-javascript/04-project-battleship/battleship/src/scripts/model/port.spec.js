"use strict";

import { Port } from "./port.js";
import { Ship } from "./ship.js";

describe("Port", () => {
  describe("canWithdrawShip()", () => {
    describe("the port does not have the ship", () => {
      it("denies the port has the ship", () => {
        const port = new Port();
        expect(port.canWithdrawShip(6)).toBe(false);
        expect(port.canWithdrawShip(1)).toBe(false);
      });
    });

    describe("the port has the ship", () => {
      it("confirms the port has the ship", () => {
        const port = new Port();
        expect(port.canWithdrawShip(5)).toBe(true);
        expect(port.canWithdrawShip(4)).toBe(true);
        expect(port.canWithdrawShip(3)).toBe(true);
        expect(port.canWithdrawShip(2)).toBe(true);
      });
    });
  });

  describe("withdrawShip()", () => {
    describe("the port does not have the ship", () => {
      it("does not remove anything", () => {
        const port = new Port();
        expect(port.withdrawShip(6)).toBe(null);
      });
    });

    describe("the port has the ship", () => {
      it("gets the ship from the port", () => {
        const port = new Port();
        expect(port.withdrawShip(5)).toBeInstanceOf(Ship);
      });

      it("removes the ship from the port", () => {
        const port = new Port();
        port.withdrawShip(5);
        expect(port.withdrawShip(5)).toBe(null);
      });
    });
  });

  describe("isEmpty()", () => {
    describe("only the port has no ships", () => {
      it("confirms it is empty", () => {
        const port = new Port();
        port.withdrawShip(5);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(4);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(4);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(3);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(2);
        expect(new Port().isEmpty()).toBe(false);
        port.withdrawShip(2);
        expect(new Port().isEmpty()).toBe(true);
      });
    });
  });
});
