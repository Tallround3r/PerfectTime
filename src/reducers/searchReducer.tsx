import {SEARCH_TEXT} from '../constants/action-types';

export function searchString(state = '', action: any) {
	switch (action.type) {
		case SEARCH_TEXT:
			return action.text;
		default:
			return state;
	}
}