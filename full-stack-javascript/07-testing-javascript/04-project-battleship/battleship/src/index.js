"use strict";

import "./styles/main.css";

import { Admiral } from "./scripts/model/admiral";
import { Operation } from "./scripts/controller/operation";
import { Port } from "./scripts/model/port";
import { Sea } from "./scripts/model/sea";
import { Interface } from "./scripts/view/interface";

new Interface(
  new Operation(
    new Admiral("Admiral 1", new Port(), new Sea()),
    new Admiral("Admiral 2", new Port(), new Sea())
  )
);
