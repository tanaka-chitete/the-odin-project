class View {
  constructor() {
    this.app = this.getElement("#root");

    // Create 'Sidebar'
    const aside = this.createElement("aside");
    
    const sidebarSectionTop = this.createElement("div", {"class": "sidebar-section"});
    const addTaskButton = this.createElement("button", {"type": "button", "class": "sidebar-action"});
    const addTaskIconSpan = this.createElement("span", {"class": "material-symbols-outlined"});
    addTaskIconSpan.textContent = "add_circle";
    const addTaskH2 = this.createElement("h2");
    addTaskH2.textContent = "Add task";
    addTaskButton.append(addTaskIconSpan, addTaskH2);
    sidebarSectionTop.append(addTaskButton);
    
    const sidebarSectionMiddle = this.createElement("div", {"class": "sidebar-section"});
    const actionsUl = this.createElement("ul", {"role": "list"});
    
    const dueTodayLi = this.createElement("li");
    const dueTodayButton = this.createElement("button", {"type": "button", "class": "sidebar-action"});
    const dueTodayIcon = this.createElement("span", {"class": "material-symbols-outlined"});
    dueTodayIcon.textContent = "today";
    const dueTodayH3 = this.createElement("h3");
    dueTodayH3.textContent = "Today";
    dueTodayButton.append(dueTodayIcon, dueTodayH3);
    dueTodayLi.append(dueTodayButton);

    const dueNextWeekLi = this.createElement("li");
    const dueNextWeekButton = this.createElement("button", {"type": "button", "class": "sidebar-action"});
    const dueNextWeekIcon = this.createElement("span", {"class": "material-symbols-outlined"});
    dueNextWeekIcon.textContent = "date_range";
    const dueNextWeekH3 = this.createElement("h3");
    dueNextWeekH3.textContent = "Upcoming";
    dueNextWeekButton.append(dueNextWeekIcon, dueNextWeekH3);
    dueNextWeekLi.append(dueNextWeekButton);

    actionsUl.append(dueTodayLi, dueNextWeekLi);
    sidebarSectionMiddle.append(actionsUl);

    const sidebarSectionBottom = this.createElement("div", {"class": "sidebar-section"});

    const projectsH2 = this.createElement("h2");
    projectsH2.textContent = "Projects";

    const addProjectButton = this.createElement("button", {"type": "button", "class": "sidebar-action"});
    const addProjectIcon = this.createElement("div", {"class": "material-symbols-outlined"});
    addProjectIcon.textContent = "add";
    addProjectButton.append(addProjectIcon, projectsH2);

    this.projectsUl = this.createElement("ul", {"role": "list"});
    sidebarSectionBottom.append(addProjectButton, this.projectsUl)

    aside.append(sidebarSectionTop, sidebarSectionMiddle, sidebarSectionBottom);

    // Create 'Main'
    const main = this.createElement("main");
    const contentContainerDiv = this.createElement("div", {"class": "content"});
    this.projectNameH1 = this.createElement("h1", {"class": "project-name"});
    this.tasksUl = this.createElement("ul", {"role": "list", "class": "tasks"});
    contentContainerDiv.append(this.projectNameH1, this.tasksUl);
    main.append(contentContainerDiv);

    // Create 'Add Task' Dialog
    this.addTaskDialog = this.createElement("dialog");
    this.addTaskForm = this.createElement("form");
    const addTaskFormSectionTop = this.createElement("div", {"class": "form-section form-section_flex-direction_column"});
    const addTaskNameInput = this.createElement("input", {"type": "text", "placeholder": "Name", "name": "taskName", "class": "emphasise"});
    const addTaskDescriptionInput = this.createElement("input", {"type": "text", "placeholder": "Description", "name": "description"});
    addTaskFormSectionTop.append(addTaskNameInput, addTaskDescriptionInput);
    const addTaskFormSectionMiddle = this.createElement("div", {"class": "form-section"});
    const dueDateInput = this.createElement("input", {"type": "date", "name": "dueDate"});
    const prioritySelect = this.createElement("select", {"name": "priority"});
    const priorityHighOption = this.createElement("option", {"value": "high"});
    priorityHighOption.textContent = "High";
    const priorityMediumOption = this.createElement("option", {"value": "medium"});
    priorityMediumOption.textContent = "Medium";
    const priorityLowOption = this.createElement("option", {"value": "low"});
    priorityLowOption.textContent = "Low";
    const priorityNoneOption = this.createElement("option", {"value": "none", "selected": "true"});
    priorityNoneOption.textContent = "None";
    prioritySelect.append(priorityHighOption, priorityMediumOption, priorityLowOption, priorityNoneOption);
    addTaskFormSectionMiddle.append(dueDateInput, prioritySelect);
    const hr = this.createElement("hr");
    const addTaskFormSectionBottom = this.createElement("div", {"class": "form-section form-section_justify-content_space-between"});
    this.projectSelect = this.createElement("select", {"name": "projectName"});
    const addTaskFormSectionBottomRight = this.createElement("div", {"class": "group"})
    
    const addTaskCancelButton = this.createElement("button", {"type": "reset"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"type": "submit", "class": ""});
    addTaskSubmitButton.textContent = "Add";
    addTaskFormSectionBottomRight.append(addTaskCancelButton, addTaskSubmitButton);
    addTaskFormSectionBottom.append(this.projectSelect, addTaskFormSectionBottomRight);
    this.addTaskForm.append(addTaskFormSectionTop, addTaskFormSectionMiddle, hr, addTaskFormSectionBottom);
    this.addTaskDialog.append(this.addTaskForm);

    // Create 'Add Project' Dialog
    this.addProjectDialog = this.createElement("dialog");
    this.addProjectForm = this.createElement("form");
    const addProjectNameInput = this.createElement("input", {"type": "text", "name": "projectName", "placeholder": "Name", "class": "emphasise"});
    const addProjectFormSectionBottom = this.createElement("div", {"class": "form-section form-section_justify-content_flex-end"});
    const addProjectCancelButton = this.createElement("button", {"type": "reset"});
    addProjectCancelButton.textContent = "Cancel";
    const addProjectSubmitButton = this.createElement("button", {"type": "submit"});
    addProjectSubmitButton.textContent = "Add";
    const buttonGroup = this.createElement("div", {"class": "group"});
    buttonGroup.append(addProjectCancelButton, addProjectSubmitButton);
    addProjectFormSectionBottom.append(buttonGroup);
    const hr2 = this.createElement("hr");
    this.addProjectForm.append(addProjectNameInput, hr2, addProjectFormSectionBottom);
    this.addProjectDialog.append(this.addProjectForm);

    // Add event listeners
    addTaskButton.addEventListener("click", () => {
      this.addTaskDialog.showModal();
      // Prompts event listener to populate 'Projects' list
      const openEvent = new Event("open");
      this.addTaskDialog.dispatchEvent(openEvent);
    });

    this.addTaskForm.addEventListener("reset", event => 
      this.addTaskDialog.close()
    );

    // Add event listeners
    addProjectButton.addEventListener("click", () => this.addProjectDialog.showModal());

    this.addProjectForm.addEventListener("reset", event => 
      this.addProjectDialog.close()
    );

    this.app.append(aside, main, this.addTaskDialog, this.addProjectDialog);
  }


  createElement(tag, attributeNameToValue={}) {
    const element = document.createElement(tag);

    Object.entries(attributeNameToValue).forEach(
      ([attributeName, attributeValue]) => {
        element.setAttribute(attributeName, attributeValue);
      }
    );

    return element;
  }

  // TODO: Refactor to only get stored elements. so have a bunch of getters?
  getElement(selector) { 
    return document.querySelector(selector);
  }

  bindToAddTaskOpen(handle) {
    this.addTaskDialog.addEventListener("open", event => {
      event.preventDefault();
      handle();
    });
  }

  bindToAddTaskSubmit(handle) {
    this.addTaskForm.addEventListener("submit", event => {
      event.preventDefault();

      const taskName = event.target.elements["taskName"].value;
      const description = event.target.elements["description"].value;
      const projectName = event.target.elements["projectName"].value;
      const dueDate = event.target.elements["dueDate"].value;
      const priority = event.target.elements["priority"].value;

      if (taskName) {
        handle(taskName, description, projectName, dueDate, priority);
        event.target.reset();
        event.target.parentElement.close();
      }
    });
  }

  bindToAddProjectSubmit(handle) {
    this.addProjectForm.addEventListener("submit", event => {
      event.preventDefault();

      const projectName = event.target.elements["projectName"].value;

      if (projectName) {
        handle(projectName);
        event.target.reset();
        event.target.parentElement.close();
      }
    })
  }

  bindToUpdateTaskSubmit(handle) {
    this.handleUpdateTaskSubmit = handle;
  }

  bindToChangeProjectClick(handle) {
    this.handleChangeProjectClick = handle;
  }

  displayProjects(projects) {
    this.projectsUl.replaceChildren();

    projects.forEach((project) => {
      const projectLi = this.createElement("li");
      const projectButton = this.createElement("button", {"type": "button", "class": "sidebar-action"});
      const projectIcon = this.createElement("span", {"class": "material-symbols-outlined"});
      projectIcon.textContent = "tactic";
      const projectH3 = this.createElement("h3");
      projectH3.textContent = project;

      projectButton.addEventListener("click", () => {
        this.handleChangeProjectClick(project);
      });

      projectButton.append(projectIcon, projectH3)
      projectLi.append(projectButton);

      this.projectsUl.append(projectLi);
    });

    this.projectSelect.replaceChildren();
  
    projects.forEach((project) => {
      const projectOption = this.createElement("option", {"value": project});
      projectOption.textContent = project;
      this.projectSelect.append(projectOption);
    });
  }

  displayTasks(project, tasks) {
    this.tasksUl.replaceChildren();

    this.projectNameH1.textContent = project;

    if (tasks.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do!";
      this.tasksUl.append(p);

      return;
    } 

    tasks.forEach(task => {
      const taskLi = this.createElement("li", {"class": "tasks__task"});
      const taskLeftSectionDiv = this.createElement("div", {"class": "tasks__task-section"});
      const uncheckedCircleButton = this.createElement("button", {"type": "button", "class": "tasks__task-action tasks__task-action_type_complete"});
      const uncheckedCircleSpan = this.createElement("span", {"class": "material-symbols-outlined"});
      switch (task["priority"].toLowerCase()) {
        case "high":
          uncheckedCircleSpan.classList.add("high-priority");
          break;
        case "medium":
          uncheckedCircleSpan.classList.add("medium-priority");
          break;
        case "low":
          uncheckedCircleSpan.classList.add("low-priority");
          break;
        default:
          uncheckedCircleSpan.classList.add("no-priority");
          break;
      }
      uncheckedCircleSpan.textContent = "circle";
      uncheckedCircleButton.append(uncheckedCircleSpan)
      taskLeftSectionDiv.append(uncheckedCircleButton);

      const taskRightSectionDiv = this.createElement("div", {"class": "tasks__task-section"});
      const taskNameP = this.createElement("p");
      taskNameP.textContent = task["taskName"];
      const descriptionSpan = this.createElement("span");
      descriptionSpan.textContent = task["description"];
      const dueDateSpan = this.createElement("span");
      dueDateSpan.textContent = task["dueDate"];
      const taskRightSectionButton = this.createElement("button", {"type": "button", "class": "tasks__task-action tasks__task-action_type_edit"});
      taskRightSectionButton.addEventListener("click", () => {
        this.addTaskDialog.showModal();

        this.addTaskForm.elements["taskName"].value = task["taskName"];
        this.addTaskForm.elements["description"].value = task["description"];
        this.addTaskForm.elements["projectName"].value = task["projectName"];
        this.addTaskForm.elements["dueDate"].value = task["dueDate"];
        this.addTaskForm.elements["priority"].value = task["priority"];

        this.handleUpdateTaskSubmit
      });
      taskRightSectionButton.append(taskNameP, descriptionSpan, dueDateSpan);
      taskRightSectionDiv.append(taskRightSectionButton);
      taskLi.append(taskLeftSectionDiv, taskRightSectionDiv);

      this.tasksUl.append(taskLi);
    });
  }
}

export { View };