import {createStyles} from "@material-ui/core";

export default () => createStyles({
    selectorWrap: {
        width: '500px',
        marginTop: '30px',
        display: "block",
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '100px !important'
        }
    },
});