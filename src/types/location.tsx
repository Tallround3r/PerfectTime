import firebase from 'firebase';
import {Activity} from './activity';
import {Address} from './address';

type Timestamp = firebase.firestore.Timestamp;

export interface Location {
	title: string,
	description: string,
	startdate: Date | Timestamp | null,
	enddate: Date | Timestamp | null,
	address: Address,
	activities?: {[key: string]: Activity},
}
