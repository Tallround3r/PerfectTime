import {combineReducers} from 'redux';

import {searchString} from './searchReducer';

const rootReducer = combineReducers({

	searchString,
});

export default rootReducer;
