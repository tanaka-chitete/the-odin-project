class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  handleAddTask(taskName, description, ...properties) {
    this.model.addTask(taskName, description, ...properties);
  }

  handleDeleteTask(index) {
    this.model.deleteTask(index);
  }
}

export { Controller };