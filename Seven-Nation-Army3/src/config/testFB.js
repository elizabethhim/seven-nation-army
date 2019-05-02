// This file is for testing the API of firebase when in a context the code
// editor can actually use to access its API properly.
import firebase from './fbConfig';

const fb = firebase
  .ref('root/sessions')
  .once('value', sessions => {
    console.log('Sessions', sessions);
    sessions.forEach(session => {
      console.log('Session', session.val());
    });
  })
  .then(res => {
    console.log('Realtime database', res);
  })
  .catch(err => {
    console.log('Error', err);
  });

console.log(fb);
