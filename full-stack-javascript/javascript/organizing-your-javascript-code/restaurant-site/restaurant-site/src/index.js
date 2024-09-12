import "./modern-normalize.css";
import "./reset.css";
import "./styles.css";

import { displayHomePage } from "./home.js";
import { displayMenuPage } from "./menu.js";
import { displayAboutPage } from "./about.js";
import { displayEasterEggPage } from "./easter_egg.js";

displayHomePage();

const navBrandButton = document.querySelector("#nav-brand");
navBrandButton.addEventListener("click", () => displayHomePage());

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () => displayHomePage());

const menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", () => displayMenuPage());

const aboutButton = document.querySelector("#about");
aboutButton.addEventListener("click", () => displayAboutPage());

const footerBrandButton = document.querySelector("#footer-brand");
footerBrandButton.addEventListener("click", () => displayEasterEggPage());