import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZoAFRaJxGH765l1MP3rOOToQ05i8CWow',
  authDomain: 'muhouse.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'muhouse-78aed',
  storageBucket: 'muhouse-78aed.appspot.com',
  messagingSenderId: '1027341051588',
  appId: '1:1027341051588:android:0539617609d06e052c0b91',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };