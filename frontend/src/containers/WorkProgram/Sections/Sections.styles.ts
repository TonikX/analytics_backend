import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    secondStep: {
        height: 'inherit',
    },
    headerCell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cell: {
        border: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center',
    },
    iconWrapper: {
        marginTop: '20px',
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    table: {
        height: '100%',
        overflow: 'hidden',
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
    lastInfo: {
        marginTop: '20px !important',
        marginBottom: '10px !important',
    }
});
