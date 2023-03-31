import {createStyles, Theme} from "@mui/material";

export default (theme: Theme) => createStyles({
    input: {
        width: '550px',
        marginBottom: '30px',
    },
    lastInput: {
        width: '550px',
    },
    selector: {
        width: '550px'
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    link: {
        marginRight: 'auto',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    wrapSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '50px !important'
        },
        marginBottom: '30px',
    }
});