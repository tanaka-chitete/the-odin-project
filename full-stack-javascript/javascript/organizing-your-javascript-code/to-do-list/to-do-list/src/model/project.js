class Project {
  #projectName;
  #tasks;

  constructor(projectName) {
    this.projectName = projectName;
    this.#tasks = [];
  }

  set projectName(projectName) {
    this.#projectName = projectName;
  }

  get projectName() {
    return this.#projectName;
  }

  addTask(taskName, ...properties) {
    const newTask = new Task(taskName);
    this.#tasks.push(newTask);
    return newTask;
  }

  removeTask(index) {
    return this.#tasks.slice(index)[0];
  }
}