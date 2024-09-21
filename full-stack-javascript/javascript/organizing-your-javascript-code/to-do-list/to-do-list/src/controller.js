class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindToAddTaskOpen(this.handleAddTaskOpen);
    this.view.bindToAddTaskSubmit(this.handleAddTaskSubmit);
    this.model.bindToOnProjectNamesChanged(this.onProjectNamesChanged);
    this.model.bindToOnProjectChanged(this.onProjectChanged);

    this.onProjectChanged("General", this.model.projectNameToTasks["General"]);
  }

  handleAddTaskOpen = () => {
    this.model.getProjectNames();
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

  handleDeleteTask = (index) => {
    this.model.deleteTask(index);
  }

  onProjectNamesChanged = (projectNames) => {
    this.view.displayProjectNames(projectNames);
  }

  onProjectChanged = (projectName, tasks) => {
    this.view.displayProject(projectName, tasks);
  }
}

export { Controller };