"use strict";

import { Missile } from "./missile";

describe("Missile", () => {
  describe("detonate()", () => {
    describe("detonation is triggered", () => {
      it("detonates", () => {
        const missile = new Missile();
        missile.detonate();
        expect(missile.didDetonate()).toBe(true);
      });
    });

    describe("detonation is not triggered", () => {
      it("does not detonate", () => {
        const missile = new Missile();
        expect(missile.didDetonate()).toBe(false);
      });
    });
  });
});
