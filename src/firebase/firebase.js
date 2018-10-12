import * as firebase from 'firebase';
import {config} from '../../firebase-config';


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