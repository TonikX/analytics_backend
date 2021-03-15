import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) => createStyles({
    textField: {
        fontSize: '16px',
    },
    bold: {
        fontWeight: 600,
    },
    clickableValue: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
});
