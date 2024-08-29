const displayHomePage = () => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container", "container_home");

  const heroDiv = document.createElement("div");
  heroDiv.classList.add("hero");
  containerDiv.append(heroDiv);

  const main = document.querySelector("main");
  main.replaceChildren(containerDiv);
};

export { displayHomePage };