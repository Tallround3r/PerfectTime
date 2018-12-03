import {isDate} from 'underscore';

export function parseDateToString(timestamp) {
	const date = isDate(timestamp) ? timestamp : timestamp.toDate();

	const day = date.getDay();
	const month = date.getMonth();
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
}