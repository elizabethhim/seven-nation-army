import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyD7723JgXG7S-zZ4xaERl26ysbY0AAoL5w',
  authDomain: 'cecs475-b8e5c.firebaseapp.com',
  databaseURL: 'https://cecs475-b8e5c.firebaseio.com',
  projectId: 'cecs475-b8e5c',
  storageBucket: 'cecs475-b8e5c.appspot.com',
  messagingSenderId: '950704171794',
};
firebase.initializeApp(config);
firebase.firestore();
firebase.database();

export default firebase;
