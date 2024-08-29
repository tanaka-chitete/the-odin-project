const displayHomePage = () => {
  const heroImage = document.createElement("div");
  heroImage.classList.add("hero-image");

  const main = document.querySelector("main");
  main.replaceChildren(heroImage);
};

export { displayHomePage };