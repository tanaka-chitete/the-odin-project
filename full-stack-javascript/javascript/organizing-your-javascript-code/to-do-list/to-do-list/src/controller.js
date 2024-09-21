class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindCreateTask(this.handleAddTask);
    this.model.bindTasksChanged(this.onTasksChanged);
  }

  handleAddTask = (taskName, description, ...properties) => {
    this.model.addTask(taskName, description, ...properties);
  }

  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  }

  onTasksChanged = (tasks) => {
    this.view.displayTasks(tasks);
  }
}

export { Controller };