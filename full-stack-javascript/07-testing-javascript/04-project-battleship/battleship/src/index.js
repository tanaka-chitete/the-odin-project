"use strict";

import "./styles/main.css";

import { Controller } from "./scripts/controller/controller";
import { View } from "./scripts/view/view";
import { Admiral } from "./scripts/model/admiral";

new Controller(new Admiral("Admiral 1"), new Admiral("Admiral 2"), new View());
