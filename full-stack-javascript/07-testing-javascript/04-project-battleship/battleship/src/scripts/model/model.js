"use strict";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player("Player 1");
    this.#defender = new Player("Player 2");
  }

  handleStartPreparation = () => {
    const response = {
      message: `Place your ships, ${this.#attacker.name}`,
      data: {
        board: this.#attacker.board.board,
        fleet: this.#attacker.board.fleet,
      },
    };

    this.onPreparationStarted(response);
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

  handleEndPreparation = () => {
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
      this.onPreparationEnded(response);
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

  handleLaunchMissile = (x, y) => {
    if (this.#defender.board.isEmpty()) {
      return;
    }

    this.#defender.board.receive(x, y);

    let response;
    if (this.#defender.board.isEmpty()) {
      response = {
        message: `You win, ${this.#attacker.name}`,
        data: {
          board: this.#defender.board.board,
        },
      };
    } else {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
      response = {
        message: `Launch a missile, ${this.#attacker.name}`,
        data: {
          board: this.#defender.board.board,
        },
      };
    }

    this.onMissileLaunched(response);
  };

  bindToOnPreparationStarted(callback) {
    this.onPreparationStarted = callback;
  }

  bindToOnShipPlaced(callback) {
    this.onShipPlaced = callback;
  }

  bindToOnPreparationEnded(callback) {
    this.onPreparationEnded = callback;
  }

  bindToOnBattleStarted(callback) {
    this.onBattleStarted = callback;
  }

  bindToOnMissileLaunched(callback) {
    this.onMissileLaunched = callback;
  }
}
