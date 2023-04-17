import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    input: {
        width: '550px',
    },
    lastInput: {
        width: '550px',
    },
    dialogContent: {
        padding: '10px 24px 20px 24px !important',
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
    marginBottom30: {
        marginBottom: '30px !important'
    },
    datePicker: {
        width: '100%'
    },
    selectorWrap: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '107px !important'
        }
    },
});