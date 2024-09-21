class View {
  constructor() {
    this.app = this.getElement("#root");

    // Create 'Sidebar'
    const aside = this.createElement("aside");
    const sidebarContainerDiv = this.createElement("div", {"class": "sidebar-container"});
    const featuresUl = this.createElement("ul", {"role": "list", "class": "features"});
    const addTaskLi = this.createElement("li", {"class": "features__feature"});
    const addTaskButton = this.createElement("button", {"type": "button", "class": "features__feature-button features__feature-button_name_add-task"});

    const addTaskIconSpan = this.createElement("span", {"class": "material-symbols-outlined"});
    addTaskIconSpan.textContent = "add_circle";
    const addTaskTextSpan = this.createElement("span");
    addTaskTextSpan.textContent = "Add task";
    addTaskButton.append(addTaskIconSpan, addTaskTextSpan);
    addTaskLi.append(addTaskButton);
    featuresUl.append(addTaskLi);
    sidebarContainerDiv.append(featuresUl);
    aside.append(sidebarContainerDiv);

    // Create 'Main'
    const main = this.createElement("main");
    const contentContainerDiv = this.createElement("div", {"class": "content-container"});
    this.projectNameH1 = this.createElement("h1", {"class": "project-name"});
    this.tasksUl = this.createElement("ul", {"role": "list", "class": "tasks"});
    contentContainerDiv.append(this.projectNameH1, this.tasksUl);
    main.append(contentContainerDiv);

    // Create 'Dialog'
    this.addTaskDialog = this.createElement("dialog", {"class": "add-task-dialog"});
    this.addTaskForm = this.createElement("form", {"form": "", "class": "add-task-form"});
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
    this.projectNameSelect = this.createElement("select", {"name": "projectName", "class": "add-task-form__input add-task-form__input_type_select"});

    const addTaskFormSectionBottomRight = this.createElement("div", {"class": "add-task-form__section add-task-form__section_position_bottom-right"})
    const addTaskCancelButton = this.createElement("button", {"type": "reset", "class": "add-task-form__button add-task-form__button_name_cancel"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"type": "submit", "class": "add-task-form__button"});
    addTaskSubmitButton.textContent = "Add";
    addTaskFormSectionBottomRight.append(addTaskCancelButton, addTaskSubmitButton);
    addTaskFormSectionBottom.append(this.projectNameSelect, addTaskFormSectionBottomRight);
    this.addTaskForm.append(addTaskFormSectionTop, addTaskFormSectionMiddle, hr, addTaskFormSectionBottom);
    this.addTaskDialog.append(this.addTaskForm);

    // Add event listeners
    addTaskButton.addEventListener("click", () => {
      this.addTaskDialog.showModal();

      const openEvent = new Event("open");
      this.addTaskDialog.dispatchEvent(openEvent);
    });

    this.addTaskForm.addEventListener("reset", event => 
      this.addTaskDialog.close()
    );

    this.app.append(aside, main, this.addTaskDialog);
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

      const taskName = this.addTaskForm.elements["taskName"].value;
      const description = this.addTaskForm.elements["description"].value;
      const projectName = this.addTaskForm.elements["projectName"].value;
      const dueDate = this.addTaskForm.elements["dueDate"].value;
      const priority = this.addTaskForm.elements["priority"].value;

      if (taskName) {
        handle(taskName, description, projectName, dueDate, priority);

        this.addTaskForm.reset();
        this.addTaskDialog.close();
      }
    });
  }

  displayProjectNames(projectNames) {
    this.projectNameSelect.replaceChildren();

    projectNames.forEach((projectName) => {
      const projectNameOption = this.createElement("option", {"value": projectName});
      projectNameOption.textContent = projectName;
      this.projectNameSelect.append(projectNameOption);
    });
  }

  displayProject(projectName, tasks) {
    this.tasksUl.replaceChildren();

    this.projectNameH1.textContent = projectName;

    if (tasks.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do!";
      this.tasksUl.append(p);
    } else {
      console.log(tasks);
      tasks.forEach(task => {
        const taskLi = this.createElement("li", {"class": "tasks__task"});
        const taskLeftSectionDiv = this.createElement("div", {"class": "tasks__task-section"});
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
        taskLeftSectionDiv.append(uncheckedCircleSpan);

        const taskRightSectionDiv = this.createElement("div", {"class": "tasks__task-section tasks__task-section_position_right"});
        const taskNameP = this.createElement("p");
        taskNameP.textContent = task["taskName"];
        const descriptionSpan = this.createElement("span");
        descriptionSpan.textContent = task["description"];
        const dueDateSpan = this.createElement("span");
        dueDateSpan.textContent = task["dueDate"];
        taskRightSectionDiv.append(taskNameP, descriptionSpan, dueDateSpan);
        taskLi.append(taskLeftSectionDiv, taskRightSectionDiv);

        const hr = this.createElement("hr");

        this.tasksUl.append(taskLi, hr);
      });
    }
  }
}

export { View };