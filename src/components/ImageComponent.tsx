import {Button, CircularProgress, createStyles, Paper, Theme, withStyles, WithStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import React from 'react';
import {getStorageURL} from '../firebase/storage';

const styles = (theme: Theme) => createStyles({
	imageButton: {
		float: 'right',
	},
	imagePaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing.unit,
		width: '18em',
		height: '18em',
	},
	imageIcon: {
		fontSize: '10em',
	},
});

interface ImageComponentProps extends WithStyles<typeof styles> {
	locationId?: string;
	openFileDialog: () => void;
}

function ImageComponent(props: ImageComponentProps) {
	const {locationId, openFileDialog, classes} = props;

	let imageSrc;

	getStorageURL(`images/location/${locationId}`)
		.then((url) => {
			imageSrc = url;
			console.log(url);
		});

	return !!imageSrc ?
		<img src={imageSrc} alt={'Location Picture'}/> :
		<Button
			onClick={openFileDialog}
			className={classes.imageButton}
		>
			<Paper
				className={classes.imagePaper}
			>
				<AddPhotoAlternateOutlined
					className={classes.imageIcon}
				/>
			</Paper>
		</Button>;
}

export default withStyles(styles)(ImageComponent);
