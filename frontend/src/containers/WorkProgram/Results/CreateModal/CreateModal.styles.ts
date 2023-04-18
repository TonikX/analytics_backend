import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    dialogTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px',
        width: '550px'
    },
    marginBottom30: {
        marginBottom: '30px !important'
    },
    evaluationToolSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(11px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '120px !important'
        },
        marginTop: '30px !important',
    },
    selector: {
        width: '550px !important'
    },
    link: {
        marginRight: 'auto',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    }
});