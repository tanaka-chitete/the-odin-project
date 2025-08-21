"use strict";

import { Enlistment } from "./enlistment";

export class Operation {
  #admiral1;
  #admiral2;

  #report;
  #state;

  // This state idea kinda sucks, since the UI:
  // 1. needs to know what the next states are using a string (error-prone)
  // 2. has logic of its own as a result (e.g. next states is "endDeployment") then it needs to create new elements or whatever
  //    instead of just rendering them. So maybe you should create buttons for the next action, then allow the UI to style them as it sees fit?
  // So.
  // Memento pattern?
  // snapshot = admiral.provideReport()
  //

  /*
  Report {
    + name
    + port
    + sea
  }
  */

  // A SWITCH IN PLAYER CORRESPONDS TO A SWITCH IN STATE
  // SO, SWITCH PLAYER WITH SWITCH OF STATE!!!!!!!!!!!
  constructor(admiral1, admiral2) {
    this.#admiral1 = admiral1;
    this.#admiral2 = admiral2;
    // Enlistment (the initial state) is entered when the game is opened
    this.#state = new Enlistment(this);
  }

  startDeployment() {
    this.#state.startDeployment();
  }

  deployShip(shipClass, x, y) {
    this.#state.deployShip(shipClass, x, y);
  }

  rotateShip(x, y) {
    this.#state.rotateShip(x, y);
  }

  withdrawShip(x, y) {
    this.#state.withdrawShip(x, y);
  }

  endDeployment() {
    this.#state.startEngagement();
  }

  engageMissile(x, y) {
    this.#state.engageMissile(x, y);
  }

  endEngagement() {
    this.#state.endEngagement();
  }

  setReport(report) {
    this.#report = report;
  }

  getReport() {
    /*
    Enlistment: Nothing
    Placement: Return attackers board (as they need to place their own ships)
    Engagement: Return defenders board (as the attacker needs to fire at them)
    */
    this.#state.getReport();
  }

  changeState(state) {
    this.#state = state;
  }

  switchAdmiral() {
    [this.#admiral1, this.#admiral2] = [this.#admiral2, this.#admiral1];
  }

  getAdmiral1() {
    return this.#admiral1;
  }

  getAdmiral2() {
    return this.#admiral2;
  }
}
