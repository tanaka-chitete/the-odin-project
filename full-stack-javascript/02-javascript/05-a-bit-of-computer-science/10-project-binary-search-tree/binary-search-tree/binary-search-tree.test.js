"use strict"; // Converts mistakes to errors (among other things)

import { BinarySearchTree } from "./binary-search-tree.js";

// Create tree with numbers less than 100
const binarySearchTree = new BinarySearchTree(makeArray());
binarySearchTree.print();

// Verify that the tree is balanced
console.log(`isBalanced = ${binarySearchTree.isBalanced()}`);

// Traverse the tree
console.log("levelOrder");
binarySearchTree.levelOrder();
console.log("preOrder");
binarySearchTree.preOrder();
console.log("inOrder");
binarySearchTree.inOrder();
console.log("postOrder");
binarySearchTree.postOrder();

// Insert numbers greater than 100
const numberOfNumbersToAdd = getInteger(3, 10);
for (let i = 0; i < 3; i++) {
  binarySearchTree.insert(getInteger(100, 1_000));
}

// Verify that the tree is balanced
console.log(`isBalanced = ${binarySearchTree.isBalanced(console.log)}`);

// Balance the tree
binarySearchTree.balance();

// Verify that the tree is balanced
console.log(`isBalanced = ${binarySearchTree.isBalanced(console.log)}`);

// Traverse the tree
console.log("levelOrder");
binarySearchTree.levelOrder();
console.log("preOrder");
binarySearchTree.preOrder();
console.log("inOrder");
binarySearchTree.inOrder();
console.log("postOrder");
binarySearchTree.postOrder();

function makeArray() {
  const length = getInteger(10, 100);
  const array = [];
  for (let i = 0; i < 5; i++) {
    array.push(getInteger());
  }

  return array;
}

function getInteger(minimum = 0, maximum = 100) {
  return minimum + Math.floor(Math.random() * maximum);
}
