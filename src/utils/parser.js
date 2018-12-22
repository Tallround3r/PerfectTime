import {isDate} from 'underscore';


export function parseDateToString(timestamp) {
	if (!timestamp)
		return '';

	const date = isDate(timestamp) ? timestamp : timestamp.toDate();

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
}

export function parseDateIfValid(obj) {
	if (!obj) return null;

	return isDate(obj) ? obj : obj.toDate();
}