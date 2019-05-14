import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
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
	link: {
		textDecoration: 'none',
	},
	hide: {
		visibility: 'hidden',
	}
});

interface TripPanelProps extends WithStyles<typeof styles> {
	trip: Trip;
	id: string;
	showEditBtn: boolean;
	showDeleteBtn: boolean;
	onEdit: (e: MouseEvent) => void;
	onDelete: (e: MouseEvent) => void;
}

function TripPanel({classes, trip, id, onEdit, onDelete, showEditBtn, showDeleteBtn}: TripPanelProps) {
	const startdate = parseDateIfValid(trip.startdate);
	const enddate = parseDateIfValid(trip.enddate);

	return (
		<NavLink exact={true} to={routes.LOCATIONS(id)} className={classes.link}>
			<ExpansionPanel
				className={classes.locationPanel}
				expanded={false}
			>
				<ExpansionPanelSummary>
					<div className={classes.smallColumn}>
						<Avatar className={classes.iconAvatar}>
							<DirectionsWalkIcon fontSize='large'/>
						</Avatar>
					</div>
					<div className={classes.bigColumn}>
						<Typography
							variant={'h6'}
						>
							{trip.title}
						</Typography>
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
						<Tooltip title={'Edit'} aria-label={'Edit'} className={showEditBtn ? '' : classes.hide}>
							<IconButton onClick={onEdit}>
								<EditIcon/>
							</IconButton>
						</Tooltip>
					</div>
					<div className={classes.smallColumn}>
						<Tooltip title={'Delete'} aria-label={'Edit'} className={showDeleteBtn ? '' : classes.hide}>
							<IconButton onClick={onDelete}>
								<DeleteIcon/>
							</IconButton>
						</Tooltip>
					</div>
				</ExpansionPanelSummary>
			</ExpansionPanel>
		</NavLink>
	);
}

export default withStyles(styles)(TripPanel);
