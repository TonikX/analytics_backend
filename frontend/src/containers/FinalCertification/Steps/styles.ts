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
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    inputWrapperRelative: {
        position: 'relative',
    },
    tooltipIcon: {
        position: 'relative',
        top: '5px',
        left: '5px',
        cursor: 'pointer'
    },
    tooltipIconAbsolute: {
        top: '50%',
        position: 'absolute',
        transform: 'translate(50%, -4px)',
        left: '100%',
        cursor: 'pointer'
    },
    tooltipTop: {
        top: '20px',
    },
    editorsList: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    editorItem: {
        marginRight: '5px',
        marginBottom: '10px'
    },
    editorTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: 10
    },
    dialog: {
        padding: 40,
    },
    addEditorButton: {
        padding: '0px !important'
    },

    editorTitleRow: {
        marginTop: '30px'
    },
    preWrap: {
        whiteSpace: 'pre-wrap'
    }
});
