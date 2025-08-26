"use strict";

import { Admiral } from "./admiral";
import { Sea } from "./sea";
import { Port } from "./port";

let name;
let port;
let sea;
let admiral;
beforeEach(() => {
  name = "";
  port = new Port();
  sea = new Sea();
  admiral = new Admiral(name, port, sea);
});

describe("Admiral", () => {
  describe("getName()", () => {
    it("gets the name", () => {
      expect(admiral.getName()).toBe(name);
    });
  });

  describe("getPort()", () => {
    it("gets the port", () => {
      expect(admiral.getPort()).toBe(port);
    });
  });

  describe("getSea()", () => {
    it("gets the sea", () => {
      expect(admiral.getSea()).toBe(sea);
    });
  });

  describe("canDeployShip()", () => {
    describe("the length is outside limits", () => {
      it("denies the ship can be deployed", () => {
        expect(admiral.canDeployShip(1, 0, 0)).toBe(false);
        expect(admiral.canDeployShip(6, 0, 0)).toBe(false);
      });
    });

    describe("the coordinates are outside limits", () => {});

    describe("the path is outside limits", () => {
      it("denies the ship can be deployed", () => {
        expect(admiral.canDeployShip(2, -1, 0)).toBe(false);
      });
    });

    it("confirms the ship can be deployed", () => {
      expect(admiral.canDeployShip(2, 0, 0)).toBe(true);
    });
  });

  describe("deployShip()", () => {
    describe("the length is outside limits", () => {
      it("does not deploy the ship", () => {
        expect(() => admiral.deployShip(1, 0, 0)).toThrow();
        expect(() => admiral.deployShip(6, 0, 0)).toThrow();
      });
    });

    describe("the coordinates are outside limits", () => {});

    describe("the path is outside limits", () => {
      it("does not deploy the ship", () => {
        expect(() => admiral.deployShip(2, -1, 0)).toThrow();
      });
    });

    it("deploys the ship", () => {
      expect(() => admiral.deployShip(2, 0, 0)).not.toThrow();
    });
  });

  describe("canRotateShip()", () => {
    describe("the coordinates are outside limits", () => {});

    describe("the new path is outside limits", () => {
      it("denies the ship can be rotated", () => {
        admiral.deployShip(2, 0, 9);
        expect(admiral.canRotateShip(0, 9)).toBe(false);
      });
    });

    it("confirms the ship can be rotated", () => {
      admiral.deployShip(2, 0, 0);
      expect(admiral.canRotateShip(0, 0)).toBe(true);
    });
  });

  describe("rotateShip()", () => {
    describe("the coordinates are outside limits", () => {});
  });
});
