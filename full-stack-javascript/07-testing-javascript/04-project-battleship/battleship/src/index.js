"use strict";

import "./styles/main.css";

import { Controller } from "./scripts/controller/controller";
import { Model } from "./scripts/model/model";
import { View } from "./scripts/view/view";

new Controller(new Model(), new View());
