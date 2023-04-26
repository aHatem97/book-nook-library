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
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    const bookDetails = document.createElement("div");
    bookDetails.style.backgroundColor = "white";
    bookDetails.style.padding = "20px";
    bookDetails.style.borderRadius = "10px";

    const titleLabel = document.createElement("span");
    titleLabel.textContent = "Title: ";
    const titleValue = document.createElement("span");
    titleValue.textContent = book.title;
    bookDetails.appendChild(titleLabel);
    bookDetails.appendChild(titleValue);
    bookDetails.appendChild(document.createElement("br"));

    const authorLabel = document.createElement("span");
    authorLabel.textContent = "Author: ";
    const authorValue = document.createElement("span");
    authorValue.textContent = book.author;
    bookDetails.appendChild(authorLabel);
    bookDetails.appendChild(authorValue);
    bookDetails.appendChild(document.createElement("br"));

    const pagesLabel = document.createElement("span");
    pagesLabel.textContent = "Number of pages: ";
    const pagesValue = document.createElement("span");
    pagesValue.textContent = book.pages;
    bookDetails.appendChild(pagesLabel);
    bookDetails.appendChild(pagesValue);
    bookDetails.appendChild(document.createElement("br"));

    const publishDateLabel = document.createElement("span");
    publishDateLabel.textContent = "Published: ";
    const publishDateValue = document.createElement("span");
    publishDateValue.textContent = book.published;
    bookDetails.appendChild(publishDateLabel);
    bookDetails.appendChild(publishDateValue);
    bookDetails.appendChild(document.createElement("br"));

    const haveReadLabel = document.createElement("span");
    haveReadLabel.textContent = "Read? ";
    const haveReadValue = document.createElement("span");
    haveReadValue.textContent = book.read;
    bookDetails.appendChild(haveReadLabel);
    bookDetails.appendChild(haveReadValue);

    overlay.appendChild(bookDetails);

    // Append the overlay to the body of the document
    document.body.appendChild(overlay);
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
