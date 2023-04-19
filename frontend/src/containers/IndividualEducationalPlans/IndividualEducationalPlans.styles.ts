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
    rootHeader: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: '24px !important',
        lineHeight: '39px !important',
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
    list: {
        width: '100%',
        height: 'calc(100% - 50px)'
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    searchInput: {
        height: '40px',
        minHeight: '40px',
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
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none'
    },
    bigRow: {
        '& td': {
            padding: '15px 10px !important'
        }
    },
    searchWrap: {
        marginLeft: 'auto'
    }
});