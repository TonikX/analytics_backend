import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export default (theme: Theme) =>createStyles({
    tableWrap: {
        marginBottom: '20px',
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
    tableWrap1: {
        marginBottom: '20px',
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        weight:'1000px',
        '& td': {
            weight:'1000px',
            padding: '5px 10px !important',
            fontSize: '14px'
        },
        '& p': {
            weight:'1000px',
            fontSize: '14px'
        }
    },
    header1: {
        background: theme.palette.primary.main,
        weight:'1000px',
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
            whiteSpace: 'nowrap'
        }
    },
    Btn: {
        width: '250px',
        height: '30px !important',
        marginRight: '20px !important',
        backgroundColor: theme.palette.primary.main,
        color: '#fff !important',
        textDecoration: 'uppercase !important',
        fontSize: '15px !important',
        marginBottom: '20px !important'
    },
    accordionSummary: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
    },
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',

        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px !important',
        marginBottom: '20px !important',
        display: 'flex !important',
        justifyContent: 'space-between !important'
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    field: {
        width: '50%',
        marginBottom: '20px',
    },
    link: {
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
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
    bigRow: {
        '& td': {
            padding: '15px 10px !important'
        }
    }
});