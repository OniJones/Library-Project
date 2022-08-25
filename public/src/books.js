function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return findAuthorById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksBorrowed = [];
  let booksReturned = [];
  let partition = [];
  books.forEach((book) => {
    const returned = book.borrows[0].returned;
    (returned) ? booksReturned.push(book) : booksBorrowed.push(book);
  });
  partition.push(booksBorrowed, booksReturned);
  return partition;
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  const booksBorrowed = book.borrows;
  booksBorrowed.forEach((borrow) => {
    let person = accounts.find((account) => account.id === borrow.id);
    let personsAccount = person;
    personsAccount['returned'] = borrow.returned;
    borrowers.push(personsAccount);
  }); 
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

