"use strict";

import { Admiral } from "./admiral";
import { Sea } from "./sea";

describe("Admiral", () => {
  describe("constructor()", () => {
    describe("if the name is not a string", () => {
      it("does not construct an object", () => {
        expect(() => new Admiral(null)).toThrow();
        expect(() => new Admiral(undefined)).toThrow();
        expect(() => new Admiral(true)).toThrow();
        expect(() => new Admiral(false)).toThrow();
        expect(() => new Admiral(1)).toThrow();
        expect(() => new Admiral(1n)).toThrow();
        expect(() => new Admiral(new Symbol())).toThrow();
      });
    });

    new Admiral(new Sea(new Port()));

    describe("if the name is a string", () => {
      it("constructs an object", () => {
        const admiral = new Admiral("Anjni");
        expect(admiral.getName()).toBe("Anjni");
        expect(admiral.getSea()).toBeInstanceOf(Sea);
      });
    });
  });
});
