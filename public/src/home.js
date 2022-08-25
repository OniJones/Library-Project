function getTotalBooksCount(books) {
  return books.reduce((total) => {
    total++;
    return total;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  return getTotalBooksCount(accounts);
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowed, book) => {
    if(!book.borrows[0].returned) {
      borrowed++;
    }
    return borrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const book = [];
  bookGenres.map((genre) => {
    const genres = book.findIndex((bookIndex) => bookIndex.name === genre);
    (genres >= 0) ? book[genres].count++ : book.push({name: genre, count: 1});
  });
  book.sort((bookA, bookB) => bookB.count - bookA.count);
  if (book.length > 5) {
    return book.slice(0, 5);
  }
  return book;
}

function getMostPopularBooks(books) {
  return Object.entries(
    books.reduce((account, book) => {
      account[book.title] = book.borrows.length
      return account;
    }, {})
  )
  .map(([name, count]) => ({
    name,
    count
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popAuthors = [];
  for (author of authors) {
    const works = books.filter((book) => book.authorId === author.id);
    popAuthors.push({
      'name': (`${author.name.first} ${author.name.last}`),
      'count': works.reduce((acc, book) => acc + book.borrows.length, 0)
    });
  }
  return popAuthors.sort((a, b) => b['count'] - a['count']).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
