import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import {NavLink} from 'react-router-dom';
import * as routes from '../constants/routes';
import PictureStar from '../images/star.jpg';
import {Location} from '../types';
import ActivitiesSlider from './ActivitiesSlider';


const styles = (theme: Theme) => createStyles({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		background: theme.palette.secondary.main,
	},
	bigColumn: {
		flexBasis: '50%',
		textAlign: 'center',
	},
	smallColumn: {
		flexBasis: '1%',
		textAlign: 'right',
	},
	borderLeft: {
		borderLeft: 'thin solid #000000',
		height: '100px',
	},
	hrLine: {
		width: '1px',
		height: '67px',
	},
	activitiesContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		width: '100%',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 5,
		right: theme.spacing.unit * 5,
	},
});

interface LocationPanelProps extends WithStyles<typeof styles> {
	expanded: any,
	id: string,
	onChange: (event: any, expanded: any) => void,
	location: Location,
	startdate: Date | null,
	enddate: Date | null,
	tripId: string,
}

function LocationPanel({classes, expanded, id, onChange, location, startdate, enddate, tripId}: LocationPanelProps) {
	return (
		<div>
			<ExpansionPanel
				className={classes.locationPanel}
				expanded={expanded === id}
				onChange={onChange}
			>
				<ExpansionPanelSummary>
					<div className={classes.smallColumn}>
						<Avatar src={PictureStar}/>
					</div>
					<div className={classes.bigColumn}>
						<Typography>{location.title}</Typography>
					</div>
					<div className={classes.bigColumn}>
						<Typography>
							Start Date:
							{!!startdate && ` ${startdate.getDate()}.${startdate.getMonth()}.${startdate.getFullYear()}`}
						</Typography>
						<Typography>
							End Date:
							{!!enddate && ` ${enddate.getDate()}.${enddate.getMonth()}.${enddate.getFullYear()}`}
						</Typography>
					</div>
					<div className={classes.bigColumn}>
						<Typography>{location.description}</Typography>
					</div>
					<div className={classes.smallColumn}>
						<NavLink exact={true} to={routes.LOCATIONS_VIEW(tripId, id)}>
							<Avatar>
								<ArrowRightIcon/>
							</Avatar>
						</NavLink>
					</div>
				</ExpansionPanelSummary>

				<ExpansionPanelDetails>
					<div style={{width: '100%'}}>
						{
							// @ts-ignore
							<ActivitiesSlider
								tripId={tripId}
								locationId={id}
							/>
						}
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

export default withStyles(styles)(LocationPanel);
