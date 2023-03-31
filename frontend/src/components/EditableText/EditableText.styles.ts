import {Theme} from "@mui/material/styles/createMuiTheme";
import createStyles from '@mui/material/styles/createStyles';

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
    },
    text: {
        display: 'flex',
        alignItems: 'center'
    }
});
