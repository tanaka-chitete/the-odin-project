import tagPng from "../assets/illustrations/tag-final.png";

const storyArray = [
  "For the past twelve years, nicola has been an eatery ever curious to learn and grow—to be the best that we can be. Our origin is rooted in an exploration of the natural world, which began with a simple desire to rediscover wild local ingredients by foraging and to follow the seasons.",
  "Since the early years, we have added many layers to what we do; we have teams dedicated only to innovation, another team is specialized in fermentation, we have full-time foragers, gardeners, and researchers. We've traveled the world in search of inspiration, technique, friendship, and new ingredients. Over the years we've grown our staff from a mere seven, to now more than thirty.",
  "Pursuit of knowledge, devout creativity, relentless teamwork, and surprising our guests are essential to who we are."
]

const displayAboutPage = () => {
  const aboutCoreDiv = document.createElement("div");
  aboutCoreDiv.classList.add("about-core");

  const aboutCoreTopDiv = document.createElement("div");
  aboutCoreTopDiv.classList.add("about-core-top");

  const title = document.createElement("h1");
  title.textContent = "Who we are";

  const storyArticle = document.createElement("article");
  storyArray.forEach((paragraphString) => {
    const paragraphP = document.createElement("p");
    paragraphP.textContent = paragraphString;
    storyArticle.append(paragraphP);
  });

  aboutCoreTopDiv.append(title, storyArticle);
  aboutCoreDiv.append(aboutCoreTopDiv);

  const tagImg = document.createElement("img");
  tagImg.src = tagPng;
  tagImg.setAttribute("alt", "Tag");

  const main = document.querySelector("main");
  main.replaceChildren(aboutCoreDiv);
}

export { displayAboutPage };