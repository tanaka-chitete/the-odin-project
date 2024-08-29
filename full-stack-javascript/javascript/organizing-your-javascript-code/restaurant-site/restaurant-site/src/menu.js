const foodsArray = [
  {
    "name": "Artichoke sandwich",
    "info": "Fried artichoke, walnuts, aioli, and agrodolce dressing on focaccia",
    "price": "25.5"
  },
  {
    "name": "Pan-fried asparagus",
    "info": "with king brown mushroom, broad bean, white potato, leek, white bean sauce",
    "price": "34.5"
  },
  {
    "name": "Roast cauliflower and fennel salad",
    "info": "with pickled onion and currants, toasted pine nuts, blood orange, mint dill, Tasman black",
    "price": "31.5"
  },
  {
    "name": "Kimchi pancakes",
    "info": "with carrot and cabbage salad, zucchini, ponzu, sesame dressing, pickled daikon, puffed rice",
    "price": "34.5"
  },
  {
    "name": "Chana dhal",
    "info": "Split chickpea dhal, cod croquettes, papadums, coconut sauce, coriander",
    "price": "34.5"
  },
  {
    "name": "Fioretto",
    "info": "Pan-fried fioretto, celeriac puree, red grapes in vincotto, sage",
    "price": "31.5"
  }
];

const coffeesArray = [
  {
    "name": "White",
    "info": "Pacemaker blend by Sample Coffee with oat or soy",
    "price": "7"
  },
  {
    "name": "Black",
    "info": "Prepared with the day's single origin",
    "price": "7"
  }
];

const teasArray = [
  {
    "name": "Hayashi black (kocha)",
    "info": "Kirishimi-shi, Kagoshima Ken, Japan",
    "price": "9"
  },
  {
    "name": "Chai",
    "info": "House-made chai brewed with honey, ginger, with oat or soy",
    "price": "9"
  },
  {
    "name": "Gunpowder green",
    "info": "East Zhejiang, China. Vegetal, slightly sour, cut grass",
    "price": "9"
  },
  {
    "name": "White peony",
    "info": "Ciawing Co-op, Fujian, China. Stone fruit, cinnamon",
    "price": "9.8"
  }
];

function createLi(itemObject) {
  const itemNameH3 = document.createElement("h3");
  itemNameH3.textContent = itemObject["name"];

  const itemSpan = document.createElement("span");
  itemSpan.textContent = itemObject["info"];
  itemSpan.classList.add("menu-items__menu-item-details");
  itemNameH3.append(itemSpan);

  const itemPriceH3 = document.createElement("h3");
  itemPriceH3.textContent = itemObject["price"];

  const itemLi = document.createElement("li");
  itemLi.classList.add("menu-items__menu-item");
  itemLi.append(itemNameH3, itemPriceH3);

  return itemLi;
}

const displayMenuPage = () => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container", "container_page_menu");

  const foodH1 = document.createElement("h1");
  foodH1.textContent = "Food";
  containerDiv.append(foodH1);

  const foodsUl = document.createElement("ul");
  foodsUl.setAttribute("role", "list");
  foodsUl.classList.add("menu-items");
  foodsArray.forEach((item) => {
    const foodLi = createLi(item);
    foodsUl.append(foodLi);
  });
  containerDiv.append(foodsUl);

  const drinkH1 = document.createElement("h1");
  drinkH1.textContent = "Drink";
  containerDiv.append(drinkH1);

  const coffeeH2 = document.createElement("h2");
  coffeeH2.textContent = "Coffee";
  containerDiv.append(coffeeH2);

  const coffeesUl = document.createElement("ul");
  coffeesUl.setAttribute("role", "list");
  coffeesUl.classList.add("menu-items");
  coffeesArray.forEach((item) => {
    const coffeeLi = createLi(item);
    coffeesUl.append(coffeeLi);
  });
  containerDiv.append(coffeesUl);

  const teaH2 = document.createElement("h2");
  teaH2.textContent = "Tea";
  containerDiv.append(teaH2);

  const teasUl = document.createElement("ul");
  teasUl.setAttribute("role", "list");
  teasUl.classList.add("menu-items");
  teasArray.forEach((item) => {
    const teaLi = createLi(item);
    teasUl.append(teaLi);
  });
  containerDiv.append(teasUl);

  const main = document.querySelector("main");
  main.replaceChildren(containerDiv);
};

export { displayMenuPage };