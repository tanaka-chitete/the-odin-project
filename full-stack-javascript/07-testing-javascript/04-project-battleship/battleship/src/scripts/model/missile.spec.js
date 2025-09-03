"use strict";

import { Missile } from "./missile";

let missile;
beforeEach(() => {
  missile = new Missile();
});

describe("Missile", () => {
  describe("hasDetonated", () => {
    describe("the missile has not detonated", () => {
      it("denies the missile has detonated", () => {
        expect(missile.hasDetonated()).toBe(false);
      });
    });

    describe("the missile has detonated", () => {
      it("confirms that the missile has detonated", () => {
        missile.detonate();
        expect(missile.hasDetonated()).toBe(true);
      });
    });
  });
});
