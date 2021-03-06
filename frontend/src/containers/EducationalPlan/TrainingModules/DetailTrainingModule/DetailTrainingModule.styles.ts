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
    header: {
        background: theme.palette.primary.main,
        '& th': {
            color: '#fff',
            background: theme.palette.primary.main,
            fontWeight: '400',
            fontSize: '14px',
            padding: '0px 10px !important',
        }
    },
    title: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& p': {
            fontSize: '24px',
        }
    },
    hourCell: {
        width: '30px'
    },
    displayFlex: {
        display: 'flex'
    },
    workProgramLink: {
        cursor: 'pointer'
    },
    actions: {
        textAlign: 'end',
        width: '112px',
        '& svg': {
            cursor: 'pointer'
        }
    },
    deleteIcon: {
        marginRight: 5
    },
});