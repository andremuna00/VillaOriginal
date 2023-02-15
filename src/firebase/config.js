import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlERTOZE3ESycGQ45xqKtZYFTi5wt-MVM',
  authDomain: 'villaoriginal.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'villaoriginal-b6643',
  storageBucket: 'villaoriginal-b6643.appspot.com',
  messagingSenderId: '244762005521',
  appId: '1:244762005521:android:bdb38b42a742c2f3b161b0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };