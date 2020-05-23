import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    avatar: {
        marginLeft: 'auto'
    },
    header: {
        zIndex: 10000
    },
    popper: {
        // @ts-ignore
        zIndex: '10000 !important'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.primary
        }
    }
});