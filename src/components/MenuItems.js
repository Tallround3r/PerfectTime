import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import {NavLink} from 'react-router-dom';

import * as routes from '../constants/routes';
import {TRIP_ID} from '../constants/staticIds';


export const menuItems = (
	<div>
		<NavLink exact to={routes.LOCATIONS(TRIP_ID)} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<LocationOnIcon/>
				</ListItemIcon>
				<ListItemText primary="Locations"/>
			</ListItem>
		</NavLink>
		<NavLink exact to={routes.MEMBERS} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<AccountCircleIcon/>
				</ListItemIcon>
				<ListItemText primary="Members"/>
			</ListItem>
		</NavLink>
	</div>
);