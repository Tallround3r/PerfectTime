import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, {MouseEvent} from 'react';

interface ConfirmDialogProps {
	content: string;
	open: boolean;
	onConfirm: (e: MouseEvent) => void;
	onCancel: (e: MouseEvent) => void;
	title?: string;
	confirmLabel?: string;
	cancelLabel?: string;
}

interface ConfirmDialogState {
	open: boolean;
}

class ConfirmDialog extends React.Component<ConfirmDialogProps, ConfirmDialogState> {

	constructor(props: ConfirmDialogProps) {
		super(props);
		this.state = {
			open: props.open,
		};
	}

	componentWillReceiveProps(nextProps: Readonly<ConfirmDialogProps>, nextContext: any): void {
		if (this.state.open !== nextProps.open) {
			this.setState({open: nextProps.open});
		}
	}

	handleClose = () => {
		this.setState({open: false});
	};

	render() {
		const {title, content, onConfirm, onCancel, confirmLabel, cancelLabel} = this.props;
		return (
			<div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='confirm-dialog-title'
					aria-describedby='confirm-dialog-description'
				>
					{!!title && <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>}
					<DialogContent>
						<DialogContentText id='confirm-dialog-description'>
							{content}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={onCancel} color='primary'>
							{!cancelLabel ? 'Cancel' : cancelLabel}
						</Button>
						<Button onClick={onConfirm} color={'primary'} autoFocus={true}>
							{!confirmLabel ? 'Ok' : confirmLabel}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ConfirmDialog;
