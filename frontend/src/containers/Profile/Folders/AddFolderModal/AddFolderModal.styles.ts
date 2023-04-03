import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    input: {
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
        '& .react-stars': {
            outline: 'none !important'
        }
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    selectorWrap: {
        width: '100%',
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '50px !important'
        }
    },
    label: {
        marginTop: '25px',
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.54)'
    }
});