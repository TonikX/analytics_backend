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
        width: '550px',
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
        width: '50%',
        marginLeft: '30px',
    },
    markTypeSelect: {
        marginTop: '20px',
    },
    fieldLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.8rem',
    },
    optionalRequirements: {
        margin: '30px 0 0 10px',
    }
});