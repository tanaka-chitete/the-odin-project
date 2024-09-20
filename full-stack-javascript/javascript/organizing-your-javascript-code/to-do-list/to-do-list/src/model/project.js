class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.tasks = [];
  }

  addTask(taskName, taskDescription, ...properties) {
    const newTask = new Task(taskName, taskDescription, ...properties);
    this.tasks.push(newTask);
    return newTask;
  }

  removeTask(index) {
    return this.tasks.slice(index)[0];
  }
}

export { Project };