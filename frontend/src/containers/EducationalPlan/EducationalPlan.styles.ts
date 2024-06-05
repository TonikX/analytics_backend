import createStyles from "@mui/styles/createStyles";
import {Theme} from "@mui/material";

export default (theme: Theme) => createStyles({
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
        }
    },
    headerCell: {
        display: 'flex',
        alignItems: 'center'
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
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    titleWrap: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '24px !important',
        lineHeight: '39px !important',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
    },
    searchInput: {
        height: '40px',
        minHeight: '40px'
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
    marginRight: {
        marginRight: 20
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
        },
        '&>div': {
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            color: 'rgb(51, 51, 51) !important',
            textDecoration: 'none'
        }
    },
    displayFlex: {
        display: 'flex',
    },
    headerCellTitle: {
        textAlign: 'center',
        lineHeight: '1.2',
        display: 'flex',
        alignItems: 'center'
    }
});
