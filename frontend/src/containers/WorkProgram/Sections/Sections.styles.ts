import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    secondStep: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    headerCell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto',
        flex: 'none',
    },
    table: {
        height: '100%',
        flex: 1,
        '& th': {
            padding: '3px !important',
        },
        '& td': {
            padding: '3px !important'
        }
    },
    smallInput: {
        width: '70px'
    },
    errorText: {
        color: theme.palette.error.main
    },
    totalHourError: {
        maxWidth: '500px',
        marginTop: '10px',
        textAlign: 'left',
        background: theme.palette.error.main,
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)',
        color: 'white',
        padding: '10px',
        marginLeft: 'auto'
    },
});