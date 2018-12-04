import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
    withStyles,
} from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {Activity} from '../models';
import {withRouter} from 'react-router-dom';
import {getRandomImage} from '../utils/RessourceUtils';
import {parseDateToString} from '../utils/parser';
import * as routes from "../constants/routes";
import {NavLink} from "react-router-dom";


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
});

class ActivityCard extends React.Component {

    cardImage = getRandomImage();

    handleEdit = (e) => {
    };

    handleDelete = (e) => {

    };

    render() {
        const {classes, activity} = this.props;
        const {title, description, startdate, enddate} = activity;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={title}
                    subheader={parseDateToString(startdate) + ' — ' + parseDateToString(enddate)}
                />

                <CardMedia
                    className={classes.media}
                    image={this.cardImage}
                    title={title}
                />

                <CardContent>
                    <Typography component="p">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions className={classes.actions}>
                    <Tooltip title="Delete" aria-label="Delete">
                        <IconButton
                            onClick={this.handleDelete}
                        >
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" aria-label="Edit">
                        <NavLink exact to={routes.ACTIVITY_EDIT(this.props.activityId)}>
                            <IconButton>
                                <Edit/>
                            </IconButton>
                        </NavLink>
                    </Tooltip>
                </CardActions>
            </Card>
        );
    }
}

ActivityCard.propTypes = {
    classes: PropTypes.object.isRequired,
    activity: PropTypes.objectOf(Activity).isRequired,
    activityId: PropTypes.string.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter,
)(ActivityCard);