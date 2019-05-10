import {Button, createStyles, Paper, TextField, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import LocationMetadataInput from "../components/LocationMetadataInput";
import * as routes from '../constants/routes';
import {Location} from '../types/location';


const styles = (theme: Theme) => createStyles({
	locationEditPage: {
		paddingTop: theme.spacing.unit * 3,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit,
		padding: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 10,
		minWidth: '25em',
	},
	inputField: {
		marginTop: theme.spacing.unit,
	},
	inputHorizontalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	inputHorizontalSpacing: {
		marginRight: theme.spacing.unit * 2,
	},
	addressLabel: {
		marginTop: theme.spacing.unit * 2,
	},
	imagePaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing.unit,
		float: 'right',
		width: '18em',
		height: '18em',
	},
	imageIcon: {
		fontSize: '10em',
	},
	actionButtonsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit * 4,
	},
	actionButton: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
});

const INITIAL_LOCATION: Location = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: {
		city: '',
		country: '',
	},
};

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
}

interface State {
	location: Location;
}

class LocationAddPage extends React.Component<Props, State> {

	state = {
		location: INITIAL_LOCATION,
	};

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const {firestore, match, history} = this.props;
		const {location} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[routes.URL_PARAM_TRIP],
			subcollections: [{
				collection: 'locations',
			}],
		};

		firestore.add(firestoreRef, location)
			.then((docRef: any) => {
				const tripId = match.params[routes.URL_PARAM_TRIP];
				history.push(routes.LOCATIONS_VIEW(tripId, docRef.id));
			});


		e.preventDefault();
	};

	handleCancel = (e: MouseEvent) => {
		const {history, match} = this.props;

		this.setState({
			location: INITIAL_LOCATION,
		});

		const tripId = match.params[routes.URL_PARAM_TRIP];
		history.push(routes.LOCATIONS(tripId));

		e.preventDefault();
	};

	handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					[name]: value,
				},
			};
		});
	};

	handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		this.setState((prevState) => ({
			location: {
				...prevState.location,
				address: {
					...prevState.location.address,
					[name]: value,
				},
			},
		}));
	};

	handleChangeDate = (name: string) => (date: Date | null) => {
		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					[name]: date,
				},
			};
		});
	};

	render() {
		const {classes} = this.props;
		const {location} = this.state;
		const {title, description, startdate, enddate, address} = location;

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant='h4'
					gutterBottom={true}
				>
					Add new Location
				</Typography>

				<LocationMetadataInput
					classes={classes}
					onSubmit={this.handleSubmit}
					value={title}
					onChange={this.handleChangeInput}
					value1={description}
					obj={startdate}
					onChange1={this.handleChangeDate('startdate')}
					obj1={enddate}
					onChange2={this.handleChangeDate('enddate')}
					address={address}
					onChange3={this.handleChangeAddress}
					onClick={this.handleCancel}
				/>
			</div>
		);
	}
}

export default compose(
	withRouter,
	firestoreConnect(),
	withStyles(styles),
)(LocationAddPage);
