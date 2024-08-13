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

function displayBook(book) {
  const library = document.querySelector(".library");
  library.innerHTML += `
    <li data-index="${library.childElementCount} class="library__book">
      <p class="library__book-info">${book.info()}</p>
      <button class="library__book-remove-book-button">Remove</button>
    </li>
  `;
  
  const bookElement = library.lastElementChild;
  const removeBookButton = bookElement.querySelector(".library__book-remove-book-button");
  removeBookButton.addEventListener("click", () => {
    hideBook(bookElement);
    removeBookFromLibrary(Number(bookElement.dataset.index));
  });
}

function hideBook(book) {
  book.remove();
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
}

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

const addBookForm = document.querySelector(".add-book-dialog__form");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const book = addBookToLibrary(
    addBookForm.elements["title"].value, 
    addBookForm.elements["author"].value, 
    Number(addBookForm.elements["numPages"].value),
    String(addBookForm.elements["read"].value) === "true"   
  )
  
  displayBook(book);
  
  addBookForm.reset();
  
  addBookDialog.close();
});
