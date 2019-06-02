import {InputBase, withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {createStyles, Theme, WithStyles} from '@material-ui/core/es';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {setSearchText} from '../store/actions/searchAction';

const styles = (theme: Theme) => createStyles({
	root: {
		display: 'flex',
	},
	search: {
		'position': 'relative',
		'borderRadius': theme.shape.borderRadius,
		'backgroundColor': fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		'marginRight': theme.spacing.unit * 2,
		'marginLeft': 0,
		'width': '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},

});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	searchText: string;
	setSearchText: any;
}

interface State {
	searchTerm: string;
}

class SearchBar extends React.Component<Props, State> {

	onButtonClick = () => {
		// TODO anstatt dessen lieber ein Drop Down menü, nach was gefiltert werden soll und die Rücksetzung des
		// TODO Terms bei jedem neuen Seitenaufruf. Somit benötigt man den Button nicht
		console.log(this.props.searchText);
	};

	setSearchString = (e: ChangeEvent<HTMLInputElement>) => {
		this.props.setSearchText(e.target.value);
	};

	render() {
		const {classes} = this.props;

		return (
			<div>
				<Button
					type='button'
					color='secondary'
					onClick={this.onButtonClick}
				>
					Search
				</Button>

				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon/>
					</div>
					<InputBase
						onChange={this.setSearchString}
						placeholder='Search…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state: any) => {
	return {
		searchText: state.searchString,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setSearchText: (text: string) => dispatch(setSearchText(text)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar));
