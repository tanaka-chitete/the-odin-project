class Model {
  constructor() {
    this.projectNameToProject = {"General": []};
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

  bindTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}

export { Model };