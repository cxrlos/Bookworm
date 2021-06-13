import book from './book';

export default [
  { ...book, bookId: '1', shelfId: '2' },
  { ...book, bookId: '2', shelfId: '0' },
  { ...book, bookId: '3', shelfId: '3' },
  { ...book, bookId: '4', shelfId: '4' },
  // { ...book, bookId: '5', shelfId: '0' },
  // { ...book, bookId: '6', shelfId: '2' },
  // { ...book, bookId: '7', shelfId: '3' },
  // { ...book, bookId: '8', shelfId: '4' },
];
