class View {
  #controller;

  constructor() {
    this.#controller = new Controller();

    // TODO: Add click event listener to "Add Task" button
    // TODO: Add click event listener to "Add Project" button
    // TODO: Add click event listener to "Today" button
    // TODO: Add click event listener to "Upcoming" button
  }

  addTask(name, ...properties) {
    this.#controller.addTask(/* ... */);
  }

  listTask(task) {
    // ...
  }

  removeTask(index) {
    this.#controller.removeTask(index);
  }

  unlistTask(index) {
    // ...
  }

  // addProject(form) {
  //   this.#controller.addProject(/* ... */);
  // }

  // removeProject(index) {
  //   this.#controller.removeProject(index);
  // }
}