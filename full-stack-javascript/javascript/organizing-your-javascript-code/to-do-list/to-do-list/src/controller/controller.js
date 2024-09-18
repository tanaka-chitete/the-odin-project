class Controller {
  #model;

  constructor() {
    this.#model = new Model();
  }

  addTask(name) {
    this.#model.addTask(name);
  }

  removeTask(index) {
    this.#model.removeTask(index);
  }

  // handleAddProject(name) {

  // }

  // handleRemoveProject(index) {

  // }
}