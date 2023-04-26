const modals = document.querySelectorAll("[data-modal]");
let bookNookLibrary = [];

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});


// Constructor
function Book(title, author, pages, published, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.read = read;
}
// test book object
const newBook = new Book(
  "Matilda",
  "Roald Dahl",
  239,
  "october 1, 1988",
  "yes"
);

console.log(newBook);

//Create button element for book in hmtl
const bookButton = document.createElement("button");
bookButton.classList.add("book");

//Create title element based off books title
const bookTitle = document.createElement("p");
bookTitle.textContent = `"${newBook.title}"`;
bookTitle.classList.add("book-title");
//Assigns bookTitle as Child to bookButton
bookButton.appendChild(bookTitle);



const bookContainer = document.querySelector(".shelf");
bookContainer.appendChild(bookButton);

function addBookToLibrary() {}
