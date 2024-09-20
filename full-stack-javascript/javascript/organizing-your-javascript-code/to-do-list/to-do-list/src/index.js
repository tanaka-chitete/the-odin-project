import "./styles/styles.css";

import { Model } from "./model/model.js";
import { View } from "./view/view.js";
import { Controller } from "./controller/controller.js";

const app = new Controller(new Model(), new View());