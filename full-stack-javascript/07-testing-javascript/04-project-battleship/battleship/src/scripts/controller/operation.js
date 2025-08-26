"use strict";

import { Admiral } from "../model/admiral";

export const STATE = {
  ENLISTMENT,
  DEPLOYMENT,
  ENGAGEMENT,
  ASSESSMENT,
  SETTLEMENT,
};

export class Operation {
  #admiral1;
  #admiral2;

  #offensiveAdmiral;
  #defensiveAdmiral;
  #report;

  constructor(admiral1, admiral2) {
    this.#admiral1 = admiral1;
    this.#admiral2 = admiral2;

    this.#offensiveAdmiral = this.#admiral1;
    this.#defensiveAdmiral = this.#admiral2;
    this.#report = {};
  }

  startDeployment() {
    if (
      this.#report.state !== STATE.ENLISTMENT ||
      this.#report.state !== STATE.DEPLOYMENT ||
      this.#report.state !== STATE.SETTLEMENT
    ) {
      return;
    }

    this.#report = {
      message: `Place your ships, ${this.#offensiveAdmiral.getName()}`,
      port: this.#offensiveAdmiral.getPort(),
      sea: this.#offensiveAdmiral.getSea(),
      state: STATE.DEPLOYMENT,
    };
  }

  deployShip(length, x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.canReceiveShip(length, x, y)) {
      return;
    }

    this.#offensiveAdmiral.deployShip(length, x, y);
  }

  rotateShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.canRotateShip(length, x, y)) {
      return;
    }

    this.#offensiveAdmiral.rotateShip(x, y);
  }

  recallShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.canRecallShip(length, x, y)) {
      return;
    }

    this.#offensiveAdmiral.recallShip(x, y);
  }

  endDeployment() {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.hasDeployedShips()) {
      return;
    }

    this.#rotateOffensiveAdmiral();

    if (this.#offensiveAdmiral === this.#admiral2) {
      this.startDeployment();
    } else {
      this.startEngagement();
    }
  }

  startEngagement() {
    if (
      this.#report.state !== STATE.DEPLOYMENT ||
      this.#report.state !== STATE.ASSESSMENT
    ) {
      return;
    }

    this.#report = {
      message: `Engage a missile, ${this.#offensiveAdmiral.getName()}`,
      port: this.#defensiveAdmiral.getPort(),
      sea: this.#defensiveAdmiral.getSea(),
      state: STATE.ENGAGEMENT,
    };
  }

  engageMissile(x, y) {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    if (
      !this.#offensiveAdmiral.canEngageMissile(this.#defensiveAdmiral, x, y)
    ) {
      return;
    }

    this.#offensiveAdmiral.engageMissile(this.#defensiveAdmiral, x, y);

    if (this.#defensiveAdmiral.hasLostShips()) {
      this.#startSettlement();
    }

    this.#startAssessment();
  }

  #startAssessment() {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    let message;
    if (this.#defensiveAdmiral.hasHitShip(x, y)) {
      message = `Successful missile, ${this.#offensiveAdmiral.getName()}`;
    } else {
      message = `Unsuccessful missile, ${this.#offensiveAdmiral.getName()}`;
    }

    this.#report = {
      message: message,
      port: this.#defensiveAdmiral.getPort(),
      sea: this.#defensiveAdmiral.getSea(),
      state: STATE.ASSESSMENT,
    };
  }

  endAssessment() {
    if (this.#report.state !== STATE.ASSESSMENT) {
      return;
    }

    this.#rotateOffensiveAdmiral();

    this.startEngagement();
  }

  #startSettlement() {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    this.#report = {
      message: `You win, ${this.#offensiveAdmiral.getName()}`,
      port: this.#defensiveAdmiral.getPort(),
      sea: this.#defensiveAdmiral.getSea(),
      state: STATE.SETTLEMENT,
    };
  }

  endSettlement() {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    this.#offensiveAdmiral = this.#admiral1 = new Admiral(
      this.#admiral1.getName()
    );
    this.#defensiveAdmiral = this.#admiral2 = new Admiral(
      this.#admiral2.getName()
    );

    this.startDeployment();
  }

  getReport() {
    return this.#report;
  }

  #rotateOffensiveAdmiral() {
    [this.#offensiveAdmiral, this.#defensiveAdmiral] = [
      this.#defensiveAdmiral,
      this.#offensiveAdmiral,
    ];
  }
}
