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
    const tasksUl = this.createElement("ul", {"role": "list", "class": "tasks"});
    contentContainerDiv.append(projectNameH1, tasksUl);
    main.append(contentContainerDiv);

    // Create 'Dialog'
    const addTaskDialog = this.createElement("dialog", {"class": "add-task-dialog"});
    const addTaskFormContainerDiv = this.createElement("div", {"class": "add-task-form-container"});
    const addTaskForm = this.createElement("form", {"form": "", "class": "add-task-form"});
    const addTaskNameInput = this.createElement("input", {"type": "text", "placeholder": "Name", "class": "add-task-form__input"});
    const addTaskDescriptionInput = this.createElement("input", {"type": "text", "placeholder": "Description", "class": "add-task-form__input"});
    const hr = this.createElement("hr");
    const addTaskActionsDiv = this.createElement("div", {"class": "add-task-form__actions"});
    const addTaskCancelButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskCancelButton.textContent = "Cancel";
    const addTaskSubmitButton = this.createElement("button", {"class": "add-task-form__button"});
    addTaskSubmitButton.textContent = "Submit";
    addTaskActionsDiv.append(addTaskCancelButton, addTaskSubmitButton);
    addTaskForm.append(addTaskNameInput, addTaskDescriptionInput, hr, addTaskActionsDiv);
    addTaskFormContainerDiv.append(addTaskForm);
    addTaskDialog.append(addTaskFormContainerDiv);

    this.app.append(aside, main, addTaskDialog);

    // this.addTaskDialog = this.createElement()

    // this.configureAddTaskButton();
    // TODO: Add click event listener to "Add Project" button
    // TODO: Add click event listener to "Today" button
    // TODO: Add click event listener to "Upcoming" button
  }

  addTask(name, ...properties) {
    this.controller.addTask(/* ... */);
  }

  listTask(task) {
    // ...
  }

  removeTask(index) {
    this.controller.removeTask(index);
  }

  unlistTask(index) {
    // ...
  }

  createElement(tag, attrs={}) {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([k, v]) => {
      element.setAttribute(k, v);
    })

    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  configureAddTaskButton() {
    const addTaskButton = document.querySelector(".features__feature-button_name_add-task");
    const addTaskDialog = document.querySelector(".add-task-dialog");

    addTaskButton.addEventListener("click", () => addTaskDialog.showModal());

    const addTaskForm = document.querySelector(".add-task-form");
    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTask();
    });
  }
}

export { View };