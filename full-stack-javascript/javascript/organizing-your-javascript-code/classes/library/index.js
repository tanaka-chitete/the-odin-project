class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
  
  get info() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? "read" : "unread"}`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  add(title, author, numPages, read) {
    const book = new Book(title, author, numPages, read);

    this.books.push(book);

    return book;
  }
  
  // The client will know that the underlying data structure is an array. Problem?
  remove(index) {
    this.books.splice(index);
  }
}

class Controller {
  constructor() {
    this.library = new Library();
    
    const addBookButton = document.querySelector(".add-book-button");
    const addBookDialog = document.querySelector(".add-book-dialog");
    addBookButton.addEventListener("click", () => addBookDialog.showModal());
    
    const addBookForm = document.querySelector(".add-book-dialog__form");
    addBookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAddBook(event.target);
    });
  }
  
  handleAddBook(addBookForm) {
    const bookObject = this.library.add(
      addBookForm.elements["title"].value, 
      addBookForm.elements["author"].value, 
      Number(addBookForm.elements["numPages"].value),
      String(addBookForm.elements["read"].value) === "true"   
    );
    
    addBookForm.reset();
    
    const addBookDialog = addBookForm.parentElement;
    addBookDialog.close();
    
    const libraryDiv = document.querySelector(".library");
    
    const bookListItem = document.createElement("li");
    bookListItem.dataset.index = libraryDiv.childElementCount;
    bookListItem.classList.add("library__book");
    
    const bookP = document.createElement("p");
    bookP.classList.add("library__book-info");
    bookP.textContent = `${bookObject.info}`;
    
    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("library__book-remove-book-button");
    removeBookButton.textContent = "Remove";
    removeBookButton.addEventListener("click", (event) => {
      this.handleRemoveBook(event.target.parentElement);
    });

    bookListItem.append(bookP);
    bookListItem.append(removeBookButton);
    
    libraryDiv.append(bookListItem);
  }
  
  handleRemoveBook(bookListItem) {
    bookListItem.remove();
    this.library.remove(Number(bookListItem.dataset.index));
  }
}

new Controller();
