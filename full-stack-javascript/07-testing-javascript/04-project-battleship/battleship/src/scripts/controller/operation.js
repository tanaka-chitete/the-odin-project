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
    this.#report = {
      state: STATE.ENLISTMENT,
    };
  }

  getReport() {
    return this.#report;
  }

  startDeployment() {
    if (
      this.#report.state !== STATE.ENLISTMENT ||
      this.#report.state !== STATE.DEPLOYMENT ||
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
  }

  rotateShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    this.#offensiveAdmiral.rotateShip(x, y);
  }

  recallShip(x, y) {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    this.#offensiveAdmiral.recallShip(x, y);
  }

  endDeployment() {
    if (this.#report.state !== STATE.DEPLOYMENT) {
      return;
    }

    if (!this.#offensiveAdmiral.hasDeployedAllShips()) {
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

    this.#rotateOffensiveAdmiral();

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

    this.#offensiveAdmiral = this.#admiral1 = new Admiral(
      this.#admiral1.getName()
    );
    this.#defensiveAdmiral = this.#admiral2 = new Admiral(
      this.#admiral2.getName()
    );

    this.startDeployment();
  }

  #rotateOffensiveAdmiral() {
    [this.#offensiveAdmiral, this.#defensiveAdmiral] = [
      this.#defensiveAdmiral,
      this.#offensiveAdmiral,
    ];
  }
}
