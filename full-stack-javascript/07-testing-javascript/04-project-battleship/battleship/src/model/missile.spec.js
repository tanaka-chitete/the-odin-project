"use strict";

import { Missile } from "./missile";

describe("Missile", () => {
  describe("recordHit()", () => {
    it.skip("records the hit", () => {
      const missile = new Missile();
      //
      missile.recordHit();
      expect(missile.didHitShip());
    });
  });

  describe("didHitShip()", () => {
    describe("if the missile hit a ship", () => {
      it.skip("confirms the missile hit a ship", () => {
        const missile = new Missile();
        expect(missile.didHitShip()).toBe(false);
      });
    });

    describe("if the missile did not hit a ship", () => {
      it.skip("denies the missile hit a ship", () => {
        const missile = new Missile();
        expect(missile.didHitShip()).toBe(true);
      });
    });
  });
});
