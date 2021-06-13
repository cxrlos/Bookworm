import { GOOGLE_BOOKS_URL } from '../constants';
import firebase from '../firebase/firebase';
import library from '../data/library';
import user from '../data/user';
import book from '../data/book';

let db = firebase.firestore();

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
  createUser: async values => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
    // Replace following call by adding created user values to DB
    db.collection("users-dev").doc(values.email).set({
      dailyGoal: values.dailyGoal,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      sex: values.sex,
      library: [],
      sessions: []
    })
    .then(() => {
      console.warn("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(alert('done'));

    //   }, 10000);
    // });
  },
  getLibrary: () => {
    let docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.warn('Document data: ', doc.data()['library']);
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
    let docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');
    return docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        // console.warn('Document data: ', doc.data()['library']);
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
    let docRef = db.collection('users-dev').doc('wLLPvNDfVyunKbrBPMtL');

    return docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.warn('Document data: ', doc.data()['library']);
          return {
            firstName: doc.data()['firstName'],
            lastName: doc.data()['lastName'],
            email: doc.data()['email'],
            sex: doc.data()['sex'],
            dailyGoal: doc.data()['dailyGoal']
          };
        } else {
          console.warn('There is no document with ID wLLPvNDfVyunKbrBPMtL');
        }
      })
      .catch(error => {
        console.warn('Error getting document', error);
      });
  },
  removeFromLibrary: (bookId) => {
    var userDoc = db.collection('users-dev').doc("wLLPvNDfVyunKbrBPMtL");
    
    userDoc.get().then((doc) => {
      if (doc.exists) {
        userDoc.update({
          library: doc.data().library.filter(book => book.bookId !== bookId)
        });
          // console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },
  signIn: ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  updateShelf: async (bookId, shelfId) => {
    var userDoc = db.collection('users-dev').doc("wLLPvNDfVyunKbrBPMtL");
    
    await userDoc.get().then((doc) => {
      if (doc.exists) {
        userDoc.update({
          library: doc.data().library.map(book => book.bookId === bookId ? { ...book, shelfId } : book)
        });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },
  updateReadingProgress: async ({bookId, currentPage}) => {
    var userDoc = db.collection('users-dev').doc("wLLPvNDfVyunKbrBPMtL");
    
    await userDoc.get().then((doc) => {
      if (doc.exists) {
        userDoc.update({
          library: doc.data().library.map(book => book.bookId === bookId ? { ...book, currentPage } : book)
        });
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },
  updateUser: form => {
    console.warn(form);
    var userDoc = db.collection('users-dev').doc("wLLPvNDfVyunKbrBPMtL");

    return userDoc.update(
      form
    )
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  },
};

export const { getLibrary, getShelfById } = client;

export default client;
