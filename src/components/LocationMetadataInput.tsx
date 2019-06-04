import {Button, createStyles, TextField, Theme, WithStyles, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import firebase from 'firebase';
import DatePicker from 'material-ui-pickers/DatePicker/DatePickerModal';
import React, {ChangeEvent, FormEvent} from 'react';
import {Address} from '../types';
import {datePickerMask} from '../utils/datePickerUtils';
import {parseDateIfValid} from '../utils/parser';
import ImageComponent from './ImageComponent';

type Timestamp = firebase.firestore.Timestamp;

const styles = (theme: Theme) => createStyles({
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit,
		padding: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 10,
		minWidth: '25em',
	},
	inputField: {
		marginTop: theme.spacing.unit,
	},
	inputHorizontalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	inputHorizontalSpacing: {
		marginRight: theme.spacing.unit * 2,
	},
	addressLabel: {
		marginTop: theme.spacing.unit * 2,
	},
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
	actionButtonsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit * 4,
	},
	actionButton: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
});

interface LocationMetadataInputProps extends WithStyles<typeof styles> {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	obj: Date | Timestamp | null,
	onChange1: (date: Date | null) => void,
	obj1: Date | Timestamp | null,
	onChange2: (date: Date | null) => void,
	address: Address,
	onChange3: (e: ChangeEvent<HTMLInputElement>) => void,
	onClick: (e: React.MouseEvent<HTMLInputElement>) => void,
	value: string,
	value1: string,
	openFileDialog: () => void;
	onChangeFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
	inputRef: React.RefObject<any>;
	locationId?: string;
	pickedFile?: File | null;
}

function LocationMetadataInput(props: LocationMetadataInputProps) {
	const {
		classes,
		onSubmit,
		value,
		onChange,
		value1,
		obj,
		address,
		obj1,
		onChange1,
		onChange2,
		onChange3,
		onClick,
		openFileDialog,
		onChangeFileInput,
		inputRef,
		locationId,
		pickedFile,
	} = props;

	return (
		<div>
			<Button
				onClick={openFileDialog}
				className={classes.imageButton}
			>
				<ImageComponent
					path={`images/locations/${locationId}`}
					pickedFile={pickedFile}
				/>
			</Button>

			<form className={classes.inputContainer} onSubmit={onSubmit}>
				<TextField
					className={classes.inputField}
					label='Title'
					name='title'
					value={value}
					onChange={onChange}
					required={true}
				/>
				<TextField
					className={classes.inputField}
					label='Description'
					name='description'
					value={value1}
					onChange={onChange}
					multiline={true}
					required={true}
				/>
				<div className={classes.inputHorizontalContainer}>
					<DatePicker
						className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
						keyboard={true}
						required={true}
						value={parseDateIfValid(obj)}
						onChange={onChange1}
						label='Start Date'
						format='MM/dd/yyyy'
						placeholder='MM/DD/YYYY'
						mask={datePickerMask}
						disableOpenOnEnter={true}
						animateYearScrolling={false}
						fullWidth={true}
					/>
					<DatePicker
						className={classes.inputField}
						keyboard={true}
						required={true}
						value={parseDateIfValid(obj1)}
						onChange={onChange2}
						label='End Date'
						format='MM/dd/yyyy'
						placeholder='MM/DD/YYYY'
						mask={datePickerMask}
						disableOpenOnEnter={true}
						animateYearScrolling={false}
						fullWidth={true}
					/>
				</div>

				<Typography
					className={classes.addressLabel}
					variant='subtitle2'
				>
					Address
				</Typography>
				<div className={classes.inputHorizontalContainer}>
					<TextField
						className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
						label='City'
						name='city'
						value={address.city || ''}
						onChange={onChange3}
						required={true}
						fullWidth={true}
					/>
					<TextField
						className={classes.inputField}
						label='ZIP-Code'
						name='zipCode'
						value={address.zipCode || ''}
						onChange={onChange3}
						fullWidth={true}
					/>
				</div>
				<TextField
					className={classes.inputField}
					label='Country'
					name='country'
					value={address.country || ''}
					onChange={onChange3}
					required={true}
				/>

				<div className={classes.actionButtonsContainer}>
					<Button
						className={classes.actionButton}
						type='submit'
						variant='contained'
						color='primary'
						fullWidth={true}
					>
						Save Location
					</Button>
					<Button
						className={classes.actionButton}
						variant='contained'
						color='secondary'
						fullWidth={true}
						onClick={onClick}
					>
						Cancel
					</Button>
				</div>
			</form>

			<input
				id='file-input'
				type='file'
				alt='Upload Image'
				style={{display: 'none'}}
				ref={inputRef}
				onChange={onChangeFileInput}
				accept='image/*'
			/>
		</div>
	);
}

export default withStyles(styles)(LocationMetadataInput);
