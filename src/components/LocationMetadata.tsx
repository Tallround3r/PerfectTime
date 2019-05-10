import {Button, createStyles, Paper, Theme, WithStyles, withStyles} from "@material-ui/core";
import {AddPhotoAlternateOutlined} from "@material-ui/icons";
import {parseDateToString} from "../utils/parser";
import {NavLink} from "react-router-dom";
import * as routes from "../constants/routes";
import Typography from '@material-ui/core/Typography';
import React from "react";
import {Address} from "../types/address";
import {Trip} from "../types/trip";
import firebase from "firebase";

type Timestamp = firebase.firestore.Timestamp;

const styles = (theme: Theme) => createStyles({
    locationViewPage: {
        paddingTop: theme.spacing.unit * 3,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        minWidth: '25em',
    },
    inputHorizontalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    imagePaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing.unit,
        float: 'right',
        width: '30em',
        height: '20em',
    },
    imageIcon: {
        fontSize: '10em',
    },
    activitiesContainer: {
        marginTop: theme.spacing.unit * 6,
    },
    paperField: {
        width: '100%',
        height: 'auto',
    },
});

interface LocationMetadataProps extends WithStyles<typeof styles> {
    title: string;
    description: string;
    timestamp: Date | Timestamp | null,
    timestamp1: Date | Timestamp | null,
    address: Address,
    tripId: string,
    locationId: string
}

function LocationMetadata({title, classes, description, timestamp, timestamp1, address, tripId, locationId}: LocationMetadataProps) {
    return (
        <div className={classes.locationViewPage}>
            <Typography
                variant='h4'
                gutterBottom={true}
            >
                {title}
            </Typography>

            <div>
                <Paper
                    className={classes.imagePaper}
                >
                    <AddPhotoAlternateOutlined
                        className={classes.imageIcon}
                    />
                </Paper>

                <div className={classes.inputContainer}>
                    <Paper className={classes.paperField}>
                        <Typography>Description:</Typography>
                        <Typography variant='h6'>{description}</Typography>
                    </Paper>
                    <div className={classes.inputHorizontalContainer}>
                        <Paper className={classes.paperField}>
                            <Typography>From:</Typography>
                            <Typography variant='h6'>{parseDateToString(timestamp)}</Typography>
                        </Paper>
                        <Paper className={classes.paperField}>
                            <Typography>To:</Typography>
                            <Typography variant='h6'>{parseDateToString(timestamp1)}</Typography>
                        </Paper>
                    </div>
                    <hr/>
                    <Typography variant='subtitle2'>
                        Address
                    </Typography>
                    <Paper className={classes.paperField}>
                        <Typography>City:</Typography>
                        <Typography variant='h6'>{address.zipCode} {address.city}</Typography>
                    </Paper>
                    <Paper className={classes.paperField}>
                        <Typography>Country:</Typography>
                        <Typography variant='h6'>{address.country}</Typography>
                    </Paper>
                    <hr/>
                    <NavLink exact={true} to={routes.LOCATIONS_EDIT(tripId, locationId)}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth={true}
                        >
                            Edit Location
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(LocationMetadata);
