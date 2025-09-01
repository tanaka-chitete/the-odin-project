"use strict";

import "./styles/main.css";

import { Admiral } from "./scripts/model/admiral";
import { Operation } from "./scripts/controller/operation";
import { Interface } from "./scripts/view/interface";

new Interface(
  new Operation(new Admiral("Admiral 1"), new Admiral("Admiral 2"))
);
