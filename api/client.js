import { GOOGLE_BOOKS_URL } from '../constants';
import library from '../data/library';

const client = {
  addToLibrary: book => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  getLibrary: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ 0: [], 2: [], 3: [], 4: [] });
      }, 1000);
    });
  },
  getShelfById: shelfId => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  getGoogleBooks: async query => {
    return await fetch(GOOGLE_BOOKS_URL(query));
  },
  removeFromLibrary: (bookId, shelfId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  updateShelf: (book, newShelfId, oldShelfId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  updateReadingProgress: (bookId, currentPage, time) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(); // PASS IN CURR DATE WHEN MAKING AXIOS POST
      }, 1000);
    });
  },
};

export const { getLibrary, getShelfById } = client;

export default client;
