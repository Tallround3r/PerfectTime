import firebase from 'firebase';
import {isDate} from 'underscore';

type Timestamp = firebase.firestore.Timestamp;

export function parseDateToString(timestamp: Date | Timestamp | null) {
	if (!timestamp) {
		return '';
	}

	const date = isDate(timestamp) ? timestamp : timestamp.toDate();

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
}

export function parseDateIfValid(obj: Date | Timestamp | null) {
	if (!obj) {
		return null;
	}

	return isDate(obj) ? obj : obj.toDate();
}
