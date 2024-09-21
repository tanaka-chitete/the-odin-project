class Model {
  constructor() {
    this.projectNameToProject = {"General": []};
    this.currentProjectName = undefined; // ?
    // Should the model maintain which is the current project? Yes!
  }

  getProjectNames() {
    this.onProjectNamesChanged(Object.keys(this.projectNameToProject));
  }

  addTask(...properties) {
    const [
      taskName, 
      taskDescription = "", // This is optional
      dueDate = "", // This is optional
      priority
    ] = [...properties];

    this.projectNameToProject["General"].push({
      "taskName": taskName,
      "taskDescription": taskDescription,
      "dueDate": dueDate,
      "priority": priority
    });

    this.onTasksChanged(this.projectNameToProject["General"]);
  }

  deleteTask(id) {
    this.projectNameToProject["General"].splice(id);

    this.onTasksChanged(this.projectNameToProject["General"]);
  }

  bindToOnProjectNamesChanged(callback) {
    this.onProjectNamesChanged = callback;
  }

  bindToOnTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}

export { Model };