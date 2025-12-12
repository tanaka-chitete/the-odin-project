"use strict"; // Converts mistakes to errors (among other things)

export class BinarySearchTree {
  /**
   * Represents a binary search tree.
   * @constructor
   * @param {Array} array
   */
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  /**
   * Converts a given array into a balanced binary search tree.
   * @param {Array} array
   */
  #buildTree(array) {
    array = [...new Set(array)];
    array.sort();

    function recur(startIndex, endIndex) {
      if (startIndex > endIndex) {
        return null;
      }

      const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

      const root = new BinarySearchTreeNode(array[middleIndex]);

      root.left = recur(startIndex, middleIndex - 1);
      root.right = recur(middleIndex + 1, endIndex);

      return root;
    }

    return recur(0, array.length - 1);
  }

  /**
   * Inserts a value into the tree.
   * @param {Number} value
   */
  insert(value, root = this.root) {
    if (root == null) {
      return new BinarySearchTreeNode(value);
    }

    if (root.value === value) {
      throw new Error(`Node with value = ${value} already exists`);
    }

    if (value < root.value) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  /**
   * Deletes a value from the tree.
   * @param {Number} value
   */
  delete(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.value) {
      root.left = this.delete(value, root.right);
    } else if (value > root.value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      const successor = this.#getSuccessor(root);
      root.value = successor.value;
      root.right = this.delete(root.right, successor.value);
    }
  }

  /**
   * Finds the node with a given value
   * @param {Number} value
   */
  find(value, root = this.root) {
    if (root === null) {
      return null;
    }

    if (value == root.value) {
      return root;
    }

    if (value < this.root) {
      return this.find(value, root.left);
    }

    return this.find(value, root.right);
  }

  /**
   * Traverses the tree using level-order traversal, processing each node with a given callback.
   * @param {Function} callback
   */
  levelOrder(callback = console.log, root = this.root) {
    const queue = [root];
    const visited = [];

    while (queue.length !== 0) {
      const current = queue.shift();

      callback(current.value);

      visited.push(current.value);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    return visited;
  }

  /**
   * Traverses the tree using pre-order traversal, processing each node with a given callback.
   */
  preOrder(callback = console.log, root = this.root) {
    if (root === null) {
      return;
    }

    callback(root.value);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  /**
   * Traverses the tree using in-order traversal, processing each node with a given callback.
   * @param {Function} callback
   */
  inOrder(callback = console.log, root = this.root) {
    if (root === null) {
      return;
    }

    this.preOrder(callback, root.left);
    callback(root.value);
    this.preOrder(callback, root.right);
  }

  /**
   * Traverses the tree using post-order traversal, processing each node with a given callback.
   * @param {Function} callback
   */
  postOrder(callback = console.log, root = this.root) {
    if (root === null) {
      return;
    }

    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
    callback(root.value);
  }

  /**
   * Returns the height of a given node. Height is defined as the number of
   * edges in the longest path from a given node to a leaf node.
   * @param {BinarySearchTreeNode} root
   * @returns {Number}
   */
  height(root = this.root) {
    if (root == null) {
      return 0;
    }

    return 1 + Math.max(this.height(root.left), this.height(root.right));
  }

  /**
   * Returns the depth of a given node. Depth is defined as the number of edges
   * in the path from a given node to the tree's root node.
   * @param {BinarySearchTreeNode} target
   * @returns {Number}
   */
  depth(target) {
    let depth = 0;
    let current = this.root;

    while (current !== null && target.value !== current.value) {
      depth++;
      current = current.value < target.value ? current.right : current.left;
    }

    if (target.value === current.value) {
      return depth;
    }

    return -1;
  }

  /**
   * Returns true if the tree is balanced, false otherwise. A tree is balanced
   * if the difference in height between the left and right subtree of every
   * node is no more than 1.
   * @return {Boolean}
   */
  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  /**
   * Balances the tree if it is unbalanced
   */
  balance() {
    // 1. Convert tree to array, using traversal method
    const array = this.levelOrder();

    // 2. Reassign this.root, using buildTree
    this.root = this.#buildTree(array);
  }

  /**
   * Prints the tree.
   * @param {BinarySearchTreeNode} node
   * @param {*} prefix
   * @param {*} isLeft
   */
  print(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #getSuccessor(root) {
    const current = root;

    while (current !== null && current.left !== null) {
      current = current.left;
    }

    return current;
  }
}

class BinarySearchTreeNode {
  /**
   * Represents a node for a binary search tree.
   * @constructor
   * @param {value}
   */
  constructor(value) {
    if (Number.isNaN(value)) {
      throw new Error("Value must be a number");
    }

    this.value = value;
    this.left = null;
    this.right = null;
  }
}
