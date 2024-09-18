class Task {
  #name;

  constructor(name) {
    this.name = name;
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}