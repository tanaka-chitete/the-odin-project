"use strict";

import { PLAYER_1_NAME, PLAYER_2_NAME } from "../constants";

import { Player } from "./player";

export class Model {
  #attacker;
  #defender;

  constructor() {
    this.#attacker = new Player(PLAYER_1_NAME);
    this.#defender = new Player(PLAYER_2_NAME);
  }

  handleStartGame = () => {
    const response = {
      message: `Start preparation, ${this.#attacker.name}`,
    };

    this.onGameStarted(response);
  };

  handleStartPreparation = () => {
    const response = {
      message: `Place ships, ${this.#attacker.name}`,
      attacker: {
        allocation: this.#attacker.board.allocation,
        board: this.#attacker.board.board,
      },
    };

    this.onPreparationStarted(response);
  };

  handlePlaceShip = (x1, y1, x2, y2) => {
    let response;
    let callback;
    if (!this.#attacker.board.place(x1, y1, x2, y2)) {
      response = {
        message: `Place ships, ${this.#attacker.name}`,
      };
      callback = this.onErrorOccurred;
    } else {
      response = {
        message: `Place ships, ${this.#attacker.name}`,
        attacker: {
          allocation: this.#attacker.board.allocation,
          board: this.#attacker.board.board,
        },
      };
      callback = this.onShipPlaced;
    }

    callback(response);
  };

  handleEndPreparation = () => {
    let response;
    if (this.#attacker.name === PLAYER_1_NAME) {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];

      response = {
        message: `Start preparation, ${this.#attacker.name}`,
        attacker: {
          name: this.#attacker.name,
        },
      };
    } else {
      [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
      response = {
        message: `Start battle, ${this.#attacker.name}`,
        attacker: {
          name: this.#attacker.name,
        },
      };
    }

    this.onPreparationEnded(response);
  };

  handleStartBattle = () => {
    const response = {
      message: `Launch missile, ${this.#attacker.name}`,
      defender: {
        board: this.#defender.board.board,
      },
    };

    this.onBattleStarted(response);
  };

  handleLaunchMissile = (x, y) => {
    if (this.#defender.board.isEmpty()) {
      return;
    }

    const hit = this.#defender.board.receive(x, y);

    let response;
    let callback;
    if (this.#defender.board.isEmpty()) {
      response = {
        message: `You win, ${this.#attacker.name}`,
        defender: {
          board: this.#defender.board.board,
        },
      };
      callback = this.onGameEnded;
    } else {
      if (hit) {
        response = {
          message: `Successful missile, ${this.#attacker.name}`,
          defender: {
            board: this.#defender.board.board,
          },
        };
      } else {
        response = {
          message: `Unsuccessful missile, ${this.#attacker.name}`,
          defender: {
            board: this.#defender.board.board,
          },
        };
      }

      callback = this.onMissileLaunched;
    }

    callback(response);
  };

  handleEndBattle = () => {
    [this.#attacker, this.#defender] = [this.#defender, this.#attacker];
    const response = {
      message: `Start battle, ${this.#attacker.name}`,
      attacker: {
        name: this.#attacker.name,
      },
    };

    this.onBattleEnded(response);
  };

  bindToOnGameStarted(callback) {
    this.onGameStarted = callback;
  }

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

  bindToOnBattleEnded(callback) {
    this.onBattleEnded = callback;
  }
}
