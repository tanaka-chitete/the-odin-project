class Model {
  #project;
  #view;

  constructor() {
    this.#project = new Project("General");
    this.#view = new View();
  }

  addTask(name, ...properties) {
    const task = this.#project.addTask(name, ...properties);
    this.#view.listTask(task);
  }

  removeTask(index) {
    this.#project.removeTask(index);
    this.#view.unlistTask(index);
  }
}