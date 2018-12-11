import React from 'react';
import Activity from "../models/Activity";
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from "prop-types";
import {firestoreConnect} from "react-redux-firebase";
import * as routes from "../constants/routes";
import {URL_PARAM_ACTIVITY, URL_PARAM_LOCATION, URL_PARAM_TRIP} from "../constants/routes";
import connect from "react-redux/es/connect/connect";
import {Button, Paper, TextField, Typography, withStyles} from "@material-ui/core";
import {AddPhotoAlternateOutlined} from "@material-ui/icons";
import DatePicker from "material-ui-pickers/DatePicker/DatePickerModal";
import classNames from "classnames";
import Address from '../models/Address';
import styles from "../styles/ActivityEditStyles";


const INITIAL_ACTIVITY = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: new Address(),
};

class ActivityEditPage extends React.Component {

    state = {
        activity: INITIAL_ACTIVITY,
    };

    navigateBack = (history, match) => {
        const tripId = match.params[URL_PARAM_TRIP];
        const locationId = match.params[URL_PARAM_LOCATION];
        const activityId = match.params[URL_PARAM_ACTIVITY];

        history.push(routes.ACTIVITY_VIEW(tripId, locationId, activityId));
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

    handleSubmit = (e) => {
        const {firestore, match, history} = this.props;
        const {activity} = this.state;

        const firestoreRef = {
            collection: 'TRIPS',
            doc: match.params[URL_PARAM_TRIP],
            subcollections: [{
                collection: 'locations',
                doc: match.params[URL_PARAM_LOCATION],
                subcollections: [{
                    collection: 'activities',
                    doc: match.params[URL_PARAM_ACTIVITY],
                }]
            }],
        };
        firestore.set(firestoreRef, activity);

        this.navigateBack(history, match);
        e.preventDefault();
    };

    handleCancel = (e) => {
        const {activity, history, match} = this.props;

        this.setState({
            activity: {
                ...activity,
                startdate: activity.startdate.toDate(),
                enddate: activity.enddate.toDate(),
            },
        });

        this.navigateBack(history, match);
        e.preventDefault();
    };

    handleChangeInput = (e) => {
        const {name, value} = e.target;

        this.setState((prevState) => {
            return {
                activity: {
                    ...prevState.activity,
                    [name]: value,
                },
            };
        });
    };

    handleChangeAddress = (e) => {
        const {name, value} = e.target;

        this.setState((prevState) => ({
            activity: {
                ...prevState.activity,
                address: {
                    ...prevState.activity.address,
                    [name]: value,
                },
            },
        }));
    };

    handleChangeDate = (name) => (date) => {
        this.setState((prevState) => {
            return {
                activity: {
                    ...prevState.activity,
                    [name]: date,
                },
            };
        });
    };

    render() {
        const {classes} = this.props;
        const {activity} = this.state;
        const {title, description, startdate, enddate, address} = activity;

        return (
            <div className={classes.activityEditPage}>
                <Typography
                    variant="h4"
                    gutterBottom={true}
                >
                    Edit Activity
                </Typography>
                <div>
                    <Paper
                        className={classes.imagePaper}
                    >
                        <AddPhotoAlternateOutlined
                            className={classes.imageIcon}
                        />
                    </Paper>

                    <form className={classes.inputContainer} onSubmit={this.handleSubmit}>
                        <TextField
                            className={classes.inputField}
                            label="Title"
                            name="title"
                            value={title}
                            onChange={this.handleChangeInput}
                            required
                        />
                        <TextField
                            className={classes.inputField}
                            label="Description"
                            name="description"
                            value={description}
                            onChange={this.handleChangeInput}
                            multiline
                            required
                        />
                        <div className={classes.inputHorizontalContainer}>
                            <DatePicker
                                className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
                                keyboard
                                required
                                value={startdate}
                                onChange={this.handleChangeDate('startdate')}
                                label="Start Date"
                                format="MM/dd/yyyy"
                                placeholder="MM/DD/YYYY"
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                disableOpenOnEnter
                                animateYearScrolling={false}
                                fullWidth
                            />
                            <DatePicker
                                className={classes.inputField}
                                keyboard
                                required
                                value={enddate}
                                onChange={this.handleChangeDate('enddate')}
                                label="End Date"
                                format="MM/dd/yyyy"
                                placeholder="MM/DD/YYYY"
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                disableOpenOnEnter
                                animateYearScrolling={false}
                                fullWidth
                            />
                        </div>

                        <Typography
                            className={classes.addressLabel}
                            variant="subtitle2"
                        >
                            Address
                        </Typography>
                        <div className={classes.inputHorizontalContainer}>
                            <TextField
                                className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
                                label="City"
                                name="city"
                                value={address.city || ''}
                                onChange={this.handleChangeAddress}
                                required
                                fullWidth
                            />
                            <TextField
                                className={classes.inputField}
                                label="ZIP-Code"
                                name="zipCode"
                                value={address.zipCode || ''}
                                onChange={this.handleChangeAddress}
                                fullWidth
                            />
                        </div>
                        <TextField
                            className={classes.inputField}
                            label="Country"
                            name="country"
                            value={address.country || ''}
                            onChange={this.handleChangeAddress}
                            required
                        />

                        <div className={classes.actionButtonsContainer}>
                            <Button
                                className={classes.actionButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Save Activity
                            </Button>
                            <Button
                                className={classes.actionButton}
                                onClick={this.handleCancel}
                                variant="contained"
                                color="secondary"
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ActivityEditPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            [URL_PARAM_TRIP]: PropTypes.string.isRequired,
            [URL_PARAM_LOCATION]: PropTypes.string.isRequired,
            [URL_PARAM_ACTIVITY]: PropTypes.string.isRequired,
        }),
    }).isRequired,
    activity: PropTypes.objectOf(Activity),
    activityId: PropTypes.string,
    classes: PropTypes.object.isRequired,
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
)(ActivityEditPage);