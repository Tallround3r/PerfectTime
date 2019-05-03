import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import * as React from 'react';
import Select from 'react-select';
import {StylesConfig} from 'react-select/lib/styles';
import {ActionMeta, GroupedOptionsType, OptionsType, ValueType} from 'react-select/lib/types';


const styles = (theme: Theme) => createStyles({
	input: {
		display: 'flex',
		padding: 0,
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center',
		overflow: 'hidden',
	},
	chip: {
		margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08,
		),
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	singleValue: {
		fontSize: 16,
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		fontSize: 16,
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	},
});

function NoOptionsMessage(props: any) {
	return (
		<Typography
			color='textSecondary'
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function inputComponent({inputRef, ...props}: { inputRef: any }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props: any) {
	return (
		<TextField
			fullWidth={true}
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps,
				},
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props: any) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component='div'
			style={{
				fontWeight: props.isSelected ? 500 : 400,
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

function Placeholder(props: any) {
	return (
		<Typography
			color='textSecondary'
			className={props.selectProps.classes.placeholder}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function SingleValue(props: any) {
	return (
		<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props: any) {
	return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props: any) {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused,
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
}

function Menu(props: any) {
	return (
		<Paper square={true} className={props.selectProps.classes.paper} {...props.innerProps}>
			{props.children}
		</Paper>
	);
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer,
};

export interface OptionType { label: string; value: string }

interface MultiSelectProps extends WithStyles<typeof styles> {
	theme: Theme,
	options: GroupedOptionsType<OptionType> | OptionsType<OptionType>,
	value: ValueType<OptionType>,
	label: string,
	placeholder: string,
	onChange: (value: ValueType<OptionType>, action: ActionMeta) => void,
}

class MultiSelect extends React.Component<MultiSelectProps> {
	render() {
		const {classes, theme, options, onChange, value, label, placeholder} = this.props;

		const selectStyles: StylesConfig = {
			input: (base: object) => ({
				...base,
				'color': theme.palette.text.primary,
				'& input': {
					font: 'inherit',
				},
			}),
		};


		return (
			<NoSsr>
				<Select
					classes={classes}
					styles={selectStyles}
					textFieldProps={{
						label,
						InputLabelProps: {
							shrink: true,
						},
					}}
					options={options}
					components={components}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					isMulti={true}
					closeMenuOnSelect={false}
				/>
			</NoSsr>
		);
	}
}

export default withStyles(styles, {withTheme: true})(MultiSelect);
