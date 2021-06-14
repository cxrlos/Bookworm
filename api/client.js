import { GOOGLE_BOOKS_URL } from '../constants';
import firebase from '../firebase/firebase';

const db = firebase.firestore();

const client = {
  // TODO
  addReadingSession: readingSession => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  // TODO
  addToLibrary: book => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
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
        console.warn('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  },
  getLibrary: () => {
    const docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()['library'];
        } else {
          console.warn('There is no document with ID wLLPvNDfVyunKbrBPMtL');
        }
      })
      .catch(error => {
        console.warn('Error getting document', error);
      });
  },
  getReadingSessions: () => {
    const docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data()['sessions'];
        } else {
          console.warn('There is no document with ID wLLPvNDfVyunKbrBPMtL');
        }
      })
      .catch(error => {
        console.warn('Error getting document', error);
      });
  },
  getGoogleBooks: async query => {
    return fetch(GOOGLE_BOOKS_URL(query));
  },
  getUser: () => {
    const docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
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
          console.warn('There is no document with ID wLLPvNDfVyunKbrBPMtL');
        }
      })
      .catch(error => {
        console.warn('Error getting document', error);
      });
  },
  removeFromLibrary: async bookId => {
    const userDoc = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    await userDoc
      .get()
      .then(doc => {
        if (doc.exists) {
          userDoc.update({
            library: doc.data().library.filter(book => book.bookId !== bookId),
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  },
  signIn: async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signOut: async () => {
    await firebase.auth().signOut();
  },
  updateShelf: async (bookId, shelfId) => {
    const userDoc = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
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
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  },
  updateReadingProgress: async ({ bookId, currentPage }) => {
    const userDoc = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
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
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  },
  updateUser: async form => {
    const userDoc = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    await userDoc
      .update(form)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  },
};

export default client;
