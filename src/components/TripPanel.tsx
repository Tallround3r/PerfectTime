import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import DirectionsWalk from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import React, {MouseEvent} from 'react';
import {NavLink} from 'react-router-dom';
import * as routes from '../constants/routes';
import {Trip} from '../types';
import {parseDateIfValid} from '../utils/parser';

const styles = (theme: Theme) => createStyles({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		background: theme.palette.secondary.main,
		cursor: 'default',
	},
	bigColumn: {
		flexBasis: '50%',
		textAlign: 'center',
	},
	smallColumn: {
		flexBasis: '1%',
		textAlign: 'right',
	},
	iconAvatar: {
		color: '#000',
	},
});

interface TripPanelProps extends WithStyles<typeof styles> {
	trip: Trip;
	key: string;
	onEdit: (e: MouseEvent) => void;
}

function TripPanel({classes, trip, key, onEdit}: TripPanelProps) {
	const startdate = parseDateIfValid(trip.startdate);
	const enddate = parseDateIfValid(trip.enddate);

	return (
		<ExpansionPanel
			className={classes.locationPanel}
			expanded={false}
		>
			<ExpansionPanelSummary>
				<div className={classes.smallColumn}>
					<Avatar className={classes.iconAvatar}>
						<DirectionsWalk fontSize='large'/>
					</Avatar>
				</div>
				<div className={classes.bigColumn}>
					<NavLink exact={true} to={routes.LOCATIONS(key)}>
						<Typography
							variant={'h6'}
						>
							{trip.title}
						</Typography>
					</NavLink>
				</div>
				<div className={classes.bigColumn}>
					<Typography>
						from {!!startdate && `${startdate.getMonth()}/${startdate.getDate()}/${startdate.getFullYear()}`}
					</Typography>
					<Typography>
						to {!!enddate && `${enddate.getMonth()}/${enddate.getDate()}/${enddate.getFullYear()}`}
					</Typography>
				</div>
				<div className={classes.bigColumn}>
					<Typography>{trip.description}</Typography>
				</div>
				<div className={classes.smallColumn}>
					<IconButton onClick={onEdit}>
						<EditIcon/>
					</IconButton>
				</div>
			</ExpansionPanelSummary>
		</ExpansionPanel>
	);
}

export default withStyles(styles)(TripPanel);