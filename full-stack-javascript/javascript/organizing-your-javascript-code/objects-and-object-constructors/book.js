function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
  this.info = function() {
    let readString;
    if (this.read) {
      readString = "read";
    } else {
      readString = "not read yet";
    }
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${readString}`;
  }
}