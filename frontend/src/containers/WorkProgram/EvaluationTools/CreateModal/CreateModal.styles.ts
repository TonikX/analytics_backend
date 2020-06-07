import {createStyles, Theme} from "@material-ui/core";

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
        padding: 48
    },
    leftSide: {
        width: '40%',
        maxWidth: '500px',
        flex: 'none'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    numberInput: {
        width: '230px'
    },
    marginBottom30: {
        marginBottom: '30px',
    },
    weekTitle: {
        marginBottom: '50px'
    },
    rightSide: {
        width: '100%',
        marginLeft: '100px'
    },
    sectionSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(11px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '52px !important'
        },
        marginBottom: '30px',
    },
    typeSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(11px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '28px !important'
        },
        marginBottom: '30px',
    },
    selector: {
        width: '500px'
    },
    label: {
        fontSize: '14px',
        marginBottom: 10
    }
});