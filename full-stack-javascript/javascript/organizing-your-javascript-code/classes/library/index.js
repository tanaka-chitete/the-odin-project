class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
  
  info() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? "read" : "unread"}`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  add(bookForm) {
    const bookObject = new Book(
      bookForm.elements["title"].value, 
      bookForm.elements["author"].value, 
      Number(bookForm.elements["numPages"].value),
      String(bookForm.elements["read"].value) === "true"   
    )

    this.books.push(bookObject);

    bookForm.reset();

    const addBookDialog = document.querySelector(".add-book-dialog");
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
      this.remove(event.target.parentElement);
    })

    bookElement.append(info);
    bookElement.append(remove);
    
    libraryElement.append(bookElement);
  }

  remove(bookElement) {
    this.books.splice(Number(bookElement.dataset.index));
    bookElement.remove();
  }
}

const library = new Library();

const addBookDialog = document.querySelector(".add-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

addBookButton.addEventListener("click", () => addBookDialog.showModal());

const bookForm = document.querySelector(".add-book-dialog__form");
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  library.add(event.target);  
});
