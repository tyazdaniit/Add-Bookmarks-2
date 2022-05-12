let $ = document;
const addBookBtn = $.querySelector(".add-btn");
const titleInpurElem = $.querySelector("#title");
const authorInpurElem = $.querySelector("#author");
const yearInpurElem = $.querySelector("#year");
const booksContainer = $.querySelector("#book-list");

let books = [];

addBookBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let titleInpurValue = titleInpurElem.value;
  let authorInpurValue = authorInpurElem.value;
  let yearInpurValue = yearInpurElem.value;

  if (
    titleInpurValue === "" ||
    authorInpurValue === "" ||
    yearInpurValue === ""
  ) {
    alert("لطفا تمام ورودی ها را وارد کنید");
  } else {
    let newBookObject = {
      id: books.length + 1,
      title: titleInpurValue,
      auther: authorInpurValue,
      year: yearInpurValue,
    };
    books.push(newBookObject);
    setIntoLocalStorage(books);
  }
});

function setIntoLocalStorage(allBooksArry) {
  localStorage.setItem("books", JSON.stringify(allBooksArry));

  makeEmpty();
  booksGenerator(allBooksArry);
}

function makeEmpty() {
  titleInpurElem.value = "";
  authorInpurElem.value = "";
  yearInpurElem.value = "";
}

function booksGenerator(allBooksArry) {
  booksContainer.innerHTML = "";

  allBooksArry.forEach(function (book) {
    let newTr = $.createElement("tr");

    let newThTitle = $.createElement("th");
    newThTitle.innerHTML = book.title;

    let newThAuther = $.createElement("th");
    newThAuther.innerHTML = book.auther;

    let newThYear = $.createElement("th");
    newThYear.innerHTML = book.year;

    newTr.append(newThTitle, newThAuther, newThYear);

    booksContainer.append(newTr);
  });
}

function getBooksFromLocalStorage() {
  let localStorageBooks = localStorage.getItem("books");

  if (localStorageBooks) {
    books = JSON.parse(localStorageBooks);
    booksGenerator(books);
  }
}

window.addEventListener("load", getBooksFromLocalStorage);
