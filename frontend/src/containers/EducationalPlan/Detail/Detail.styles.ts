import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
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
        padding: '20px 50px 20px 50px',
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
        width: '112px',
        '& svg': {
            cursor: 'pointer'
        }
    },
    hourCell: {
        width: '30px'
    },
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important'
        }
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    titleIcon: {
        marginLeft: '10px',
        cursor: 'pointer'
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
    marginRight10: {
        marginRight: 10
    },
    workProgramLink: {
        cursor: 'pointer'
    }
});