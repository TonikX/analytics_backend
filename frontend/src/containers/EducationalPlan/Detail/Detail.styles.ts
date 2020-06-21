import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    tableWrap: {
        height: 'calc(100% - 200px)',
        maxHeight: 'calc(100% - 200px)',
    },
    rowModule: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main,
        fontWeight: 500
    },
    rowBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    root: {
        padding: '50px',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    headerTextHoursCount: {
        border: 'none',
        textAlign: 'center'
    },
    actions: {
        textAlign: 'end',
        width: '100px'
    },
    hourCell: {
        width: '30px'
    },
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400'
        }
    },
    title: {
        fontSize: '24px',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    blockRow: {
        background: '#eeeeee',
        '&: div': {
            fontWeight: '500'
        }
    },
    smallAddIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
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
});