"use strict";

function Book(title, author, numPages, read) {
  if (!(this instanceof Book)) {
    throw Error("Use the new operator to call this function");
  }

  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${read ? "read" : "unread"}`;
  }
}

const library = new Array();
library.push(new Book("A Little Life", "Hanya Yanigihara", 700, true));
library.push(new Book("The Bell Jar", "Sylvia Plath", 288, true));
library.push(new Book("The Pragmatic Programmer", "Andrew Hunt, David Thomas", 320, true));

function addToLibrary() {
  // This function should only add one book at a time
}
