import React from 'react';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import {getLocations} from "../firebase/db";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    borderAround: {
        border: "thin solid #000000"
    },
    bigColumn: {
        flexBasis: '50%',
        textAlign: 'center',
    },
    smallColumn: {
        flexBasis: '1%',
        textAlign: 'right',
    },
    verticalLine: {
        borderLeft: "thin solid #000000",
        height: '100px',
    },
    hrLine: {
        width: '1px',
        height: '67px',
    },
});

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

    tick(parameter) {
        this.setState({
            arrayLocations: parameter,
        });
    }

    showAllLocations() {
    }

    searchLocations() {

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h1>Locations</h1>
                <div>
                    {this.state.arrayLocations.map((label, index) => {
                        return (
                            <div key={label}>
                                <ExpansionPanel className={classes.borderAround} key={label}>
                                    <ExpansionPanelSummary>
                                        <div className={classes.smallColumn}>
                                            <Avatar><StarIcon/></Avatar>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.smallColumn}>
                                            <NavLink exact to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <GridList cols={37} cellHeight={"auto"} className={classes.verticalLine}>
                                            <GridListTile></GridListTile>
                                            <GridListTile>
                                                <hr className={classes.hrLine}/>
                                            </GridListTile>
                                            <GridListTile style={{width: 'auto'}}>
                                                <br/>
                                                <NavLink exact to={routes.LOCATIONS_ADD}>
                                                    <Avatar><AddIcon/></Avatar>
                                                </NavLink>
                                            </GridListTile>
                                        </GridList>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <br/>
                            </div>
                        )
                    })}
                </div>
                <hr/>
                <br/>
                <div>
                    {this.state.arrayLocations.map((label, index) => {
                        return (
                            <div key={label}>
                                <ExpansionPanel className={classes.borderAround} key={label}>
                                    <ExpansionPanelSummary>
                                        <div className={classes.smallColumn}>
                                            <Avatar><StarIcon/></Avatar>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.bigColumn}>
                                            <Typography>{label}</Typography>
                                        </div>
                                        <div className={classes.smallColumn}>
                                            <NavLink exact to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>description</Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <GridList cols={37} cellHeight={"auto"}>
                                    <GridListTile></GridListTile>
                                    <GridListTile>
                                        <hr className={classes.hrLine}/>
                                    </GridListTile>
                                    <GridListTile style={{width: 'auto'}}>
                                        <br/>
                                        <NavLink exact to={routes.LOCATIONS_ADD}>
                                            <Avatar><AddIcon/></Avatar>
                                        </NavLink>
                                    </GridListTile>
                                </GridList>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LocationsPage);

/*
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
<Stepper className={classes.defaultCol} orientation="vertical">
    {this.state.arrayLocations.map((label, index) => {
        return (
            <Step key={label}>
                <StepLabel icon={'L'}>{label}</StepLabel>
                <StepContent>
                    <Typography>description</Typography>
                </StepContent>
            </Step>
        );
    })}
</Stepper>
<hr/>
*/