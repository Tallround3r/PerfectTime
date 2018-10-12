import {db} from './firebase';

export const doCreateUser = (id, username, email) =>
	db.collection('users').doc(id).set({
		username: username,
		email: email
	});

export const onceGetUsers = () =>
	db.collection('users').get();