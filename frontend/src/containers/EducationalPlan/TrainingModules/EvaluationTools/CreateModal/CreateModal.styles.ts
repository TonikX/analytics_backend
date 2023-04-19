import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

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
        marginTop: '24px !important'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    radioGroup: {
        display: 'flex',
        //@ts-ignore
        flexDirection: 'row !important',
        marginBottom: '30px !important',
        width: '550px'
    },
    input: {
        marginBottom: '30px !important',
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
        padding: '80px 48px 20px 48px !important',
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
        marginRight: '20px !important'
    },
    marginBottom30: {
        marginBottom: '30px !important',
    },
    weekTitle: {
        marginBottom: '20px !important'
    },
    rightSide: {
        width: '55%',
        height: "calc(100vh - 280px) !important",
        '& .ck-content': {
            height: "calc(100vh - 280px) !important",
        }
    },
    sectionSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '58px !important'
        },
        marginBottom: '30px !important',
    },
    typeSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '38px !important'
        },
        marginBottom: '30px !important',
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