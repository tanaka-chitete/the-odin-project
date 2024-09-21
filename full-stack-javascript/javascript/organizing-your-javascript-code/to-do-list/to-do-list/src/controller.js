class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindToAddTaskOpen(this.handleAddTaskOpen);
    this.view.bindToAddTaskSubmit(this.handleAddTaskSubmit);
    this.model.bindToOnProjectsChanged(this.onProjectsChanged);
    this.model.bindToOnTasksChanged(this.onTasksChanged);

    this.model.pushProjects();
    this.onTasksChanged("General", this.model.projectNameToTasks["General"]);
  }

  handleAddTaskOpen = () => {
    this.model.pushProjects();
  }

  handleAddTaskSubmit = (
    taskName, 
    description, 
    projectName, 
    dueDate, 
    priority
  ) => {
    this.model.createTask(
      taskName, 
      description, 
      projectName, 
      dueDate, 
      priority
    );
  }

  // handleDeleteTask = (id) => {
  //   this.model.deleteTask(id);
  // }

  onProjectsChanged = (projects) => {
    this.view.displayProjects(projects);
  }

  onTasksChanged = (project, tasks) => {
    this.view.displayTasks(project, tasks);
  }
}

export { Controller };