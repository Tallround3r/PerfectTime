import {CircularProgress} from '@material-ui/core';
import {get, some} from 'lodash';
import {isLoaded} from 'react-redux-firebase';
import {branch, renderComponent} from 'recompose';

export function renderWhile(condition: (props: any) => any, component: any) {
	return branch(condition, renderComponent(component));
}

// HOC that shows loading spinner component while list of propNames are loading
export function spinnerWhileLoading(propNames: string[]) {
	return renderWhile(
		(props: any) => some(propNames, (name: string) => !isLoaded(get(props, name))),
		CircularProgress,
	);
}
