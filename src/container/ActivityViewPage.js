import React from 'react';
import Activity from "../models/Activity";
import {PhotoOutlined} from '@material-ui/icons';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from "prop-types";
import {firestoreConnect} from "react-redux-firebase";
import {URL_PARAM_LOCATION, URL_PARAM_TRIP, URL_PARAM_ACTIVITY} from "../constants/routes";
import {parseDateToString} from '../utils/parser';
import connect from "react-redux/es/connect/connect";
import * as routes from '../constants/routes';
import {Button, Paper, Typography, withStyles} from "@material-ui/core";

import styles from "../styles/ActivityViewStyles"

class ActivityViewPage extends React.Component {

    state = {
        activity: new Activity(),
    };

    componentDidUpdate(prevProps, prevState) {
        const {activity} = this.props;
        if (activity !== prevProps.activity) {
            this.setState({
                activity: {
                    ...activity,
                    startdate: activity.startdate.toDate(),
                    enddate: activity.enddate.toDate(),
                },
            });
        }
    }

    //loads custom fields, defined by the user which are not included in standard
    loadCustomFields() {

    }

    render() {
        const {match, classes} = this.props;
        const {activity} = this.state;
        const {title, description, address, startdate, enddate} = activity;
        const tripId = match.params[URL_PARAM_TRIP];
        const locationId = match.params[URL_PARAM_LOCATION];
        const activityId = match.params[URL_PARAM_ACTIVITY];

        return (
            <div className={classes.activityViewPage}>
                <Typography
                    variant="h4"
                    gutterBottom={true}
                >
                    {title}
                </Typography>
                <div>
                    <Paper
                        className={classes.imagePaper}
                    >
                        <PhotoOutlined
                            className={classes.imageIcon}
                        />
                    </Paper>
                    <div className={classes.inputContainer}>
                        <Paper className={classes.paperField}>
                            <Typography>Description:</Typography>
                            <Typography variant="h6">{description}</Typography>
                        </Paper>
                        <div className={classes.inputHorizontalContainer}>
                            <Paper className={classes.paperField}>
                                <Typography>From:</Typography>
                                <Typography
                                    variant="h6">{parseDateToString(startdate)}</Typography>
                            </Paper>
                            <Paper className={classes.paperField}>
                                <Typography>To:</Typography>
                                <Typography variant="h6">{parseDateToString(enddate)}</Typography>
                            </Paper>
                        </div>
                        <hr/>
                        <Typography
                            className={classes.addressLabel}
                            variant="subtitle2"
                        >
                            Address
                        </Typography>
                        <Paper className={classes.paperField}>
                            <Typography>City:</Typography>
                            <Typography variant="h6">{address.zipCode} {address.city}</Typography>
                        </Paper>
                        <Paper className={classes.paperField}>
                            <Typography>Country:</Typography>
                            <Typography variant="h6">{address.country}</Typography>
                        </Paper>
                        <hr/>
                        <NavLink exact to={routes.ACTIVITY_EDIT(tripId, locationId, activityId)}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                            >
                                Edit Activity
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

ActivityViewPage.propTypes = {
    activity: PropTypes.objectOf(Activity),
    activityId: PropTypes.string,
};

export default compose(withRouter,
    firestoreConnect((props) => {
        const tripId = props.match.params[URL_PARAM_TRIP];
        const locationId = props.match.params[URL_PARAM_LOCATION];
        const activityId = props.match.params[URL_PARAM_ACTIVITY];
        return [
            `TRIPS/${tripId}/locations/${locationId}`,
            `TRIPS/${tripId}/locations/${locationId}/activities`,
            `TRIPS/${tripId}/locations/${locationId}/activities/${activityId}`,
        ];
    }),
    connect(
        ({firestore: {data}}, props) => {
            const tripId = props.match.params[URL_PARAM_TRIP];
            const locationId = props.match.params[URL_PARAM_LOCATION];
            const activityId = props.match.params[URL_PARAM_ACTIVITY];
            return {
                activity: data.TRIPS
                    && data.TRIPS[tripId]
                    && data.TRIPS[tripId].locations
                    && data.TRIPS[tripId].locations[locationId]
                    && data.TRIPS[tripId].locations[locationId].activities
                    && data.TRIPS[tripId].locations[locationId].activities[activityId],
            };
        },
    ),
    withStyles(styles),
)(ActivityViewPage);