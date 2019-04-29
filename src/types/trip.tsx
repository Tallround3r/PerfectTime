import firebase from 'firebase';
import {User} from './user';

type Timestamp = firebase.firestore.Timestamp;

export interface Trip {
	title: string,
	description: string,
	startdate: Date | Timestamp | null,
	enddate: Date | Timestamp | null,
	owner?: string | User,
	ownerObj?: User,
	members?: string[],
	membersObj?: { [key: number]: User },
}
