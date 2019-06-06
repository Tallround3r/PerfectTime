import {CircularProgress, createStyles, Paper, Theme, withStyles, WithStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import React, {MouseEvent} from 'react';
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
	removeBtn: {
		position: 'absolute',
		top: theme.spacing.unit,
		right: theme.spacing.unit,
	},
});

interface ImageComponentProps extends WithStyles<typeof styles> {
	path?: string;
	pickedFile?: File | null;
	onRemoveImage?: (event: MouseEvent<HTMLButtonElement>) => void;
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
		const {classes, pickedFile} = this.props;
		const {imageSrc, isLoading} = this.state;

		let src: null | string = imageSrc;
		if (!!pickedFile) {
			src = URL.createObjectURL(pickedFile);
		}

		return !!src ?
			<div>
				<img src={src} alt={''} className={classes.image}/>
				{/*<IconButton*/}
				{/*	className={classes.removeBtn}*/}
				{/*	onClick={onRemoveImage}*/}
				{/*>*/}
				{/*	<Clear/>*/}
				{/*</IconButton>*/}
			</div> :
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
