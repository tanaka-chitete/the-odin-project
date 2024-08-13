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
  const book = new Book(title, author, numPages, read);
  library.push(book);

  return book;
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

const addBookForm = document.querySelector(".add-book-dialog__form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const bookObject = addBookToLibrary(
    addBookForm.elements["title"].value, 
    addBookForm.elements["author"].value, 
    Number(addBookForm.elements["numPages"].value),
    String(addBookForm.elements["read"].value) === "true"   
  )

  const library = document.querySelector(".library");
  const bookElement = `
    <li data-index="${library.childElementCount} class="library__book">
      <p class="library__book-info">${bookObject.info()}</p>
      <button class="library__book-remove-book-button">Remove</button>
    </li>
  `;
  library.innerHTML += bookElement;
  
  addBookForm.reset();

  addBookDialog.close();
});
