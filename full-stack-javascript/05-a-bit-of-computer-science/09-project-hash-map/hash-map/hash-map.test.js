"use strict"; // Converts mistakes to errors (among other things)

import { HashMap } from "./hash-map.js";

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");
console.log(map.size());

map.set("carrot", "blue");
map.set("hat", "pink");
map.set("dog", "green");
console.log(map.size());

map.set("moon", "silver");
console.log(map.size());

map.set("ice cream", "gray");
console.log(map.size());
map.set("elephant", "white");
console.log(map.size());
map.set("frog", "pink");
console.log(map.size());

console.log(map.has("apple"));
console.log(map.has("pineapple"));

console.log(map.get("apple"));
console.log(map.get("pineapple"));

console.log(map.remove("hat"));
console.log(map.size());
console.log(map.keys());
console.log(map.remove("kite"));
console.log(map.size());
console.log(map.values());
console.log(map.remove("ice cream"));
console.log(map.size());
console.log(map.entries());
