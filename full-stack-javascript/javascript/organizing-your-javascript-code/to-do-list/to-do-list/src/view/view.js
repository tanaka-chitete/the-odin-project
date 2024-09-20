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
    const addTaskNameInput = this.createElement("input", {"type": "text", "name": "name", "placeholder": "Name", "class": "add-task-form__input"});
    const addTaskDescriptionInput = this.createElement("input", {"type": "text", "name": "description", "placeholder": "Description", "class": "add-task-form__input"});
    const hr = this.createElement("hr");
    const addTaskActionsDiv = this.createElement("div", {"class": "add-task-form__actions"});
    const addTaskCancelButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskSubmitButton.textContent = "Submit";
    addTaskActionsDiv.append(addTaskCancelButton, addTaskSubmitButton);
    this.addTaskForm.append(addTaskNameInput, addTaskDescriptionInput, hr, addTaskActionsDiv);
    addTaskFormContainerDiv.append(this.addTaskForm);
    this.addTaskDialog.append(addTaskFormContainerDiv);

    // Add event listeners
    addTaskButton.addEventListener("click", () => this.addTaskDialog.showModal());

    // this.addTaskForm.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   this.addTask();
    // });


    // Build DOM
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

      if (taskName) {
        handle(taskName, taskDescription);

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
        const uncheckedCircleSpan = this.createElement("span", {"class": "material-symbols-outlined"});
        taskLeftSectionDiv.append(uncheckedCircleSpan);

        const taskRightSectionDiv = this.createElement("div", {"class": "tasks__task-section"});
        const taskNameP = this.createElement("p");
        taskNameP.textContent = task.taskName;
        const taskDescriptionSpan = this.createElement("span");
        taskDescriptionSpan.textContent = task.taskDescription;
        taskRightSectionDiv.append(taskNameP, taskDescriptionSpan);
        taskLi.append(taskLeftSectionDiv, taskRightSectionDiv);

        const hr = this.createElement("hr");

        this.tasksUl.append(taskLi, hr);
      });
    }
  }
}

export { View };