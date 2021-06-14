import { GOOGLE_BOOKS_URL } from '../constants';
import firebase from '../firebase/firebase';

const db = firebase.firestore();
let user = firebase.auth().currentUser;


/*
 * Represents the user in the system and the functions that it requires
 */

const client = {
  /*
   * Function that adds a reading session after the chronometer is stopped
   * @param {Object} readingSession - Used to push the session data to the DB from the fontend request
   */
  addReadingSession: async readingSession => {
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          const existingSession = doc
            .data()
            .sessions.find(session => session.date === readingSession.date);
          if (existingSession) {
            userDoc.update({
              sessions: doc.data().sessions.map(session =>
                session.date === readingSession.date
                  ? {
                      ...session,
                      pagesRead: readingSession.pagesRead + session.pagesRead,
                      timeRead: readingSession.timeRead + session.timeRead,
                    }
                  : session
              ),
            });
          } else {
            userDoc.update({
              sessions:
                firebase.firestore.FieldValue.arrayUnion(readingSession),
            });
          }
        } else {
          console.log('Could not add reading session');
        }
      })
      .catch(error => {
        console.log('Could not add reading session:', error);
      });
  },

  /*
   * Function that adds a searched book to the a user's library
   * @param {Object} book - Used to push the book data to the DB from the fontend request
   */
  addToLibrary: async book => {
    book = { ...book, currentPage: 0 };
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          userDoc.update({
            library: firebase.firestore.FieldValue.arrayUnion(book),
          });
        } else {
          console.log('Could not add book to library');
        }
      })
      .catch(error => {
        console.log('Could not add book to library: ', error);
      });
  },

  /*
   * Function that creates a user
   * @param {Object} values - Used to pass the authentication parameters
   */
  createUser: async values => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
    await db
      .collection('users-dev')
      .doc(values.email)
      .set({
        dailyGoal: values.dailyGoal,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        sex: values.sex,
        library: [],
        sessions: [],
      })
      .then(() => {
        console.warn('User could not be added ');
      })
      .catch(error => {
        console.error('User could not be added ', error);
      });
  },
  /*
   * Function that returns the books added by the user
   */
  getLibrary: () => {
    const docRef = db.collection('users-dev').doc(user.email);
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()['library'];
        } else {
          console.warn('The library could not be retrieved');
        }
      })
      .catch(error => {
        console.warn('The library could not be retrieved ', error);
      });
  },

  /*
   * Function that returns all of the reading sessions stored in the user array
   */
  getReadingSessions: () => {
    const docRef = db.collection('users-dev').doc(user.email);
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()['sessions'];
        } else {
          console.warn('The reading sessions could not be retrieved');
        }
      })
      .catch(error => {
        console.warn('The reading sessions could not be retrieved ', error);
      });
  },

  /*
   * Function that requests the Google Books API and returns the google book object
   * @param {Object} query - Contains the needed values to search the book
   */
  getGoogleBooks: async query => {
    return fetch(GOOGLE_BOOKS_URL(query));
  },


  /*
   * Function that gets the current user's attributes
   */
  getUser: () => {
    const docRef = db.collection('users-dev').doc(user.email);
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          return {
            firstName: doc.data()['firstName'],
            lastName: doc.data()['lastName'],
            email: doc.data()['email'],
            sex: doc.data()['sex'],
            dailyGoal: doc.data()['dailyGoal'],
          };
        } else {
          console.warn('The document does not exist');
        }
      })
      .catch(error => {
        console.warn('The user could not be retrieved ', error);
      });
  },

  /*
   * Function that removes a book from the library
   * @param String bookId - Book identifier that is needed for the query
   */
  removeFromLibrary: async bookId => {
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          userDoc.update({
            library: doc.data().library.filter(book => book.bookId !== bookId),
          });
        } else {
          console.log('The book could not be removed');
        }
      })
      .catch(error => {
        console.log('The book could not be removed ', error);
      });
  },

  /*
   * Sign in function
   */
  signIn: async ({ email, password }) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => (user = firebase.auth().currentUser));
  },

  /*
   * Sign out function
   */
  signOut: async () => {
    await firebase.auth().signOut();
  },

  /*
   * Function that updates the shelf where a book can be found
   * @param String bookId - Book identifier to execute the operation
   * @param Integer shelfId - Shelf identifier to execute the operation
   */
  updateShelf: async (bookId, shelfId) => {
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          userDoc.update({
            library: doc
              .data()
              .library.map(book =>
                book.bookId === bookId
                  ? { ...book, currentPage: 0, shelfId }
                  : book
              ),
          });
        } else {
          console.log('The shelf could not be updated');
        }
      })
      .catch(error => {
        console.log('The shelf could not be updated ', error);
      });
  },

  /*
   * Function that updates the last read page from a book 
   * @param String bookId - Book identifier to execute the operation
   * @param Integer currentPage - Last read page
   */
  updateReadingProgress: async ({ bookId, currentPage }) => {
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          userDoc.update({
            library: doc
              .data()
              .library.map(book =>
                book.bookId === bookId ? { ...book, currentPage } : book
              ),
          });
        } else {
          console.log('The reading progress could not be updated');
        }
      })
      .catch(error => {
        console.log('The reading progress could not be updated ', error);
      });
  },

  /*
   * Function that updates the user's data from a form 
   * @param {Object} form - Contains the fields from the update request
   */
  updateUser: async form => {
    const userDoc = db.collection('users-dev').doc(user.email);
    await userDoc
      .update(form)
      .then(() => {
        console.log('The user data could not be updated');
      })
      .catch(error => {
        console.error('The user data could not be updated ', error);
      });
  },
};

export default client;
