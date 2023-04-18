import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    input: {
        marginBottom: '30px !important',
        width: '550px'
    },
    selector: {
        width: '550px !important',
        marginBottom: '30px !important',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialogContent: {
        padding: '10px 24px 20px 24px !important',
    },
    dialog: {
        padding: 20,
    },
    courseSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '90px !important'
        }
    },
    sectionSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(13px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '57px !important'
        },
        marginBottom: '30px',
    },
    link: {
        marginRight: 'auto',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    }
});