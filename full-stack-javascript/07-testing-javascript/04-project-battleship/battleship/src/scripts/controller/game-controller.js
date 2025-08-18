"use strict";

import { Missile } from "../model/missile";
import { Port } from "../model/port";
import { Sea } from "../model/sea";

export class GameController {
  #attackingPlayer;
  #defendingPlayer;
  #message;

  constructor() {
    this.#attackingPlayer = {
      name: "Player 1",
      port: new Port(),
      sea: new Sea(),
    };
    this.#defendingPlayer = {
      name: "Player 2",
      port: new Port(),
      sea: new Sea(),
    };
    this.#message = "";
  }

  placeShip(shipClass, x, y) {
    if (!this.#attackingPlayer.port.hasShip(shipClass)) {
      this.#message = `That ship is not available, ${
        this.#attackingPlayer.name
      }`;
      return;
    }

    if (!this.#attackingPlayer.sea.canPlaceShip(shipClass)) {
      this.#message = `That ship can't be placed there, ${
        this.#attackingPlayer.name
      }`;
      return;
    }

    const ship = this.#attackingPlayer.popShip(shipClass);
    this.#attackingPlayer.placeShip(ship);

    if (this.#attackingPlayer.port.isEmpty()) {
      [this.#attackingPlayer, this.#defendingPlayer] = [
        this.#defendingPlayer,
        this.#attackingPlayer,
      ];
    }
  }

  rotateShip(x, y) {
    if (!this.#attackingPlayer.sea.canRotateShip(x, y)) {
      this.#message = `That ship can't be rotated, ${
        this.#attackingPlayer.name
      }`;
      return;
    }

    this.#attackingPlayer.sea.rotateShip(x, y);
  }

  launchMissile(x, y) {
    if (this.#defendingPlayer.sea.isEmpty()) {
      this.#message = `You win, ${this.#attackingPlayer.name}`;
    }

    if (!this.#defendingPlayer.sea.canReceiveMissile(x, y)) {
      this.#message = `The missile cannot be launched here, ${
        this.#attackingPlayer.name
      }`;
      return;
    }

    this.#defendingPlayer.sea.receiveMissile(new Missile(), x, y);
    if (this.#defendingPlayer.sea.getElement(x, y).didDetonate()) {
      this.#message = `Successful missile, ${this.#attackingPlayer.name}`;
    } else {
      this.#message = `Successful missile, ${this.#attackingPlayer.name}`;
    }

    [this.#attackingPlayer, this.#defendingPlayer] = [
      this.#defendingPlayer,
      this.#attackingPlayer,
    ];
  }
}
