import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
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
    status: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
        cursor: 'pointer'
    },
    statusPoint: {
        marginRight: '5px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'red'
    },
    cellStatus: {
        borderLeft: '5px solid'
    }
});