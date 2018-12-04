import React from 'react';
import Activity from "../models/Activity";
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from "prop-types";

class ActivityEditPage extends React.Component {

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
            <h1>Edit Activity</h1>
        );
    }

}

ActivityEditPage.propTypes = {
    activity: PropTypes.objectOf(Activity).isRequired,
    activityId: PropTypes.string.isRequired,
};

export default compose(withRouter) (ActivityEditPage);