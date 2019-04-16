import firebase from 'firebase';
import {firebaseReducer, reactReduxFirebase} from 'react-redux-firebase';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {firestoreReducer, reduxFirestore} from 'redux-firestore';
import thunk from 'redux-thunk';


export default function configureStore() {

	// react-redux-firebase config
	const rrfConfig = {
		enableLogging: process.env.NODE_ENV !== 'production', // disable logs on production mode
		useFirestoreForProfile: true,
		allowMultipleListeners: true,
		userProfile: 'users', // collection where profiles are stored in database
		// presence: 'presence', // collection where list of online users is stored in database
		// sessions: 'sessions', // collection where list of user sessions is stored in database
	};

	const rfConfig = {
		logListenerError: process.env.NODE_ENV !== 'production', // disable logs on production mode
		allowMultipleListeners: true,
	};

	const createStoreWithFirebase = compose(
		reactReduxFirebase(firebase, rrfConfig), // firebase reducer
		reduxFirestore(firebase, rfConfig), // firestore reducer
		// @ts-ignore
	)(createStore);

	// Add firebase to reducers
	const rootReducer = combineReducers({
		firebase: firebaseReducer,
		firestore: firestoreReducer,
	});

	const composeEnhancer = process.env.NODE_ENV === 'development'
		// @ts-ignore
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

	// Create store with reducers and initial state
	const initialState = {};

	// @ts-ignore
	return createStoreWithFirebase(
		rootReducer,
		initialState,
		composeEnhancer(
			applyMiddleware(thunk),
		),
	);
}
