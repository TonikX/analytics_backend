import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    avatar: {
        marginLeft: 10,
    },
    rightSide: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    header: {
        zIndex: 1000,
        boxShadow: 'none'
    },
    // @ts-ignore
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
    },
    menuIcon: {
        marginRight: '20px'
    },
    bookmarkIcon: {
        color: '#fff'
    }
});