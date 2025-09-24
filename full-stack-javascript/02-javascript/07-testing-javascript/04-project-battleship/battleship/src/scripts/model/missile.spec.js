"use strict";

import { Missile } from "./missile";

let missile;
beforeEach(() => {
  missile = new Missile();
});

describe("Missile", () => {
  describe("hasStopped", () => {
    describe("the missile has not stopped", () => {
      it("denies the missile has stopped", () => {
        expect(missile.hasStopped()).toBe(false);
      });
    });

    describe("the missile has stopped", () => {
      it("confirms the missile has stopped", () => {
        missile.stop();
        expect(missile.hasStopped()).toBe(true);
      });
    });
  });

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
