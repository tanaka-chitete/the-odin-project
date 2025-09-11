export class Missile {
  #stopped;
  #detonated;

  constructor() {
    this.#stopped = false;
    this.#detonated = false;
  }

  stop() {
    this.#stopped = true;
  }

  hasStopped() {
    return this.#stopped;
  }

  detonate() {
    this.#detonated = true;
  }

  hasDetonated() {
    return this.#detonated;
  }
}
