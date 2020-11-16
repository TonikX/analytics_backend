import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    drawerPaper: {
        width: 250,
        marginTop: 64,
        borderRight: '1px solid #f4f4f4',
        zIndex: 100,
        height: 'calc(100% - 64px)',
        backgroundColor: '#f4f4f4'
    },
    divider: {
        backgroundColor: '#f4f4f4'
    },
    selectedMenuItem: {
        color: `${theme.palette.secondary.main} !important`,
        backgroundColor: 'transparent !important',
        borderLeft: `4px solid ${theme.palette.secondary.main} !important`,
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f4f4f4 !important'
        }
    },
    menuList: {
        padding: 0
    },
    // @ts-ignore
    menuItem: {
        // @ts-ignore
        whiteSpace: 'normal !important',
        transition: 'all 0.2s',
        margin: '5px 2px',
        padding: '10px 16px',
        color: theme.palette.text.primary,
        borderLeft: `4px solid transparent`,
        '&:hover': {
            backgroundColor: '#d2d2d2 !important',
            '& svg': {
                color: theme.palette.secondary.main,
            },
        }
    },
    link: {
        textDecoration: 'none'
    },
    icon: {
        width: 30,
        marginRight: 10
    }
});