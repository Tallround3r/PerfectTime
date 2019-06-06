import {FirebaseOptions} from '@firebase/app-types';
import * as firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {
	auth,
	db,
	storage,
};
