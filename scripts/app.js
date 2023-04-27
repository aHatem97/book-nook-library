const modals = document.querySelectorAll("[data-modal]");
const addForm = document.querySelector(".modal-add-form");
const delForm = document.querySelector(".modal-delete-form");
const bookContainer = document.querySelector(".shelf");
const deleteAllBooks = document.getElementById("del-submit");

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

//Array library of book objects
let allBooks = [];

// Constructor
function Book(title, author, pages, published, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.read = read;
}

//Form Event Listener
addForm.addEventListener("submit", (e) => {
  handleFormSubmit(e);
});

//Submit function for adding books
function handleFormSubmit(e) {
  e.preventDefault();
  const titleInput = document.getElementById("book-title").value;
  const authorInput = document.getElementById("author").value;
  //checks if book exists in array first
  const existingBook = allBooks.find((book) => {
    return book.title === titleInput && book.author === authorInput;
  });

  if (existingBook) {
    alert("This book already exists! Please add a different book.");
    return;
  }

  const addBook = new Book(
    titleInput,
    authorInput,
    document.getElementById("pages-count").value,
    document.getElementById("publish-date").value,
    document.getElementById("read-book").value
  );

  allBooks.push(addBook);
  console.log(allBooks);

  //clears the UI of child elements so nothing duplicates outside of the book array
  bookContainer.innerHTML = "";

  allBooks.forEach(function (book) {
    //Create button element for book in hmtl
    const bookButton = document.createElement("button");
    bookButton.classList.add("book");
    bookButton.setAttribute("data-modal", "modal-book");
    //creates pop up... but can't exit it without refreshing page
    bookButton.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = document.getElementById(bookButton.dataset.modal);
      modal.classList.add("open");
      const exits = modal.querySelectorAll(".modal-exit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
      //populating modal with our object
      const outputTitle = document.querySelector("#output-title");
      const outputAuthor = document.querySelector("#output-author");
      const outputPages = document.querySelector("#output-pages");
      const outputPublished = (document.querySelector(
        "#output-published"
      ).value = book.published);
      const outputRead = document.getElementById("output-read");

      outputTitle.textContent = book.title;
      outputAuthor.textContent = book.author;
      outputPages.textContent = book.pages;
      outputPublished.textContent = book.published;
      outputRead.textContent = book.read;
    });
    //Create title element based off books title
    const bookTitle = document.createElement("p");
    bookTitle.textContent = `"${book.title}"`;
    bookTitle.classList.add("book-title");
    //Assigns bookTitle as Child to bookButton
    bookButton.appendChild(bookTitle);

    bookContainer.appendChild(bookButton);
  });
}
// //Delete all function
deleteAllBooks.addEventListener("click", function (e) {
  e.preventDefault();
  allBooks.length = 0;
  bookContainer.innerHTML = "";
});
