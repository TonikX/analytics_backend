import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    input: {
        width: '550px',
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
    marginBottom30: {
        marginBottom: '30px'
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
    leftSide: {
        width: '50%',
        marginRight: '20px'
    },
    rightSide: {
        width: '50%'
    }
});