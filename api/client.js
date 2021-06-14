import { GOOGLE_BOOKS_URL } from '../constants';
import firebase from '../firebase/firebase';

const db = firebase.firestore();
let user = firebase.auth().currentUser;

const client = {
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
  getGoogleBooks: async query => {
    return fetch(GOOGLE_BOOKS_URL(query));
  },
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
  signIn: async ({ email, password }) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => (user = firebase.auth().currentUser));
  },
  signOut: async () => {
    await firebase.auth().signOut();
  },
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
