const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown-button");
  button.addEventListener("click", () => {
    const list = dropdown.querySelector(".dropdown-menu-items");
    if (list.classList.contains("dropdown-menu-items_hidden")) {
      list.classList.remove("dropdown-menu-items_hidden");
    } else {
      list.classList.add("dropdown-menu-items_hidden");
    }
  });
});
