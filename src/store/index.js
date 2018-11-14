import firebase from 'firebase';
import {createStore, combineReducers, compose} from 'redux';
import {firebaseReducer, reactReduxFirebase} from 'react-redux-firebase';
import {firestoreReducer, reduxFirestore} from 'redux-firestore';

export default function configureStore() {

	// react-redux-firebase config
	const rrfConfig = {
		enableLogging: process.env.NODE_ENV === 'development',
	};

	const createStoreWithFirebase = compose(
		reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
		reduxFirestore(firebase), // firestore
	)(createStore);

	// Add firebase to reducers
	const rootReducer = combineReducers({
		firebase: firebaseReducer,
		firestore: firestoreReducer,
	});

	// Create store with reducers and initial state
	const initialState = {};
	const store = createStoreWithFirebase(rootReducer, initialState);

	return store;
}
