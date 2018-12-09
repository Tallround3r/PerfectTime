import React from 'react';
import PropTypes from "prop-types";
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from "../constants/routes";
import Address from "../models/Address";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {firestoreConnect} from "react-redux-firebase";
import {Button, Paper, TextField, Typography, withStyles} from "@material-ui/core";
import {AddPhotoAlternateOutlined} from "@material-ui/icons";
import DatePicker from "material-ui-pickers/DatePicker/DatePickerModal";
import classNames from "classnames";

import styles from "../styles/ActivityEditStyles";

const INITIAL_ACTIVITY = {
    title: '',
    description: '',
    startdate: null,
    enddate: null,
    address: new Address,
};

class ActivityAddPage extends React.Component {

    state = {
        activity: INITIAL_ACTIVITY,
    };

    handleSubmit = (e) => {
        const {firestore, match} = this.props;
        const {activity} = this.state;

        const firestoreRef = {
            collection: 'TRIPS',
            doc: match.params[URL_PARAM_TRIP],
            subcollections: [{
                collection: 'locations',
                doc: match.params[URL_PARAM_LOCATION],
                subcollections: [{
                    collection: 'activities',
                }]
            }],
        };
        firestore.set(firestoreRef, activity);

        e.preventDefault();
    };

    handleCancel = (e) => {
        const {activity} = this.props;

        this.setState({
            activity: {
                ...activity,
                startdate: activity.startdate.toDate(),
                enddate: activity.enddate.toDate(),
            },
        });

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
        const {classes, match} = this.props;
        const {activity} = this.state;
        let {title, description, startdate, enddate, address} = activity;
        console.log(activity);
        console.log(activity.title);
        console.log('add:');
        console.log(activity.address);
        return (
            <div className={classes.activityEditPage}>
                <Typography
                    variant="h4"
                    gutterBottom={true}
                >
                    Add Activity
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
                                Add Activity
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ActivityAddPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            [URL_PARAM_TRIP]: PropTypes.string.isRequired,
            [URL_PARAM_LOCATION]: PropTypes.string.isRequired,
        }),
    }).isRequired,
    classes: PropTypes.object.isRequired,
};

export default compose(withRouter,
    firestoreConnect(),
    withStyles(styles),
)(ActivityAddPage);
