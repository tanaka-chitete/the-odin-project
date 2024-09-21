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
    const projectNameH1 = this.createElement("h1");
    projectNameH1.textContent = "General";
    this.tasksUl = this.createElement("ul", {"role": "list", "class": "tasks"});
    contentContainerDiv.append(projectNameH1, this.tasksUl);
    main.append(contentContainerDiv);

    // Create 'Dialog'
    this.addTaskDialog = this.createElement("dialog", {"class": "add-task-dialog"});
    const addTaskFormContainerDiv = this.createElement("div", {"class": "add-task-form-container"});
    this.addTaskForm = this.createElement("form", {"form": "", "class": "add-task-form"});
    const addTaskNameInput = this.createElement("input", {"type": "text", "name": "name", "placeholder": "Name", "class": "add-task-form__input add-task-form__input_type_task-name"});
    const addTaskDescriptionInput = this.createElement("input", {"type": "text", "name": "description", "placeholder": "Description", "class": "add-task-form__input add-task-form__input_type_task-description"});
    const propertiesDiv = this.createElement("div", {"class": "add-task-form__properties"});
    const dueDateInput = this.createElement("input", {"type": "date", "name": "due-date", "class": "add-task-form__input add-task-form__input_type_due-date"});
    const prioritySelect = this.createElement("select", {"name": "priority", "class": "add-task-form__input add-task-form__input_type_priority"});
    const priorityHighOption = this.createElement("option", {"value": "high"});
    priorityHighOption.textContent = "High";
    const priorityMediumOption = this.createElement("option", {"value": "medium"});
    priorityMediumOption.textContent = "Medium";
    const priorityLowOption = this.createElement("option", {"value": "low"});
    priorityLowOption.textContent = "Low";
    prioritySelect.append(priorityHighOption, priorityMediumOption, priorityLowOption);
    prioritySelect.selectedIndex = 2;
    propertiesDiv.append(dueDateInput, prioritySelect);
    const hr = this.createElement("hr");
    const addTaskActionsDiv = this.createElement("div", {"class": "add-task-form__actions"});
    const addTaskCancelButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskSubmitButton.textContent = "Submit";
    addTaskActionsDiv.append(addTaskCancelButton, addTaskSubmitButton);
    this.addTaskForm.append(addTaskNameInput, addTaskDescriptionInput, hr, propertiesDiv, addTaskActionsDiv);
    addTaskFormContainerDiv.append(this.addTaskForm);
    this.addTaskDialog.append(addTaskFormContainerDiv);

    // Add event listeners
    addTaskButton.addEventListener("click", () => this.addTaskDialog.showModal());

    this.app.append(aside, main, this.addTaskDialog);
  }

  createElement(tag, attrs={}) {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([k, v]) => {
      element.setAttribute(k, v);
    })

    return element;
  }

  // TODO: Refactor to only get stored elements. so have a bunch of getters?
  getElement(selector) { 
    return document.querySelector(selector);
  }

  bindAddTask(handle) {
    this.addTaskForm.addEventListener("submit", event => {
      event.preventDefault();

      const taskName = this.addTaskForm.elements["name"].value;
      const taskDescription = this.addTaskForm.elements["description"].value;
      const dueDate = this.addTaskForm.elements["due-date"].value;
      const priority = this.addTaskForm.elements["priority"].value;

      if (taskName) {
        handle(taskName, taskDescription, dueDate, priority);

        this.addTaskForm.reset();
        this.addTaskDialog.close();
      }
    });
  }

  displayTasks(tasks) {
    // Removes old tasks from the DOM
    this.tasksUl.replaceChildren();

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
        const taskDescriptionSpan = this.createElement("span");
        taskDescriptionSpan.textContent = task["taskDescription"];
        const dueDateSpan = this.createElement("span");
        dueDateSpan.textContent = task["dueDate"];
        taskRightSectionDiv.append(taskNameP, taskDescriptionSpan, dueDateSpan);
        taskLi.append(taskLeftSectionDiv, taskRightSectionDiv);

        const hr = this.createElement("hr");

        this.tasksUl.append(taskLi, hr);
      });
    }
  }
}

export { View };