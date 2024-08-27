import "./modern-normalize.css";
import "./my-reset.css";
import "./styles.css";

import { displayHome } from "./home.js";
import { displayMenu } from "./menu.js";

// displayHome();

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () => displayHome());

const menuButton = document.querySelector("#menu");
menuButton.addEventListener("click", () => displayMenu());