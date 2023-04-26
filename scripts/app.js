const modals = document.querySelectorAll("[data-modal]");

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
// Uses dummy info right now, but we can leave it as an empty []
let bookNookLibrary = [
  {
    title: "Matilda",
    author: "Roald Dahl",
    pages: 239,
    published: "October 1, 1988",
    read: "yes",
  },
  {
    title: "A Game of Thrones",
    author: "George R.R Martin",
    pages: 694,
    published: "August 1, 1996",
    read: "yes",
  },
  {
    title: "The Hobbit",
    author: "J.R.R Tolkien",
    pages: 310,
    published: "September 21, 1937",
    read: "yes",
  },
];

const bookContainer = document.querySelector(".shelf");

bookNookLibrary.forEach(function (book) {
  //Create button element for book in hmtl
  const bookButton = document.createElement("button");
  bookButton.classList.add("book");
  //creates pop up... but can't exit it without refreshing page
  bookButton.addEventListener("click", function () {
    console.log("Book details");
  });

  //Create title element based off books title
  const bookTitle = document.createElement("p");
  bookTitle.textContent = `"${book.title}"`;
  bookTitle.classList.add("book-title");
  //Assigns bookTitle as Child to bookButton
  bookButton.appendChild(bookTitle);

  bookContainer.appendChild(bookButton);
});

function addBookToLibrary() {}
