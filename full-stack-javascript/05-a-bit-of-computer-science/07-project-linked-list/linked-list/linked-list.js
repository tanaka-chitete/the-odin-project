"use strict"; // Converts mistakes to errors (among other things)

export class LinkedList {
  /**
   * Represents a linked list.
   * @constructor
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Adds a new node containing `value` to the end of the list
   * @param {Object} value
   */
  append(value) {
    const newTail = new LinkedListNode(value);

    if (this.size() === 0) {
      this.tail = newTail;
      this.head = newTail;
    } else {
      this.tail.next = newTail;
      this.tail = newTail;
    }

    this.size++;
  }

  /**
   * Adds a new node containing `value` to the start of the list.
   * @param {Object} value
   */
  prepend(value) {
    const newHead = new LinkedListNode(value);

    if (this.size() === 0) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }

    this.size++;
  }

  /**
   * Returns the node at `index`.
   * @param {Number} targetIndex
   * @returns {LinkedListNode}
   */
  at(targetIndex) {
    if (!Number.isInteger(targetIndex)) {
      throw new Error("`index` must be an integer.");
    }

    if (targetIndex < 0 || targetIndex > this.size - 1) {
      throw new Error("`index` is out of bounds.");
    }

    let current = this.head;
    let currentIndex = 0;

    while (currentIndex != targetIndex) {
      current = current.next;
      currentIndex++;
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
      const newTail = this.at(this.size - 2);
      newTail.next = null;
      this.tail = newTail;
    }

    this.size--;

    return oldTail;
  }

  /**
   * Returns true if `value` is in the list. Otherwise, returns false.
   * @param {Object} value
   * @returns {Boolean}
   */
  contains(value) {
    let current = this.head;

    while (current != null && current.value !== value) {
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
    let currentIndex = 0;

    while (current != null && current.value !== value) {
      current = current.next;
      currentIndex++;
    }

    return current === null ? -1 : currentIndex;
  }

  /**
   * Inserts a new node with `value` at `index`.
   * @param {Object} value
   * @param {Number} index
   */
  insertAt(value, index) {
    if (!Number.isInteger(index)) {
      throw new Error("`index` must be an integer.");
    }

    if (index < 0 || index > this.size() - 1) {
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

    this.size++;
  }

  /**
   * Removes the node at `index`.
   * @param {Number} index
   * @returns {LinkedListNode}
   */
  removeAt(index) {
    const count = this.size();

    if (count === 0) {
      throw new Error("Data structure is empty.");
    }

    if (!Number.isInteger(index)) {
      throw new Error("`index` must be an integer.");
    }

    if (index < 0 || index > count - 1) {
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

    this.size--;
  }

  /**
   * Returns a string representation of the list.
   * @returns {String}
   */
  toString() {
    let current = this.head;
    let linkedListAsString = "";

    while (current != null) {
      linkedListAsString += `( ${current.value} ) -> `;

      current = current.next;
    }
    linkedListAsString += "null";

    return linkedListAsString;
  }
}

// Reimplement as a factory method
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
