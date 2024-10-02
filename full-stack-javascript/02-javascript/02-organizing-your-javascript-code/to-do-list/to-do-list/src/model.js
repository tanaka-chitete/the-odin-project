class Model {
  constructor() {
    this.projectNameToTasks = JSON.parse(localStorage.getItem("projectNameToTasks")) || {"General": []};
  }

  pushProjects() {
    this.onProjectsChanged(Object.keys(this.projectNameToTasks));
  }

  pushTasks(project) {
    this.onProjectChanged(project, this.projectNameToTasks[project]);
  }

  pushDueToday() {
    const allTasks = Object.values(this.projectNameToTasks).flat();
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

  pushDueThisWeek() {
    const allTasks = Object.values(this.projectNameToTasks).flat();
    const tasksDueThisWeek = allTasks.filter((task) => {
      const dueDate = new Date(task["dueDate"]);
      const currentDate = new Date();
      const oneWeekFromNow = new Date(currentDate);
      const oneWeekInDays = 7;
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + oneWeekInDays);

      return currentDate < dueDate && dueDate <= oneWeekFromNow;
    });

    this.onProjectChanged("Upcoming", tasksDueThisWeek);
  }

  pushOverdue() {
    const allTasks = Object.values(this.projectNameToTasks).flat();
    const overdueTasks = allTasks.filter((task) => {
      const dueDate = new Date(task["dueDate"]);
      const currentDate = new Date();
      const yesterday = new Date(currentDate);
      const oneDay = 1;
      yesterday.setDate(yesterday.getDate() - oneDay);

      return dueDate <= yesterday;
    });

    this.onProjectChanged("Overdue", overdueTasks);
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

    localStorage.setItem("projectNameToTasks", JSON.stringify(this.projectNameToTasks));
    this.onTasksChanged(projectName, this.projectNameToTasks[projectName]);
  }

  deleteTask(projectName, id) {
    this.projectNameToTasks[projectName].splice(id, 1);
    localStorage.setItem("projectNameToTasks", JSON.stringify(this.projectNameToTasks));
    this.onTasksChanged(projectName, this.projectNameToTasks[projectName]);
  }

  createProject(projectName) {
    if (!this.projectNameToTasks.hasOwnProperty(projectName)) {
      this.projectNameToTasks[projectName] = [];
      localStorage.setItem("projectNameToTasks", JSON.stringify(this.projectNameToTasks));
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