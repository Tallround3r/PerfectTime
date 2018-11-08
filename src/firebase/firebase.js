import * as firebase from 'firebase';

const config = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();

const firestoreSettings = {timestampsInSnapshots: true};
db.settings(firestoreSettings);

export {
	auth,
	db,
};