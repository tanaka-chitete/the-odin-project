"use strict"; // Converts mistakes to errors (among other things)

import { LinkedList } from "./linked-list.js";

export class HashMap {
  #maxLoadFactor = 0.75;
  #_size;
  #capacity;
  #buckets;

  /**
   * Represents a hash map.
   * @constructor
   */
  constructor() {
    this.clear();
  }

  /**
   * Sets a key-value pair. If the given key already exists, the existing value
   * is overwritten with the given value.
   * @param {String} key
   * @param {Object} value
   */
  set(key, value) {
    if (typeof key !== "string") {
      throw new Error("key must be a string");
    }

    const bucketIndex = this.#hash(key) % this.#capacity;

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("bucket index is out of bounds");
    }

    const bucket = this.#buckets[bucketIndex];
    const nodeIndex = bucket.find(new HashMapEntry(key));
    if (nodeIndex !== -1) {
      bucket.updateAt(nodeIndex, new HashMapEntry(key, value));
    } else {
      bucket.append(new HashMapEntry(key, value));
      this.#_size++;
    }

    if (this.#_size / this.#capacity > this.#maxLoadFactor) {
      this.#resize();
    }
  }

  /**
   * If the given key exists, returns the associated value. Otherwise, returns
   * null.
   * @param {String} key
   * @returns {null|Object}
   */
  get(key) {
    if (typeof key !== "string") {
      throw new Error("key must be a string");
    }

    const bucketIndex = this.#hash(key) % this.#capacity;
    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("bucket index is out of bounds");
    }

    let value;
    try {
      const bucket = this.#buckets[bucketIndex];
      const nodeIndex = bucket.find(new HashMapEntry(key));
      value = bucket.at(nodeIndex).value;
    } catch (error) {
      value = null;
    }

    return value;
  }

  /**
   * If the given key exists, returns true. Otherwise, returns false.
   * @param {String} key
   * @returns {Boolean}
   */
  has(key) {
    if (typeof key !== "string") {
      throw new Error("key must be a string");
    }

    let exists;

    try {
      exists = this.get(key) === null ? false : true;
    } catch (error) {
      exists = false;
    }

    return exists;
  }

  /**
   * If the given key exists, removes the associated entry and returns true.
   * Otherwise, returns false.
   * @param {String} key
   * @returns {Boolean}
   */
  remove(key) {
    if (typeof key !== "string") {
      throw new Error("key must be a string");
    }

    const bucketIndex = this.#hash(key) % this.#capacity;

    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("bucket index is out of bounds");
    }

    let removed;

    try {
      const bucket = this.#buckets[bucketIndex];
      const nodeIndex = bucket.find(new HashMapEntry(key));
      if (nodeIndex === -1) {
        removed = false;
      } else {
        bucket.removeAt(nodeIndex);
        this.#_size--;
        removed = true;
      }
    } catch (error) {
      removed = false;
    }

    return removed;
  }

  /**
   * Returns the number of entries.
   * @returns {Number}
   */
  size() {
    return this.#_size;
  }

  /**
   * Removes all entries.
   */
  clear() {
    this.#_size = 0;
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity);

    for (let i = 0; i < this.#buckets.length; i++) {
      this.#buckets[i] = new LinkedList();
    }
  }

  /**
   * Returns an array containing all keys.
   * @returns {Array}
   */
  keys() {
    const entries = this.#buckets.map((bucket) => bucket.toArray()).flat();
    const keys = entries.map((entry) => entry.key);

    return keys;
  }

  /**
   * Returns an array containing all values.
   * @returns {Array}
   */
  values() {
    const entries = this.#buckets.map((bucket) => bucket.toArray()).flat();
    const values = entries.map((entry) => entry.value);

    return values;
  }

  /**
   * Returns an array containing all entries.
   * @returns {Array}
   */
  entries() {
    const entriesAsObjects = this.#buckets
      .map((bucket) => bucket.toArray())
      .flat();
    const entriesAsArrays = entriesAsObjects.map((entry) => [
      entry.key,
      entry.value,
    ]);

    return entriesAsArrays;
  }

  /**
   * Hashes a key using algorithm from The Odin Project (https://www.theodinproject.com/lessons/javascript-hashmap#assignment).
   * @param {String} key
   * @returns {Number}
   */
  #hash(key) {
    let hash = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hash = primeNumber * hash + key.charCodeAt(i);
    }

    return hash;
  }

  /**
   * Resizes the data structure when the current load factor falls out of the
   * acceptable range.
   */
  #resize() {
    // The load factor should be 0.5 after resizing
    const newCapacity = 2 * this.#_size;
    const newBuckets = new Array(newCapacity);

    for (let i = 0; i < newBuckets.length; i++) {
      newBuckets[i] = new LinkedList();
    }

    const entries = this.entries();
    entries.forEach((entry) => {
      const bucketIndex = this.#hash(entry[0]) % newCapacity;
      newBuckets[bucketIndex].append(new HashMapEntry(entry[0], entry[1]));
    });

    this.#capacity = newCapacity;
    this.#buckets = newBuckets;
  }
}

class HashMapEntry {
  /**
   * Represents an entry for a hash map.
   * @constructor
   * @param {String} key
   * @param {Object} value
   */
  constructor(key, value = null) {
    if (typeof key !== "string") {
      throw new Error("key must be a string");
    }

    this.key = key;
    this.value = value;
  }

  /**
   * Returns the string representation of this entry. This method is necessary
   * as it enables the comparison of entries.
   * @returns
   */
  valueOf() {
    return this.key;
  }
}
