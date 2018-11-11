import React from 'react';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import {getLocations} from "../firebase/db";

class LocationsPage extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        let arrayLocations = []; // Array for all locations from the database

        // get all locations from the database and save them into the Array for the locations (arrayLocation)
        getLocations().then(snapshot => snapshot.forEach(contentDatabaseLocations => {
            var location = contentDatabaseLocations.data();
            arrayLocations.push(location);

        })).then(() => { // test, whether all locations are in the Array
            arrayLocations.forEach(function (contentArrayLocations) {
                console.log(contentArrayLocations);
                console.log(contentArrayLocations.description);
            });
        });
    }

    showAllLocations() {

    }

    searchLocations() {

    }

    render() {
        return (
            <div>
                <h1>Locations</h1>
                <NavLink exact to={routes.LOCATIONS_ADD}>Add Location</NavLink>
                <br/>
                <NavLink exact to={routes.LOCATIONS_EDIT}>Edit Location</NavLink>
            </div>
        );
    }
}

export default LocationsPage;