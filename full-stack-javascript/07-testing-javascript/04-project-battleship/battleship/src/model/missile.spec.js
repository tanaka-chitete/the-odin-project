"use strict";

import { Missile } from "./missile";

describe("Missile", () => {
  describe("detonate()", () => {
    describe("if the missile hit a ship", () => {
      it("detonates", () => {
        const missile = new Missile();
        missile.detonate();
        expect(missile.didDetonate()).toBe(true);
      });
    });

    describe("if the missile did not hit a ship", () => {
      it("does not detonate", () => {
        const missile = new Missile();
        expect(missile.didDetonate()).toBe(false);
      });
    });
  });
});
