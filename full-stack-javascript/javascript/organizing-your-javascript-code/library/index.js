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

const libraryObject = new Array();

function addBookToLibrary(addBookForm) {
  const bookObject = new Book(
    addBookForm.elements["title"].value, 
    addBookForm.elements["author"].value, 
    Number(addBookForm.elements["numPages"].value),
    String(addBookForm.elements["read"].value) === "true"   
  )

  libraryObject.push(bookObject);
  
  addBookForm.reset();
  addBookDialog.close();

  const libraryElement = document.querySelector(".library");
  
  const bookElement = document.createElement("li");
  bookElement.setAttribute("data-index", libraryElement.childElementCount);
  bookElement.classList.add("library__book");
  
  const info = document.createElement("p");
  info.classList.add("library__book-info");
  info.textContent = `${bookObject.info()}`;
  
  const remove = document.createElement("button");
  remove.classList.add("library__book-remove-book-button");
  remove.textContent = "Remove";
  remove.addEventListener("click", (event) => {
    removeBookFromLibrary(event.target.parentElement);
  })
  
  bookElement.append(info);
  bookElement.append(remove);
  
  libraryElement.append(bookElement);
}

function removeBookFromLibrary(bookElement) {
  libraryObject.splice(Number(bookElement.dataset.index));
  bookElement.remove();
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

const addBookForm = document.querySelector(".add-book-dialog__form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addBookToLibrary(event.target);  
});
