import { Project } from "./project.js";

class Model {
  constructor() {
    this.projectNameToProject = {"General": new Project("General")};
  }

  addTask(taskName, taskDescription, ...properties) {
    this.projectNameToProject["General"].addTask(
      taskName, 
      taskDescription, 
      ...properties
    );

    this.onTasksChanged(this.projectNameToProject["General"].tasks);
  }

  deleteTask(id) {
    this.projectNameToProject["General"].deleteTask(id);

    this.onTasksChanged(this.projectNameToProject["General"]);
  }

  bindTasksChanged(callback) {
    this.onTasksChanged = callback;
  }
}

export { Model };