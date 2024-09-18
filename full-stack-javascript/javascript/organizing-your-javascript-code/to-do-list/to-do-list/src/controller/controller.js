class Controller {
  #model;

  constructor() {
    this.#model = new Model();
  }

  addTask(name, ...properties) {
    this.#model.addTask(name, ...properties);
  }

  removeTask(index) {
    this.#model.removeTask(index);
  }
}