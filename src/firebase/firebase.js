import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyBU77VjjQMQFFU1XHpNrlpZa5WjLz2yG7k",
	authDomain: "perfecttime-planyourtrip.firebaseapp.com",
	databaseURL: "https://perfecttime-planyourtrip.firebaseio.com",
	projectId: "perfecttime-planyourtrip",
	storageBucket: "perfecttime-planyourtrip.appspot.com",
	messagingSenderId: "998140555209"
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