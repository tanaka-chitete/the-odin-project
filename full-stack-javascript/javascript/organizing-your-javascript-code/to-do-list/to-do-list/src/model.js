class Model {
  constructor() {
    this.projectNameToTasks = {"General": []};
  }

  getProjectNames() {
    this.onProjectNamesChanged(Object.keys(this.projectNameToTasks));
  }

  createTask(taskName, description, projectName, dueDate, priority) {
    this.projectNameToTasks[projectName].push({
      "taskName": taskName,
      "description": description,
      "dueDate": dueDate,
      "priority": priority
    });

    this.onProjectChanged("General", this.projectNameToTasks["General"]);
  }

  deleteTask(id) {
    this.projectNameToTasks["General"].splice(id);

    this.onProjectChanged(this.projectNameToTasks["General"]);
  }

  bindToOnProjectNamesChanged(callback) {
    this.onProjectNamesChanged = callback;
  }

  bindToOnProjectChanged(callback) {
    this.onProjectChanged = callback;
  }
}

export { Model };