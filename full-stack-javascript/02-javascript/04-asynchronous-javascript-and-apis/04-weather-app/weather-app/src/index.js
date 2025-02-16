import "./styles/main.css";

import { Model } from "./scripts/model.js";
import { View } from "./scripts/view.js";
import { Controller } from "./scripts/controller.js";

new Controller(new Model(), new View());
