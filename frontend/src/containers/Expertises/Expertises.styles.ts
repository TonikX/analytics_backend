import {createStyles, Theme} from "@material-ui/core";

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
    titleWrap: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '24px',
    },
    titleCell: {
        width: '40%',
        display: 'flex',
        alignItems: 'center'
    },
    expertiseCell: {
        width: '40%',
        display: 'flex',
        alignItems: 'center'
    },
    list: {
        width: '100%',
        height: 'calc(100% - 50px)'
    },
    tableWrap: {
        height: 'calc(100% - 60px)'
    },
    listItem: {
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #ccc',
        alignItems: 'center',
        padding: '0 0 0 20px',
        boxSizing: 'border-box',
        minHeight: '50px'
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
    header: {
        background: theme.palette.primary.main,
        color: '#fff'
    },
    marginRight: {
        marginRight: 20
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
    linkCell: {
        padding: '0 !important',
        '& a': {
            color: 'rgb(51, 51, 51) !important'
        }
    }
});