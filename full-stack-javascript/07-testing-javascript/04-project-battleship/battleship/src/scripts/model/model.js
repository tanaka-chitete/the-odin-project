"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleStartPlacement = () => {
    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: {
        board: this.#attacker.board.board,
        fleet: this.#attacker.board.fleet,
      },
    };

    this.onPlacementStarted(response);
  };

  handlePlaceShip = (x1, y1, x2, y2) => {
    if (!this.#attacker.board.place(x1, y1, x2, y2)) {
      return;
    }

    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: {
        board: this.#attacker.board.board,
        fleet: this.#attacker.board.fleet,
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
        data: {
          board: this.#attacker.board.board,
          fleet: this.#attacker.board.fleet,
        },
      };
      this.onBoardSubmitted(response);
    } else {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
      const response = {
        message: `Launch a missile, ${this.#attacker.name}`,
        data: {
          board: this.#defender.board.board,
        },
      };
      this.onBattleStarted(response);
    }
  };

  bindToOnPlacementStarted(callback) {
    this.onPlacementStarted = callback;
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
