import {createStyles, Theme} from "@mui/material";

export default (theme: Theme) => createStyles({
    dialog: {
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: '100vh',
        left: 0,
        background: '#fff',
        zIndex: 1000,
        transition: '0.35s top',
    },
    openDialog: {
        top: '0',
    },
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
        justifyContent: 'space-between',
        overflowX: 'hidden',
        height: 'calc(100% - 100px)'
    },
    leftSide: {
        width: '40%',
        flex: 'none'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    numberInput: {
        marginRight: '20px'
    },
    marginBottom30: {
        marginBottom: '30px',
    },
    weekTitle: {
        marginBottom: '20px'
    },
    rightSide: {
        width: '55%',
    },
    sectionSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '58px !important'
        },
        marginBottom: '30px',
    },
    typeSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '38px !important'
        },
        marginBottom: '30px',
    },
    selector: {
        width: '500px'
    },
    label: {
        fontSize: '14px',
        marginBottom: 10
    },
    tooltipIcon: {
        position: 'relative',
        top: '5px',
        left: '5px'
    }
});