"use strict";

import {
  CARRIER,
  BATTLESHIP,
  CRUISER,
  SUBMARINE,
  DESTROYER,
} from "../constants";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleStart = () => {
    const allocation = {
      CARRIER: 0,
      BATTLESHIP: 1,
      CRUISER: 2,
      SUBMARINE: 3,
      DESTROYER: 2,
    };

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      allocation,
    };

    this.onAllocationGenerated(response);
  };

  bindToOnAllocationGenerated = (callback) => {
    this.onAllocationGenerated = callback;
  };
}
