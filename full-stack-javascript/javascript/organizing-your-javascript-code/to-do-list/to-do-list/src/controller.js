class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindToAddTaskOpen(this.handleAddTaskOpen);
    this.view.bindToAddTaskSubmit(this.handleAddTaskSubmit);
    this.view.bindToAddProjectSubmit(this.handleAddProjectSubmit);
    this.view.bindToChangeProjectClick(this.handleProjectChanged);

    this.model.bindToOnProjectsChanged(this.onProjectsChanged);
    this.model.bindToOnTasksChanged(this.onTasksChanged);
    this.model.bindToOnProjectChanged(this.onProjectChanged);

    this.model.pushProjects();
    this.onTasksChanged("General", this.model.projectNameToTasks["General"]);
  }

  handleProjectChanged = (project) => {
    this.model.pushTasks(project);
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
  ) => this.model.createTask(
    taskName, 
    description, 
    projectName, 
    dueDate, 
    priority
  );

  handleAddProjectSubmit = (projectName) => 
    this.model.createProject(projectName);

  // handleDeleteTask = (id) => {
  //   this.model.deleteTask(id);
  // }

  onProjectsChanged = (projects) => {
    this.view.displayProjects(projects);
  }

  onProjectChanged = (project, tasks) => {
    this.onTasksChanged(project, tasks);
  }

  onTasksChanged = (project, tasks) => {
    this.view.displayTasks(project, tasks);
  }
}

export { Controller };