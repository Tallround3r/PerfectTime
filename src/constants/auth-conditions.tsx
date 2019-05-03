import {Trip} from '../types';

export const AUTH_CONDITION_WITH_DRAWER = (auth: any) => !!auth;
export const AUTH_CONDITION_TRIP = (auth: any, trip: Trip) => !!auth
	&& (auth.uid === trip.owner || trip.members.indexOf(auth.uid) >= 0);
