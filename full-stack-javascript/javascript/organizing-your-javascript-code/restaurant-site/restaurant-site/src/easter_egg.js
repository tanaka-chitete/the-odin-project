import tagPng from "../assets/illustrations/tag-final.png";

const displayEasterEggPage = () => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container", "container_page_easter-egg");

  const tagImg = document.createElement("img");
  tagImg.src = tagPng;
  tagImg.classList.add("easter-egg");
  containerDiv.append(tagImg);

  const main = document.querySelector("main");
  main.replaceChildren(containerDiv);
};

export { displayEasterEggPage };