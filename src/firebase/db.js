import {db} from './firebase';

export const doCreateUser = (id, username, email) =>
	db.collection('users').doc(id).set({
		username: username,
		email: email
	});

export const onceGetUsers = () =>
	db.collection('USER').get();

export const getLocations = () =>
    db.collection('TRIPS').doc('TXjQVQjjfXRfBnCJ1q0L').collection('locations').get();