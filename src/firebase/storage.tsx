import * as firebase from 'firebase';
import {storage} from './firebase';

type UploadTask = firebase.storage.UploadTask;

export function uploadFile(file: File, path: string): UploadTask {
	// Create a root reference
	const storageRef = storage.ref();

	// Create a reference to given path
	const imageRef = storageRef.child(path);

	return imageRef.put(file);
}
