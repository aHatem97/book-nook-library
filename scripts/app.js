const modals = document.querySelectorAll("[data-modal]");
const addForm = document.querySelector(".modal-add-form");
const delForm = document.querySelector(".modal-delete-form");
const deleteCurrentBook = document.getElementById("delete-book");
const closeOnSubmit = document.querySelector(".modal");
const closeOnDelete = document.querySelector(".modal-delete");
const shelfContainer = document.querySelector(".shelves-container");
const shelfContainerAll = document.querySelectorAll(".shelves-container");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    const exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        clearInputFields();
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

//Call Event Handler for adding books
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
  } else {
    closeOnSubmit.classList.remove("open");
    addBookToShelf(e);
  }
}

//Create Book
function addBookToShelf() {
  const checkbox = document.getElementById("read-book");
  const readBook = checkbox.checked; //returns true or false value if checkbox was checked

  const addBook = new Book(
    document.getElementById("book-title").value,
    document.getElementById("author").value,
    document.getElementById("pages-count").value,
    document.getElementById("publish-date").value,
    readBook
  );
  allBooks.push(addBook);
  const newBook = createBookButton(addBook);
  const bookTitle = createBookTitle(addBook);
  newBook.appendChild(bookTitle);

  const shelves = shelfContainer.querySelectorAll(".shelf");
  let foundShelf = false; // variable to keep track of whether a suitable shelf has been found

  for (let i = 0; i < shelves.length; i++) {
    let currentShelf = shelves[i];
    if (currentShelf.children.length <= 1) {
      currentShelf.appendChild(newBook);
      foundShelf = true; // set foundShelf to true if a suitable shelf is found
      break; // exit the loop since we've appended the new book
    }
  }

  if (!foundShelf) {
    // if no suitable shelf has been found, create a new one
    let currentShelf = createNewShelf(shelfContainer);
    currentShelf.appendChild(newBook);
  }

  // Add a unique class name to the book button
  newBook.classList.add("book-" + (allBooks.length - 1));
  newBook.setAttribute("id", "book--");

  clearInputFields();
}

// Clears form Inputs after submit
function clearInputFields() {
  document.getElementById("form").reset();
}

//Creates Book Button UI
function createBookButton(book) {
  const bookButton = document.createElement("button");
  bookButton.classList.add("book");
  bookButton.setAttribute("data-modal", "modal-book");
  bookButton.setAttribute("draggable", "true");

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

    deleteCurrentBook.addEventListener("click", function (event) {
      event.preventDefault();
      let currentBook = allBooks.indexOf(book);
      allBooks.splice(currentBook, 1);
      shelfContainerAll.forEach(function () {
        let shelf = bookButton.parentNode;
        shelf.removeChild(bookButton);
      });

      modal.classList.remove("open");
    });

    //populating modal with our object
    const outputTitle = document.querySelector("#output-title");
    const outputAuthor = document.querySelector("#output-author");
    const outputPages = document.querySelector("#output-pages");
    const outputPublished = document.querySelector("#output-published");

    outputTitle.textContent = book.title;
    outputAuthor.textContent = book.author;
    outputPages.textContent = book.pages;
    outputPublished.textContent = book.published;
    //displays different icons if read or not
    if (book.read) {
      document.getElementById("star-1").style.display = "block";
      document.getElementById("star-2").style.display = "none";
    } else {
      document.getElementById("star-1").style.display = "none";
      document.getElementById("star-2").style.display = "block";
    }
  });
  randomBook(bookButton);
  return bookButton;
}

//Create new Shelf
let currentShelf = getCurrentShelf();

function createNewShelf() {
  let shelfCount = 1;
  const newShelf = document.createElement("div");
  newShelf.classList.add("shelf");
  const shelfClassName = "shelf-" + shelfCount;
  newShelf.classList.add(shelfClassName);
  //checks if shelf already exists then inserts new shelf after it.
  const lastShelf = getCurrentShelf();
  if (lastShelf) {
    shelfContainer.insertBefore(newShelf, lastShelf.nextSibling);
  } else {
    shelfContainer.appendChild(newShelf);
  }
  shelfCount++;
  return newShelf;
}

//Returns most recently created shelf
function getCurrentShelf() {
  const shelves = shelfContainer.querySelectorAll(".shelf");
  const currentShelf = shelves[shelves.length - 1];
  return currentShelf;
}

//add Title to book button on shelf
function createBookTitle(book) {
  const bookTitle = document.createElement("p");
  bookTitle.textContent = `${book.title}`;
  bookTitle.classList.add("book-title");
  return bookTitle;
}

// delete all then close modal
delForm.addEventListener("submit", function (e) {
  e.preventDefault();
  allBooks = [];
  shelfContainerAll.forEach((shelf) => {
    while (shelf.hasChildNodes()) {
      shelf.removeChild(shelf.lastChild);
    }
    createNewShelf();
  });
  currentShelf = getCurrentShelf();

  closeOnDelete.classList.remove("open");
});

// Prevents dates after today being selectable
document.getElementById("publish-date").max = new Date()
  .toISOString()
  .split("T")[0];

//function that creates a random book
function randomBook(test) {
  const RNG = Math.floor(Math.random() * 3);
  const test1 = document.getElementById("book--");

  switch (RNG) {
    case 0:
      return (
        (test.style.backgroundColor = "#b8bfd9"), (test.style.height = "70%")
      );

    case 1:
      return (test.style.backgroundColor = "#aa3838");

    case 2:
      return (test.style.backgroundColor = "#64876a");
  }
}
