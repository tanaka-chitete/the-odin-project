class Model {
  constructor() {
    this.projectNameToTasks = {"General": []};
  }

  pushProjects() {
    this.onProjectsChanged(Object.keys(this.projectNameToTasks));
  }

  createTask(taskName, description, projectName, dueDate, priority) {
    this.projectNameToTasks[projectName].push({
      "taskName": taskName,
      "description": description,
      "dueDate": dueDate,
      "priority": priority
    });

    this.onTasksChanged("General", this.projectNameToTasks["General"]);
  }

  // deleteTask(id) {
  //   this.projectNameToTasks["General"].splice(id);

  //   this.onTasksChanged(this.projectNameToTasks["General"]);
  // }

  bindToOnProjectsChanged(callback) {
    this.onProjectsChanged = callback;
  }

  bindToOnTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}

export { Model };