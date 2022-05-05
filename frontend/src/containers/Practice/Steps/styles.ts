import {createStyles} from "@material-ui/core";

export default () => createStyles({
    input: {
        width: '100%',
        marginTop: '30px',
        display: "block",
    },
    content: {
        height: '600px',
    },
    selectorWrap: {
        width: '100%',
        marginTop: '30px',
        display: "block",
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '100px !important'
        }
    },
    columns: {
        display: "flex",
    },
    leftColumn: {
        width: '50%',
    },
    rightColumn: {
        marginLeft: '30px',
        width: '50%',
    }
});