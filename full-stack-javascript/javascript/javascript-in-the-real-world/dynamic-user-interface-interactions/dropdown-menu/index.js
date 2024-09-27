const dropdownButton = document.querySelector(".dropdown-button");
dropdownButton.addEventListener("click", () => {
  const dropdownMenuItems = document.querySelector(".dropdown-menu-items");
  console.log(dropdownMenuItems);
  if (dropdownMenuItems.classList.contains("dropdown-menu-items_hidden")) {
    dropdownMenuItems.classList.remove("dropdown-menu-items_hidden");
  } else {
    dropdownMenuItems.classList.add("dropdown-menu-items_hidden");
  }
});
