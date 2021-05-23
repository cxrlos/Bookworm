import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC9nmes7DMUcALkQD67YXX_BLPUuDXFikA',
  authDomain: 'bookworm-310521.firebaseapp.com',
  projectId: 'bookworm-310521',
  storageBucket: 'bookworm-310521.appspot.com',
  messagingSenderId: '667416297644',
  appId: '1:667416297644:web:6322f85af5afd9d4651f09',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
