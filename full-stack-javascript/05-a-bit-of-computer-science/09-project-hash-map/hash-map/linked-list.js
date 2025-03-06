"use strict"; // Converts mistakes to errors (among other things)

export class LinkedList {
  #size;

  /**
   * Represents a linked list.
   * @constructor
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.#size = 0;
  }

  /**
   * Adds a new node containing `value` to the end of the list
   * @param {Object} value
   */
  append(value) {
    const newTail = new LinkedListNode(value);

    if (this.#size === 0) {
      this.tail = newTail;
      this.head = newTail;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }

    this.#size++;
  }

  /**
   * Adds a new node containing `value` to the start of the list.
   * @param {Object} value
   */
  prepend(value) {
    const newHead = new LinkedListNode(value);

    if (this.#size === 0) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }

    this.#size++;
  }

  /**
   * Returns the number of items.
   * @returns {Number}
   */
  size() {
    return this.#size;
  }

  /**
   * Returns true if the list is empty. Otherwise, false
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Returns the node at `index`.
   * @param {Number} index
   * @returns {LinkedListNode}
   */
  at(index) {
    if (!Number.isInteger(index)) {
      throw new Error("`index` must be an integer.");
    }

    if (index < 0 || index > this.#size - 1) {
      throw new Error("`index` is out of bounds.");
    }

    let current = this.head;
    let i = 0;

    while (i != index) {
      current = current.next;
      i++;
    }

    return current;
  }

  /**
   * Removes the last item from the list.
   * @returns {LinkedListNode}
   */
  pop() {
    if (this.head === null) {
      throw new Error("Data structure is empty.");
    }

    const oldTail = this.tail;

    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      const newTail = this.at(this.#size - 2);
      newTail.next = null;
      this.tail = newTail;
    }

    this.#size--;

    return oldTail;
  }

  /**
   * Returns true if `value` is in the list. Otherwise, returns false.
   * @param {Object} value
   * @returns {Boolean}
   */
  contains(value) {
    let current = this.head;

    while (current != null && current.value.valueOf() !== value.value()) {
      current = current.next;
    }

    return current === null ? false : true;
  }

  /**
   * Returns the index of the node containing `value`, if found. Otherwise, returns null.
   * @param {Object} value
   * @returns {LinkedListNode|null}
   */
  find(value) {
    let current = this.head;
    let i = 0;

    while (current != null && current.value.valueOf() !== value.valueOf()) {
      current = current.next;
      i++;
    }

    return current === null ? -1 : i;
  }

  /**
   * Inserts a new node with `value` at `index`.
   * @param {Number} index
   * @param {Object} value
   */
  insertAt(index, value) {
    if (!Number.isInteger(index)) {
      throw new Error("`index` must be an integer.");
    }

    if (index < 0 || index > this.#size - 1) {
      throw new Error("`index` is out of bounds.");
    }

    if (index === 0) {
      this.prepend(value);
    } else {
      let previous = null;
      let current = this.head;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }

      const node = new LinkedListNode(value);
      node.next = current;
      previous.next = node;
    }

    this.#size++;
  }

  /**
   * Updates a node at a particular index with a new value.
   * @param {Number} index
   * @param {Object} value
   */
  updateAt(index, value) {
    const node = this.at(index);
    if (!node) {
      throw new Error(`Node with value=${value} does not exist`);
    }

    node.value = value;
  }

  /**
   * Removes the node at `index`.
   * @param {Number} index
   * @returns {LinkedListNode}
   */
  removeAt(index) {
    if (this.#size === 0) {
      throw new Error("Data structure is empty.");
    }

    if (!Number.isInteger(index)) {
      throw new Error("`index` must be an integer.");
    }

    if (index < 0 || index > this.#size - 1) {
      throw new Error("`index` is out of bounds.");
    }

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let previous = null;
      let current = this.head;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
      if (current === this.tail) {
        this.tail = previous;
      }
    }

    this.#size--;
  }

  /**
   * Returns a string representation of the list.
   * @returns {String}
   */
  toString() {
    let current = this.head;
    let listAsString = "";

    while (current != null) {
      listAsString += `( ${current.value} ) -> `;

      current = current.next;
    }
    listAsString += "null";

    return listAsString;
  }

  /**
   * Returns an array representation of the list.
   * @returns {Array}
   */
  toArray() {
    let current = this.head;
    let listAsArray = [];

    while (current != null) {
      listAsArray.push(current.value);

      current = current.next;
    }

    return listAsArray;
  }
}

class LinkedListNode {
  /**
   * Represents a node for a linked list.
   * @constructor
   * @param {Object} value
   */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
