class Model {
  #project;
  #view;

  constructor() {
    this.#project = new Project("General");
    this.#view = new View();
  }

  addTask(name) {
    const task = this.#project.addTask(name);
    this.#view.listTask(task);
  }

  removeTask(index) {
    this.#project.removeTask(index);
    this.#view.unlistTask(index);
  }

  // addProject() {

  // }

  // removeProject() {

  // }
}