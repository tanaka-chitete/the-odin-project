"use strict";

export class View {
  #messageElement;
  #portElement;
  #seaElement;
  #consoleElement;

  constructor() {
    this.#messageElement = document.querySelector(".message");
    this.#portElement = document.querySelector(".port");
    this.#seaElement = document.querySelector(".sea");
    this.#consoleElement = document.querySelector(".console");

    const startGameButton = this.#consoleElement.querySelector(
      ".console__button_type_start-game"
    );
    startGameButton.addEventListener("click", () => {
      this.onStartGame();
    });
  }

  handleGameStarted(response) {
    document
      .querySelector(".console__panel_type_game-start")
      .classList.add("hidden");
    document
      .querySelector(".console__panel_type_placement")
      .classList.remove("hidden");
    this.#updateMessageElement(response.getMessage());
  }

  bindToOnStartGame(callback) {
    this.onStartGame = callback;
  }

  #updateMessageElement(message) {
    this.#messageElement.textContent = message;
  }
}
