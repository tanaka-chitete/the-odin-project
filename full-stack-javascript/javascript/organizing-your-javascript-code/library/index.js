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

function addBookToLibrary(title, author, numPages, read) {
  library.push(new Book(title, author, numPages, read));
  console.dir(library);
}


const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

const addBookForm = document.querySelector(".add-book-dialog__form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addBookToLibrary(addBookForm.elements["title"].value, 
                   addBookForm.elements["author"].value, 
                   Number(addBookForm.elements["numPages"].value),
                   String(addBookForm.elements["read"].value) === "true"   
                  )

  addBookForm.reset();

  addBookDialog.close();
});
