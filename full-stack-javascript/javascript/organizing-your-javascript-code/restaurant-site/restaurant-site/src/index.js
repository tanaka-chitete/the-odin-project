import "./modern-normalize.css";
import "./reset.css";
import "./styles.css";

import { displayHomePage } from "./home.js";
import { displayMenuPage } from "./menu.js";
import { displayAboutPage } from "./about.js";

displayHomePage();

const brandButton = document.querySelector("#brand");
brandButton.addEventListener("click", () => displayHomePage());

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () => displayHomePage());

const menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", () => displayMenuPage());

const aboutButton = document.querySelector("#about");
aboutButton.addEventListener("click", () => displayAboutPage());