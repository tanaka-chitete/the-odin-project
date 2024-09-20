import { Project } from "./project.js";

class Model {
  constructor() {
    this.projectNameToProject = {"General": new Project("General")};
  }

  addTask(taskName, taskDescription, ...properties) {
    this.projectNameToProject[DEFAULT_PROJECT_NAME].addTask(
      taskName, 
      taskDescription, 
      ...properties
    );
  }

  deleteTask(id) {
    this.projectNameToProject.deleteTask(id);
  }
}

export { Model };