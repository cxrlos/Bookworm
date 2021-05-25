import { GOOGLE_BOOKS_URL } from '../constants';
import firebase from '../firebase/firebase';
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
  createUser: ({ email, password }) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  getLibrary: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        // resolve({ 0: [], 2: [], 3: [], 4: [] });
        resolve(library);
      }, 1000);
    });
  },
  getReadingSessions: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { date: '2021-01-01', pagesRead: 10, timeRead: 100 },
          { date: '2021-01-03', pagesRead: 10, timeRead: 100 },
          { date: '2021-01-05', pagesRead: 10, timeRead: 100 },
          { date: '2021-01-07', pagesRead: 10, timeRead: 100 },
          { date: '2021-01-09', pagesRead: 10, timeRead: 100 },
          { date: '2021-05-06', pagesRead: 5, timeRead: 100 },
          { date: '2021-05-08', pagesRead: 5, timeRead: 100 },
          { date: '2021-05-10', pagesRead: 10, timeRead: 100 },
          { date: '2021-05-12', pagesRead: 15, timeRead: 100 },
          { date: '2021-05-14', pagesRead: 5, timeRead: 100 },
        ]);
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
  getUser: () => {
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
  signIn: ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  updateShelf: (book, newShelfId, oldShelfId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  updateReadingProgress: (bookId, currentPage) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  updateUser: form => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export const { getLibrary, getShelfById } = client;

export default client;
