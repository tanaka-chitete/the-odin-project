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

    describe("the coordinates are outside limits", () => {
      it("denies the ship can be deployed", () => {
        expect(admiral.canDeployShip(2, -1, 0)).toBe(false);
        expect(admiral.canDeployShip(2, 0, -1)).toBe(false);
        expect(admiral.canDeployShip(2, 9, -1)).toBe(false);
        expect(admiral.canDeployShip(2, 10, 0)).toBe(false);
        expect(admiral.canDeployShip(2, 10, 9)).toBe(false);
        expect(admiral.canDeployShip(2, 9, 10)).toBe(false);
        expect(admiral.canDeployShip(2, 0, 10)).toBe(false);
        expect(admiral.canDeployShip(2, -1, 9)).toBe(false);
      });
    });

    describe("the path is outside limits", () => {
      it("denies the ship can be deployed", () => {
        expect(admiral.canDeployShip(2, -1, 0)).toBe(false);
        expect(admiral.canDeployShip(2, 9, 0)).toBe(false);
        expect(admiral.canDeployShip(2, -1, 9)).toBe(false);
        expect(admiral.canDeployShip(2, 9, 9)).toBe(false);
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

    describe("the coordinates are outside limits", () => {
      it("does not deploy the ship", () => {
        expect(() => admiral.deployShip(2, -1, 0)).toThrow();
        expect(() => admiral.deployShip(2, 0, -1)).toThrow();
        expect(() => admiral.deployShip(2, 9, -1)).toThrow();
        expect(() => admiral.deployShip(2, 10, 0)).toThrow();
        expect(() => admiral.deployShip(2, 10, 9)).toThrow();
        expect(() => admiral.deployShip(2, 9, 10)).toThrow();
        expect(() => admiral.deployShip(2, 0, 10)).toThrow();
        expect(() => admiral.deployShip(2, -1, 9)).toThrow();
      });
    });

    describe("the path is outside limits", () => {
      it("does not deploy the ship", () => {
        expect(() => admiral.deployShip(2, -1, 0)).toThrow();
        expect(() => admiral.deployShip(2, 9, 0)).toThrow();
        expect(() => admiral.deployShip(2, -1, 9)).toThrow();
        expect(() => admiral.deployShip(2, 9, 9)).toThrow();
      });
    });

    it("deploys the ship", () => {
      expect(() => admiral.deployShip(2, 0, 0)).not.toThrow();
    });
  });

  describe("canRotateShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("denies the ship can be rotated", () => {
        expect(admiral.canRotateShip(-1, 0)).toBe(false);
        expect(admiral.canRotateShip(0, -1)).toBe(false);
        expect(admiral.canRotateShip(9, -1)).toBe(false);
        expect(admiral.canRotateShip(10, 0)).toBe(false);
        expect(admiral.canRotateShip(10, 9)).toBe(false);
        expect(admiral.canRotateShip(9, 10)).toBe(false);
        expect(admiral.canRotateShip(0, 10)).toBe(false);
        expect(admiral.canRotateShip(-1, 9)).toBe(false);
      });
    });

    describe("the ship is non-existent", () => {
      it("denies the ship can be rotated", () => {
        expect(admiral.canRotateShip(0, 0)).toBe(false);
      });
    });

    describe("the new path is outside limits", () => {
      it("denies the ship can be rotated", () => {
        admiral.deployShip(2, 0, 9);
        expect(admiral.canRotateShip(0, 9)).toBe(false);
      });
    });

    describe("the new path is obstructed", () => {
      it("denies the ship can be rotated", () => {
        admiral.deployShip(2, 0, 0);
        admiral.deployShip(2, 0, 1);
        expect(admiral.canRotateShip(0, 0)).toBe(false);
      });
    });

    it("confirms the ship can be rotated", () => {
      admiral.deployShip(2, 0, 0);
      expect(admiral.canRotateShip(0, 0)).toBe(true);
    });
  });

  describe("rotateShip()", () => {
    describe("the coordinates are outside limits", () => {
      it("does not rotate the ship", () => {
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
      it("does not rotate the ship", () => {
        expect(() => admiral.rotateShip(0, 0)).toThrow();
      });
    });

    describe("the new path is outside limits", () => {
      it("does not rotate the ship", () => {
        admiral.deployShip(2, 0, 9);
        expect(() => admiral.rotateShip(0, 9)).toThrow();
      });
    });

    describe("the new path is obstructed", () => {
      it("does not rotate the ship", () => {
        admiral.deployShip(2, 0, 0);
        admiral.deployShip(2, 0, 1);
        expect(() => admiral.rotateShip(0, 0)).toThrow();
      });
    });

    it("it rotates the ship", () => {
      admiral.deployShip(2, 0, 0);
      expect(() => admiral.rotateShip(0, 0)).not.toThrow();
    });
  });
});
