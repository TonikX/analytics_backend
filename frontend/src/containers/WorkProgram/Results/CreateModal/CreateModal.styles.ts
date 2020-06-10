import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px',
        width: '550px'
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    evaluationToolSelector: {
        '& .MuiInputLabel-shrink': {
            transform: 'translate(11px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '140px !important'
        },
        marginTop: '30px',
    },
    selector: {
        width: '550px'
    },
});