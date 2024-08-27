const displayHome = () => {
  const heroImage = document.createElement("div");
  heroImage.classList.add("hero-image");

  const main = document.querySelector("main");
  main.append(heroImage);
};

export { displayHome };