"use strict";

import { Admiral } from "../model/admiral";

export const STATE = Object.freeze({
  ENLISTMENT: 0,
  DEPLOYMENT: 1,
  ENGAGEMENT: 2,
  ASSESSMENT: 3,
  SETTLEMENT: 4,
});

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
    this.#report = {
      message: null,
      port: null,
      sea: null,
      state: STATE.ENLISTMENT,
    };
  }

  startDeployment() {
    if (
      this.#report.state !== STATE.ENLISTMENT &&
      this.#report.state !== STATE.DEPLOYMENT &&
      this.#report.state !== STATE.SETTLEMENT
    ) {
      return;
    }

    const offensiveAdmiralReport = this.#offensiveAdmiral.issueReport();
    this.#report = {
      message: `Deploy your ships, ${offensiveAdmiralReport.issuer}`,
      port: offensiveAdmiralReport.port,
      sea: offensiveAdmiralReport.sea,
      state: STATE.DEPLOYMENT,
    };
  }

  deployShip(ship, x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    this.#offensiveAdmiral.deployShip(ship, x, y);

    this.startDeployment();
  }

  rotateShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    this.#offensiveAdmiral.rotateShip(x, y);

    this.startDeployment();
  }

  recallShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    this.#offensiveAdmiral.recallShip(x, y);

    this.startDeployment();
  }

  endDeployment() {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.hasDeployedAllShips()) {
      return;
    }

    [this.#offensiveAdmiral, this.#defensiveAdmiral] = [
      this.#defensiveAdmiral,
      this.#offensiveAdmiral,
    ];

    if (this.#offensiveAdmiral === this.#admiral2) {
      this.startDeployment();
    } else {
      this.startEngagement();
    }
  }

  startEngagement() {
    if (
      this.#report.state !== STATE.DEPLOYMENT &&
      this.#report.state !== STATE.ASSESSMENT
    ) {
      return;
    }

    const offensiveAdmiralReport = this.#offensiveAdmiral.issueReport();
    const defensiveAdmiralReport = this.#defensiveAdmiral.issueReport();
    this.#report = {
      message: `Engage a missile, ${offensiveAdmiralReport.issuer}`,
      port: defensiveAdmiralReport.port,
      sea: defensiveAdmiralReport.sea,
      state: STATE.ENGAGEMENT,
    };
  }

  engageMissile(missile, x, y) {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    this.#defensiveAdmiral.receiveMissile(missile, x, y);

    if (!missile.hasStopped()) {
      return;
    }

    if (this.#defensiveAdmiral.hasLostAllShips()) {
      this.#startSettlement();
    } else {
      this.#startAssessment(missile.hasDetonated());
    }
  }

  #startAssessment(missileDetonated) {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    const offensiveAdmiralReport = this.#offensiveAdmiral.issueReport();
    const defensiveAdmiralReport = this.#defensiveAdmiral.issueReport();
    if (missileDetonated) {
      this.#report = {
        message: `Successful missile, ${offensiveAdmiralReport.issuer}`,
        port: defensiveAdmiralReport.port,
        sea: defensiveAdmiralReport.sea,
        state: STATE.ASSESSMENT,
      };
    } else {
      this.#report = {
        message: `Unsuccessful missile, ${offensiveAdmiralReport.issuer}`,
        port: defensiveAdmiralReport.port,
        sea: defensiveAdmiralReport.sea,
        state: STATE.ASSESSMENT,
      };
    }
  }

  endAssessment() {
    if (this.#report.state !== STATE.ASSESSMENT) {
      return;
    }

    [this.#offensiveAdmiral, this.#defensiveAdmiral] = [
      this.#defensiveAdmiral,
      this.#offensiveAdmiral,
    ];

    this.startEngagement();
  }

  #startSettlement() {
    if (this.#report.state !== STATE.ENGAGEMENT) {
      return;
    }

    const offensiveAdmiralReport = this.#offensiveAdmiral.issueReport();
    const defensiveAdmiralReport = this.#defensiveAdmiral.issueReport();
    this.#report = {
      message: `You win, ${offensiveAdmiralReport.issuer}`,
      port: defensiveAdmiralReport.port,
      sea: defensiveAdmiralReport.sea,
      state: STATE.SETTLEMENT,
    };
  }

  endSettlement() {
    if (this.#report.state !== STATE.SETTLEMENT) {
      return;
    }

    const admiral1Report = this.#admiral1.issueReport();
    const admiral2Report = this.#admiral2.issueReport();

    this.#offensiveAdmiral = this.#admiral1 = new Admiral(
      admiral1Report.issuer
    );
    this.#defensiveAdmiral = this.#admiral2 = new Admiral(
      admiral2Report.issuer
    );

    this.startDeployment();
  }

  issueReport() {
    return this.#report;
  }
}
