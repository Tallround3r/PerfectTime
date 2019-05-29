import {CircularProgress, createStyles, Paper, Theme, withStyles, WithStyles} from '@material-ui/core';
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
	image: {
		width: '18em',
		height: '18em',
	},
	imageIcon: {
		fontSize: '10em',
	},
});

interface ImageComponentProps extends WithStyles<typeof styles> {
	path?: string;
}

interface ImageComponentState {
	imageSrc: string | null;
	isLoading: boolean;
}

class ImageComponent extends React.Component<ImageComponentProps, ImageComponentState> {
	state = {
		imageSrc: null,
		isLoading: false,
	};

	componentWillMount(): void {
		const {path} = this.props;
		if (path) {
			this.setState({isLoading: true});
			getStorageURL(path)
				.then((url) => {
					this.setState({imageSrc: url});
				})
				.finally(() => {
					this.setState({isLoading: false});
				});
		}
	}

	render() {
		const {classes} = this.props;
		const {imageSrc, isLoading} = this.state;

		return !!imageSrc ?
			<img src={imageSrc} alt={''} className={classes.image}/> :
			<Paper
				className={classes.imagePaper}
			>
				{isLoading ?
					<CircularProgress/> :
					<AddPhotoAlternateOutlined
						className={classes.imageIcon}
					/>
				}
			</Paper>;
	}
}

export default withStyles(styles)(ImageComponent);
