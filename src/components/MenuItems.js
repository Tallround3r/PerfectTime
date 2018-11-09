import React from 'react';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GavelIcon from '@material-ui/icons/Gavel';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import * as routes from '../constants/routes';


export const menuItems = (
	<div>
		<NavLink exact to={routes.LOCATIONS} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<LocationOnIcon/>
				</ListItemIcon>
				<ListItemText primary="Locations"/>
			</ListItem>
		</NavLink>
		<NavLink exact to={routes.ACTIVITIES} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<LocalActivityIcon/>
				</ListItemIcon>
				<ListItemText primary="Activities"/>
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