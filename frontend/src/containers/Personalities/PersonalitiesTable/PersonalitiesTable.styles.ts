import {createStyles, Theme, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        borderRadius: '0px',
    },
    tableWrap: {
        height: 'calc(100% - 60px)',
        maxheight: 'calc(100% - 60px)',
        '& td': {
            padding: '18px 10px !important',
            fontSize: '14px',
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
            padding: '10px 10px !important',
            whiteSpace: 'nowrap'
        }
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    courseList: {
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
    link: {
        width: "400px",
        '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    },
    role: {
        background: '#0074DE',
        color: 'white',
        width: 'fit-content',
        borderRadius: '4px',
        padding: '2px 6px',
        marginRight: '6px',
        marginBottom: '3px',
        marginTop: '3px'
    },
    groups: {
        display: 'flex',
        width: "400px",
        flexFlow: "row wrap"
    }
}));