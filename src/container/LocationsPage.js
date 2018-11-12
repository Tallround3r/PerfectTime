import React from 'react';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import {getLocations} from "../firebase/db";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

class LocationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocations: [],
        };
    }

    componentDidMount() {
        let aCities = []; // String-Array with all cities from locations
        // get all locations from the database and save them into the Array for the cities (aCities)
        getLocations().then(snapshot => snapshot.forEach(contentDatabaseLocations => {
            let oLocation = contentDatabaseLocations.data(); // Object with the current location in the current loop
            let sCity = oLocation.address.city; // String with the current city from the current location
            aCities.push(sCity); // put sCity in String-Array aCities
            this.tick(aCities);

        })).then(() => { // what to do after getting the data from database
            aCities.forEach(function (contentArrayLocations) {
                //console.log(contentArrayLocations);
                //console.log(contentArrayLocations.description);
            });
        });
    }

    tick(parameter){
        this.setState({
            arrayLocations: parameter,
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
                <Stepper orientation="vertical">
                    {this.state.arrayLocations.map((label, index) => {
                        return(
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>description</Typography>

                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                <NavLink exact to={routes.LOCATIONS_ADD}>Add Location</NavLink>
                <br/>
                <NavLink exact to={routes.LOCATIONS_EDIT}>Edit Location</NavLink>
            </div>
        );
    }
}

export default LocationsPage;