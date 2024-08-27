import "./modern-normalize.css";
import "./my-reset.css";
import "./styles.css";

import { displayHome } from "./home.js";

displayHome();

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", () => displayHome());