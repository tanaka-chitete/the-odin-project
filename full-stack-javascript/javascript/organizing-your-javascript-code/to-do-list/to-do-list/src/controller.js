class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindToAddTaskOpen(this.handleAddTaskOpen);
    this.view.bindToAddTaskSubmit(this.handleAddTaskSubmit);
    this.model.bindToOnProjectNamesChanged(this.onProjectNamesChanged);
    this.model.bindToOnTasksChanged(this.onTasksChanged);
  }

  // Use handle... for things coming from view
  // Use on... for things coming from model

  handleAddTaskOpen = () => {
    console.log("handleAddTaskOpen()");
    this.model.getProjectNames();
  }

  handleAddTaskSubmit = (taskName, description, ...properties) => {
    this.model.addTask(taskName, description, ...properties);
  }

  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  }

  onProjectNamesChanged = (projectNames) => {
    this.view.displayProjectNames(projectNames);
  }

  onTasksChanged = (tasks) => {
    this.view.displayTasks(tasks);
  }
}

export { Controller };