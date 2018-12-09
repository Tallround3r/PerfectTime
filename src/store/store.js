import firebase from 'firebase';
import {firebaseReducer, reactReduxFirebase} from 'react-redux-firebase';
import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import {firestoreReducer, reduxFirestore} from 'redux-firestore';
import thunk from 'redux-thunk';


export default function configureStore() {

	// react-redux-firebase config
	const rrfConfig = {
		enableLogging: process.env.NODE_ENV === 'development', // enable logs only in development mode
		useFirestoreForProfile: true,
		userProfile: 'users', // collection where profiles are stored in database
		// presence: 'presence', // collection where list of online users is stored in database
		// sessions: 'sessions', // collection where list of user sessions is stored in database
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

	const composeEnhancer = process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

	// Create store with reducers and initial state
	const initialState = {};

	const store = createStoreWithFirebase(
		rootReducer,
		initialState,
		composeEnhancer(
			applyMiddleware(thunk),
		),
	);

	return store;
}
