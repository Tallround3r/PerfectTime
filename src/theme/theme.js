import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue.A700
		},
		secondary: {
			main: blue["50"]
		}
	},
	typography: {
		useNextVariants: true,
	},
});

export default theme;