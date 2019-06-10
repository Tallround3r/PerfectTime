import {SEARCH_TEXT} from '../../constants/action-types';

export function searchText(text: string) {
	return {
		type: SEARCH_TEXT,
		text,
	};
}

export function setSearchText(text: string) {
	return (dispatch: any) => dispatch(searchText(text));
}
