import * as firebase from 'firebase';

export const AUTH_CONDITION_WITH_DRAWER = (auth: any) => !!auth;
export const AUTH_CONDITION_TRIP = (auth: any, trip: firebase.firestore.DocumentData | undefined) => !!auth && !!trip
	&& (trip.public || auth.uid === trip.owner || (!!trip.members && trip.members.indexOf(auth.uid) >= 0));
