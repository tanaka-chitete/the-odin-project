"use strict"; // Converts mistakes to errors (among other things)

import { knightMoves } from "./knight-moves.js";

console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([3, 3], [4, 3]));
