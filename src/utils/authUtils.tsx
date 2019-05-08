import {Trip} from '../types';

export function isUserOfTrip(trip: Trip, auth: any) {
	if (!trip) {
		return false;
	}
	if (trip.owner === auth.uid) {
		return true;
	}
	return !!trip.members && trip.members.indexOf(auth.uid) > -1;
}
