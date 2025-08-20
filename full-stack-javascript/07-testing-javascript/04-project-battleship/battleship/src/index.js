"use strict";

import "./styles/main.css";

import { Admiral } from "./scripts/model/admiral";
import { Controller } from "./scripts/controller/controller";
import { Port } from "./scripts/model/port";
import { Sea } from "./scripts/model/sea";
import { View } from "./scripts/view/view";

new View(
  new Controller(
    new Admiral("Admiral 1", new Sea(new Port())),
    new Admiral("Admiral 2", new Sea(new Port()))
  )
);
