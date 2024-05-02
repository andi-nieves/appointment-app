
import { initializeApp } from "firebase/app";
import { getFirestore, collection as col} from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyByBlraQdqoQO_koa6nN--9TxqzjTBdtsY",
  authDomain: "appointment-app-8fc18.firebaseapp.com",
  projectId: "appointment-app-8fc18",
  storageBucket: "appointment-app-8fc18.appspot.com",
  messagingSenderId: "681684066873",
  appId: "1:681684066873:web:777c09ddf79ac5f52fe3e8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

const collection = (collection) =>  col(db, collection)

export { auth, db, collection  }

