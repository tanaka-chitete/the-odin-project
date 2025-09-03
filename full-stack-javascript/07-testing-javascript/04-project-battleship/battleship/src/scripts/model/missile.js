export class Missile {
  #detonated;

  constructor() {
    this.#detonated = false;
  }

  detonate() {
    this.#detonated = true;
  }

  hasDetonated() {
    return this.#detonated;
  }
}
