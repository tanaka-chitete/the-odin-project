class Model {
  constructor() {
    this.projectNameToTasks = {"General": []};
  }

  pushProjects() {
    this.onProjectsChanged(Object.keys(this.projectNameToTasks));
  }

  pushTasks(project) {
    this.onProjectChanged(project, this.projectNameToTasks[project]);
  }

  createTask(taskName, description, projectName, dueDate, priority) {
    this.projectNameToTasks[projectName].push({
      "taskName": taskName,
      "description": description,
      "dueDate": dueDate,
      "priority": priority
    });

    this.onTasksChanged(projectName, this.projectNameToTasks[projectName]);
  }

  createProject(projectName) {
    if (!this.projectNameToTasks.hasOwnProperty(projectName)) {
      this.projectNameToTasks[projectName] = [];
      this.onProjectsChanged(Object.keys(this.projectNameToTasks));
    }
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

  bindToOnProjectChanged(callback) {
    this.onProjectChanged = callback;
  }
}

export { Model };