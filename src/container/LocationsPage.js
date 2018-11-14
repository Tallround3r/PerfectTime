import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {withStyles} from '@material-ui/core';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    borderAround: {
        border: 'thin solid #000000',
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
        borderLeft: 'thin solid #000000',
        height: '100px',
    },
    hrLine: {
        width: '1px',
        height: '67px',
    },
});

class LocationsPage extends React.Component {

    showAllLocations() {
    }

    searchLocations() {

    }

    render() {
        const {classes, locations} = this.props;
        return (
            <div>
                <h1>Locations</h1>
                <div>
                    {!isLoaded(locations)
                        ? 'Loading...'
                        : isEmpty(locations)
                            ? 'No Locations created yet.'
                            : Object.keys(locations).map((key, index) => {
                                let label = locations[key].title;
                                let startdate = new Date(locations[key].startdate.seconds * 1000);
                                let enddate = new Date(locations[key].enddate.seconds * 1000);
                                return (
                                    <div key={key}>
                                        <ExpansionPanel className={classes.borderAround} key={label}>
                                            <ExpansionPanelSummary>
                                                <div className={classes.smallColumn}>
                                                    <Avatar><StarIcon/></Avatar>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>{label}</Typography>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
                                                    <Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>{locations[key].description}</Typography>
                                                </div>
                                                <div className={classes.smallColumn}>
                                                    <NavLink exact
                                                             to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <GridList cols={37} cellHeight={'auto'}
                                                          className={classes.verticalLine}>
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
                                );
                            })}
                </div>
                <hr/>
                <br/>
                <div>
                    {!isLoaded(locations)
                        ? 'Loading...'
                        : isEmpty(locations)
                            ? 'No Locations created yet.'
                            : Object.keys(locations).map((key, index) => {
                                let label = locations[key].title;
                                let startdate = new Date(locations[key].startdate.seconds * 1000);
                                let enddate = new Date(locations[key].enddate.seconds * 1000);
                                return (
                                    <div key={key}>
                                        <ExpansionPanel className={classes.borderAround} key={key}>
                                            <ExpansionPanelSummary>
                                                <div className={classes.smallColumn}>
                                                    <Avatar><StarIcon/></Avatar>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>{label}</Typography>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
                                                    <Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
                                                </div>
                                                <div className={classes.bigColumn}>
                                                    <Typography>Owner</Typography>
                                                </div>
                                                <div className={classes.smallColumn}>
                                                    <NavLink exact to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>{locations[key].description}</Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        <GridList cols={37} cellHeight={'auto'}>
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
                                );
                            })}
                </div>
            </div>
        );
    }
}

export default compose(
    firestoreConnect([
        'TRIPS/TXjQVQjjfXRfBnCJ1q0L/locations',
    ]),
    connect(
        ({firestore: {data}}, props) => ({
            locations: data.TRIPS && data.TRIPS['TXjQVQjjfXRfBnCJ1q0L'] && data.TRIPS['TXjQVQjjfXRfBnCJ1q0L'].locations,
        }),
    ),
    withStyles(styles),
)(LocationsPage);

