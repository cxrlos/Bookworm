
import { GOOGLE_BOOKS_URL } from '../constants';
import library from '../data/library';
import user from '../data/user';

const client = {
  addReadingSession: readingSession => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
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
  getReadingSessions: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
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
    return fetch(GOOGLE_BOOKS_URL(query));
  },
  getUserInfo: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(user);
      }, 1000);
    });
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
        resolve();
      }, 1000);
    });
  },
  updateUserInfo: form => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export const { getLibrary, getShelfById } = client;

export default client;
