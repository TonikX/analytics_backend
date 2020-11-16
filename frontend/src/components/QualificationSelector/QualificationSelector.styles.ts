import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    marginBottom30: {
        marginBottom: '30px'
    },
    selectorWrap: {
        width: '100%',
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '107px !important'
        }
    },
});