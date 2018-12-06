import React from 'react';
import Activity from "../models/Activity";
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from "prop-types";
import {firestoreConnect} from "react-redux-firebase";
import {URL_PARAM_LOCATION, URL_PARAM_TRIP, URL_PARAM_ACTIVITY} from "../constants/routes";
import connect from "react-redux/es/connect/connect";

class ActivityViewPage extends React.Component {

    state = {
        activity: new Activity(),
    };

    componentDidMount() {

    }

    //loads custom fields, defined by the user which are not included in standard
    loadCustomFields() {

    }

    saveActivity() {

    }

    render() {
        return (
            <div>
                <h1>{this.props.activity.title}</h1>
            </div>
        );
    }

}

ActivityViewPage.propTypes = {
    activity: PropTypes.objectOf(Activity).isRequired,
    activityId: PropTypes.string.isRequired,
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
)(ActivityViewPage);