import {createStyles} from "@material-ui/core";

export default () => createStyles({
    input: {
        width: '100%',
        marginTop: '20px',
        display: "block",
    },
    content: {
        height: '100%',
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
    singleColumn: {
      width: '70%',
    },
    markTypeSelect: {
        marginTop: '20px',
    },
    fieldLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.8rem',
    },
    optionalRequirements: {
        marginTop: '30px',
    },
    generalProvisionsText: {
        marginTop: '20px',
    },
    datesReadonlyRow: {
        display: "flex",
        justifyContent: 'space-between',
        marginTop: '30px'
    },
    datesReadOnlyLabel: {
        width: '65%',
    },
    datesReadOnlyValue: {
        width: '30%',
    },
    structuralUnit: {
        marginTop: '37px',
    }
});