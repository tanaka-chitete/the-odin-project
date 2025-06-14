"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleGetAllocation = () => {
    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: this.#attacker.board.allocation,
    };

    this.onAllocationGotten(response);
  };

  handlePlaceShip = (x1, y1, x2, y2) => {
    if (!this.#attacker.board.place(x1, y1, x2, y2)) {
      return;
    }

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: {
        board: this.#attacker.board.array,
        allocation: this.#attacker.board.allocation,
      },
    };

    this.onShipPlaced(response);
  };

  handleSubmitBoard = () => {
    if (!this.#attacker.board.isFull()) {
      return;
    }

    if (this.#attacker.name === "Player 1") {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
      const response = {
        message: `Place your ships, ${this.#attacker.name}`,
        data: this.#attacker.board.allocation,
      };
      this.onBoardSubmitted(response);
    } else {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
      const response = {
        message: `Fire a shot, ${this.#attacker.name}`,
        data: this.#defender.board.board,
      };
      this.onBattleStarted(response);
    }
  };

  bindToOnAllocationGotten(callback) {
    this.onAllocationGotten = callback;
  }

  bindToOnShipPlaced(callback) {
    this.onShipPlaced = callback;
  }

  bindToOnBoardSubmitted(callback) {
    this.onBoardSubmitted = callback;
  }

  bindToOnBattleStarted(callback) {
    this.onBattleStarted = callback;
  }
}
