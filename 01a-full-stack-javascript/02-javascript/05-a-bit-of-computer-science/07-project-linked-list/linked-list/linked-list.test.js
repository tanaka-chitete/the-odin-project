"use strict"; // Converts mistakes to errors (among other things)

import { LinkedList } from "./linked-list.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append(["bird", "parrot"]);
list.append("hamster");
list.append(new Array());
list.append("turtle");

console.log(list.toString());

console.log(list.contains(["bird", "parrot"]));
console.log(list.find(["bird", "parrot"]));
console.log(list.contains(new Array()));
console.log(list.find(new Array()));
console.log(list.contains("car"));
console.log(list.find("car"));
list.updateAt(2, "pig");
console.log(list.toString());
list.updateAt(4, "hawk");
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
console.log(list.pop());
console.log(list.toString());
