import "./styles/main.css";

import { Model } from "./scripts/model.js";
import { View } from "./scripts/view.js";
import { Controller } from "./scripts/controller.js";

const controller = new Controller(new Model(), new View());

controller.onSearch("Paris");
