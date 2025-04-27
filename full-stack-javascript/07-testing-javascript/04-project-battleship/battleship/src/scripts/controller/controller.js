"use strict";

import { Player } from "../model/player";

export class Controller {
  #players;
  #currentPlayer;

  constructor() {
    this.#players = [new Player(), new Player()];
    this.#currentPlayer = this.#players[0];
  }
}
