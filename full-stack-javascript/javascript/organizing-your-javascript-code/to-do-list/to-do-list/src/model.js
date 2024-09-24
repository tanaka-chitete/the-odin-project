import { compareAsc } from "date-fns";

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

  pushDueToday() {
    const allTasks = Object.values(this.projectNameToTasks).flat();
    console.log(allTasks);
    const tasksDueToday = allTasks.filter((task) => {
      const dueDate = new Date(task["dueDate"]);
      const currentDate = new Date();

      return (
        dueDate.getFullYear() === currentDate.getFullYear() &&
        dueDate.getMonth() === currentDate.getMonth() &&
        dueDate.getDate() === currentDate.getDate()
      );
    });

    this.onProjectChanged("Today", tasksDueToday);
  }

  createTask(taskName, description, projectName, dueDate, priority, id) {
    const newTask = {
      "taskName": taskName,
      "description": description,
      "projectName": projectName,
      "dueDate": dueDate,
      "priority": priority
    }

    if (!id) {
      this.projectNameToTasks[projectName].push(newTask);
    } else {
      this.projectNameToTasks[projectName][id] = newTask;
    }

    this.onTasksChanged(projectName, this.projectNameToTasks[projectName]);
  }

  deleteTask(projectName, id) {
    this.projectNameToTasks[projectName].splice(id, 1);
    this.onTasksChanged(projectName, this.projectNameToTasks[projectName]);
  }

  createProject(projectName) {
    if (!this.projectNameToTasks.hasOwnProperty(projectName)) {
      this.projectNameToTasks[projectName] = [];
      this.onProjectsChanged(Object.keys(this.projectNameToTasks));
    }
  }

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