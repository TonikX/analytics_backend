import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px !important',
        alignItems: 'center',
        marginBottom: '20px',
        display: 'flex',
    },
    showOnlyMy: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px'
    },
    list: {
        width: '100%',
        height: 'calc(100% - 50px)'
    },
    tableWrap: {
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        '& td': {
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            fontSize: '14px'
        }
    },
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
            whiteSpace: 'nowrap'
        }
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        padding: '0px 20px'
    },
    searchInput: {
        height: '40px',
        marginLeft: 'auto !important'
    },
    addIcon: {
        marginLeft: 'auto',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    // @ts-ignore
    popper: {
        // @ts-ignore
        zIndex: '10000 !important',
    },
    menuPaper: {
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)'
    },
    menuIcon: {
        marginRight: '10px',
        fill: 'rgba(0, 0, 0, 0.54)'
    },
    menuLinkItem: {
        padding: '0px !important',
        '&>a': {
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(51, 51, 51) !important',
            textDecoration: 'none'
        }
    },
    settingsButton: {
        marginLeft: 'auto'
    },
    link: {
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    },
    statuses: {
        display: 'flex',
        marginBottom: '10px',
    },
    cellStatus: {
        borderLeft: '5px solid',
        '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
        }
    },
});