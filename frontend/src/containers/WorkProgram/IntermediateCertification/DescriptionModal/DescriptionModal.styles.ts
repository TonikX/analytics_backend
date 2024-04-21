import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '1000 !important'
    },
    nameInput: {
        marginTop: '24px'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        boxSizing: 'border-box',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px',
        width: '550px'
    },
    input: {
        marginBottom: '30px',
        width: '100%'
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    disabledButton: {
        color: '#fff !important'
    },
    dialogContent: {
        display: 'flex',
        padding: '20px 48px',
        overflowX: 'hidden',
        flexDirection: 'column'
    },
    label: {
        fontSize: '14px',
        marginBottom: 10
    },
});
