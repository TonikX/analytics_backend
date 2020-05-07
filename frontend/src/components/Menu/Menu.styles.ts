import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

export default (theme: Theme) => createStyles({
    drawerPaper: {
        width: 250,
        //@ts-ignore
        height: `calc(100vh - ${theme.appBarHeight})`,
        marginTop: 64,
    },
    link: {
        display: 'flex',
        textDecoration: 'none',
        alignItems: 'center',
        color: theme.palette.text.primary,
        width: '100%',
        padding: '6px 16px'
    },
    listItem: {
        padding: 0
    }
});