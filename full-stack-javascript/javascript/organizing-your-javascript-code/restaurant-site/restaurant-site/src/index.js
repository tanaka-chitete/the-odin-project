import "./modern-normalize.css";
import "./my-reset.css";
import "./styles.css";

import { displayHomePage } from "./home.js";
import { displayMenuPage } from "./menu.js";
import { displayAboutPage } from "./about.js";

displayHomePage();

const brandingButton = document.querySelector("#branding");
brandingButton.addEventListener("click", () => displayHomePage());

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () => displayHomePage());

const menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", () => displayMenuPage());

const aboutButton = document.querySelector("#about");
aboutButton.addEventListener("click", () => displayAboutPage());