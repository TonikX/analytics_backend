import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialogContent: {
        padding: '10px 24px 20px 24px !important',
    },
    dialog: {
        boxSizing: 'border-box',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px',
        width: '100%'
    },
    //@ts-ignore
    selector: {
        //@ts-ignore
        zIndex: '10001 !important'
    },
    selectorWrap: {
        width: '550px',
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '90px !important'
        }
    },
});