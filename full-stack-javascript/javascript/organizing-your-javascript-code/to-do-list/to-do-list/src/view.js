class View {
  constructor() {
    this.app = this.getElement("#root");

    // Create 'Sidebar'
    const aside = this.createElement("aside", {"class": "sidebar"});
    
    const addTaskButton = this.createElement("button", {"type": "button", "class": "actions__action-button actions__action-button_name_add-task"});
    const addTaskIconSpan = this.createElement("span", {"class": "material-symbols-outlined"});
    addTaskIconSpan.textContent = "add_circle";
    const addTaskH2 = this.createElement("h2");
    addTaskH2.textContent = "Add task";
    addTaskButton.append(addTaskIconSpan, addTaskH2);
    
    const sidebarSectionMiddle = this.createElement("div", {"class": "sidebar__section"});
    const actionsUl = this.createElement("ul", {"role": "list", "class": "actions"});
    
    const dueTodayLi = this.createElement("li", {"class": "actions__action"});
    const dueTodayButton = this.createElement("button", {"type": "button", "class": "actions__action-button"});
    const dueTodayIcon = this.createElement("span", {"class": "material-symbols-outlined"});
    dueTodayIcon.textContent = "today";
    const dueTodayH3 = this.createElement("h3");
    dueTodayH3.textContent = "Today";
    dueTodayButton.append(dueTodayIcon, dueTodayH3);
    dueTodayLi.append(dueTodayButton);

    const dueNextWeekLi = this.createElement("li", {"class": "actions__action"});
    const dueNextWeekButton = this.createElement("button", {"type": "button", "class": "actions__action-button"});
    const dueNextWeekIcon = this.createElement("span", {"class": "material-symbols-outlined"});
    dueNextWeekIcon.textContent = "date_range";
    const dueNextWeekH3 = this.createElement("h3");
    dueNextWeekH3.textContent = "Upcoming";
    dueNextWeekButton.append(dueNextWeekIcon, dueNextWeekH3);
    dueNextWeekLi.append(dueNextWeekButton);

    actionsUl.append(dueTodayLi, dueNextWeekLi);
    sidebarSectionMiddle.append(actionsUl);

    const sidebarSectionBottom = this.createElement("div", {"class": "sidebar__section"});

    const projectsH2 = this.createElement("h2");
    projectsH2.textContent = "Projects";

    const addProjectButton = this.createElement("button", {"type": "button", "class": "actions__action-button"});
    const addProjectIcon = this.createElement("div", {"class": "material-symbols-outlined"});
    addProjectIcon.textContent = "add";
    addProjectButton.append(addProjectIcon, projectsH2);

    this.projectsUl = this.createElement("ul", {"role": "list", "class": "actions"});
    sidebarSectionBottom.append(addProjectButton, this.projectsUl)

    aside.append(addTaskButton, sidebarSectionMiddle, sidebarSectionBottom);

    // Create 'Main'
    const main = this.createElement("main");
    const contentContainerDiv = this.createElement("div", {"class": "content-container"});
    this.projectNameH1 = this.createElement("h1", {"class": "project-name"});
    this.tasksUl = this.createElement("ul", {"role": "list", "class": "tasks"});
    contentContainerDiv.append(this.projectNameH1, this.tasksUl);
    main.append(contentContainerDiv);

    // Create 'Add Task' Dialog
    this.addTaskDialog = this.createElement("dialog");
    this.addTaskForm = this.createElement("form", {"class": "add-task-form"});
    const addTaskFormSectionTop = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_top"});
    const addTaskNameInput = this.createElement("input", {"type": "text", "name": "taskName", "placeholder": "Name", "class": "add-task-form__input add-task-form__input_type_task-name"});
    const addTaskDescriptionInput = this.createElement("input", {"type": "text", "name": "description", "placeholder": "Description", "class": "add-task-form__input add-task-form__input_type_task-description"});
    addTaskFormSectionTop.append(addTaskNameInput, addTaskDescriptionInput);
    const addTaskFormSectionMiddle = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_middle"});
    const dueDateInput = this.createElement("input", {"type": "date", "name": "dueDate", "class": "add-task-form__input add-task-form__input_type_date"});
    const prioritySelect = this.createElement("select", {"name": "priority", "class": "add-task-form__input add-task-form__input_type_select"});
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
    const addTaskFormSectionBottom = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_bottom"});
    this.projectSelect = this.createElement("select", {"name": "projectName", "class": "add-task-form__input add-task-form__input_type_select"});
    const addTaskFormSectionBottomRight = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_bottom-right"})
    
    const addTaskCancelButton = this.createElement("button", {"type": "reset", "class": "add-task-form__button add-task-form__button_name_cancel"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"type": "submit", "class": "add-task-form__button"});
    addTaskSubmitButton.textContent = "Add";
    addTaskFormSectionBottomRight.append(addTaskCancelButton, addTaskSubmitButton);
    addTaskFormSectionBottom.append(this.projectSelect, addTaskFormSectionBottomRight);
    this.addTaskForm.append(addTaskFormSectionTop, addTaskFormSectionMiddle, hr, addTaskFormSectionBottom);
    this.addTaskDialog.append(this.addTaskForm);

    // Create 'Add Project' Dialog
    this.addProjectDialog = this.createElement("dialog");
    this.addProjectForm = this.createElement("form", {"class": "add-task-form"});
    const addProjectNameInput = this.createElement("input", {"type": "text", "name": "projectName", "placeholder": "Name", "class": "add-task-form__input add-task-form__input_type_task-name"});
    const addProjectFormSectionBottom = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_bottom"});
    const addProjectCancelButton = this.createElement("button", {"type": "reset", "class": "add-task-form__button add-task-form__button_name_cancel"});
    addProjectCancelButton.textContent = "Cancel";
    const addProjectSubmitButton = this.createElement("button", {"type": "submit", "class": "add-task-form__button"});
    addProjectSubmitButton.textContent = "Add";
    addProjectFormSectionBottom.append(addProjectCancelButton, addProjectSubmitButton);
    this.addProjectForm.append(addProjectNameInput, addProjectFormSectionBottom);
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

  bindToChangeProjectClick(handle) {
    this.handleChangeProjectClick = handle;
  }

  displayProjects(projects) {
    this.projectsUl.replaceChildren();

    projects.forEach((project) => {
      const projectLi = this.createElement("li", {"class": "actions__action"});
      const projectButton = this.createElement("button", {"type": "button", "class": "actions__action-button"});
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
      const uncheckedCircleButton = this.createElement("button", {"type": "button", "class": "invisible-button"});
      const uncheckedCircleSpan = this.createElement("span", {"class": "material-symbols-outlined tasks__task-check-circle"});
      switch (task["priority"].toLowerCase()) {
        case "high":
          uncheckedCircleSpan.classList.add("tasks__task-check-circle_priority_high");
          break;
        case "medium":
          uncheckedCircleSpan.classList.add("tasks__task-check-circle_priority_medium");
          break;
        case "low":
          uncheckedCircleSpan.classList.add("tasks__task-check-circle_priority_low");
          break;
      }
      uncheckedCircleSpan.textContent = "circle";
      uncheckedCircleButton.append(uncheckedCircleSpan)
      taskLeftSectionDiv.append(uncheckedCircleButton);

      const taskRightSectionDiv = this.createElement("div", {"class": "tasks__task-section tasks__task-section_position_right"});
      const taskNameP = this.createElement("p");
      taskNameP.textContent = task["taskName"];
      const descriptionSpan = this.createElement("p");
      descriptionSpan.textContent = task["description"];
      const dueDateSpan = this.createElement("p");
      dueDateSpan.textContent = task["dueDate"];
      const taskRightSectionButton = this.createElement("button", {"type": "button", "class": "invisible-button"});
      taskRightSectionButton.append(taskNameP, descriptionSpan, dueDateSpan);
      taskRightSectionDiv.append(taskRightSectionButton);
      taskLi.append(taskLeftSectionDiv, taskRightSectionDiv);

      const hr = this.createElement("hr");

      this.tasksUl.append(taskLi, hr);
    });
  }
}

export { View };