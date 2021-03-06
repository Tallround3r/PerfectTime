import firebase from 'firebase';
import {Address} from './address';

type Timestamp = firebase.firestore.Timestamp;

export interface Activity {
	title: string,
	description: string,
	startdate: Date | Timestamp | null,
	enddate: Date | Timestamp | null,
	address: Address,
}
