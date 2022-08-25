function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return sortedAccounts = accounts.sort((lastNameA, lastNameB) => lastNameA.name.last > lastNameB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = 0;
  for (book of books) {
    for (bookId of book.borrows) {
      if (account.id === bookId.id) borrows++;
    }
  }
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = [];
  books.forEach((book) => {
    if (book.borrows.find((item) => item.id === account.id && !item.returned)) {
      checkedOut.push(book);
    }
  });
  checkedOut.forEach((book) => {
    let writer = authors.find((person) => person.id === book.authorId);
    book['author'] = writer;
  });
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
