// This file is for testing the API of firebase when in a context the code
// editor can actually use to access its API properly.
import firebase from './fbConfig';

const fb = firebase
  .database()
  .ref('sessions')
  .once('value', snap => {
    console.log('Once', snap.toJSON());
  })
  .then(res => {
    console.log('Realtime database', res);
  })
  .catch(err => {
    console.log('Error', err);
  });

console.log(fb);
