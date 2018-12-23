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


export const menuItems = (tripId) => (
	<div>
		<NavLink exact to={routes.LOCATIONS(tripId)} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<LocationOnIcon/>
				</ListItemIcon>
				<ListItemText primary="Locations"/>
			</ListItem>
		</NavLink>
		<NavLink exact to={routes.MEMBERS(tripId)} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<AccountCircleIcon/>
				</ListItemIcon>
				<ListItemText primary="Members"/>
			</ListItem>
		</NavLink>

		<Divider/>

		<NavLink exact to={routes.TRIPS()} className="nav-link">
			<ListItem button>
				<ListItemIcon>
					<ExploreIcon/>
				</ListItemIcon>
				<ListItemText primary="Trips Overview"/>
			</ListItem>
		</NavLink>
	</div>
);