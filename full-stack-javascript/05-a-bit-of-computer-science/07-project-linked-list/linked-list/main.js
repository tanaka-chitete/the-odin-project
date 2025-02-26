"use strict"; // Converts mistakes to errors (among other things)

import { LinkedList } from "./linked-list.js";

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

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
