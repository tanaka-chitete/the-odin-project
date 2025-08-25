"use strict";

import { Admiral } from "./admiral";
import { Sea } from "./sea";
import { Port } from "./port";

describe("Admiral", () => {
  describe("constructor()", () => {
    it("constructs an object", () => {
      const name = "";
      const port = new Port();
      const sea = new Sea();
  
      const admiral = new Admiral(name, port, sea);
  
      expect(admiral.getName()).toBe(name);
      expect(admiral.getPort()).toBe(port);
      expect(admiral.getSea()).toBe(sea);
    });
  })

  describe("canDeployShip()", () => {
    describe("the ship", () => {

    })

    describe("the ship cannot be deployed", () => {
      it("denies the ship can be deployed", () => {
        
      })
    }

  });
});
