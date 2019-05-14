import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExploreIcon from '@material-ui/icons/Explore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import {NavLink} from 'react-router-dom';
import * as routes from '../constants/routes';


export const menuItems = (tripId: string) => (
	<div>
		<NavLink exact={true} to={routes.LOCATIONS(tripId)} className='nav-link'>
			<ListItem button={true}>
				<ListItemIcon>
					<LocationOnIcon/>
				</ListItemIcon>
				<ListItemText primary='Locations'/>
			</ListItem>
		</NavLink>
		<NavLink exact={true} to={routes.TRIP_MEMBERS(tripId)} className='nav-link'>
			<ListItem button={true}>
				<ListItemIcon>
					<AccountCircleIcon/>
				</ListItemIcon>
				<ListItemText primary='Members'/>
			</ListItem>
		</NavLink>

		<Divider/>

		<NavLink exact={true} to={routes.TRIPS()} className='nav-link'>
			<ListItem button={true}>
				<ListItemIcon>
					<ExploreIcon/>
				</ListItemIcon>
				<ListItemText primary='Trips Overview'/>
			</ListItem>
		</NavLink>
	</div>
);
