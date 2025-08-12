export class Missile {
  #detonated;

  constructor() {
    this.#detonated = false;
  }

  detonate() {
    this.#detonated = true;
  }

  didDetonate() {
    return this.#detonated;
  }
}
