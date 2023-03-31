import {createStyles, Theme} from "@mui/material";

export default (theme: Theme) => createStyles({
    bars: {
        '& .Mui-checked': {
            color: '#950020',
        }
    },
    container: {
        display: 'flex'
    },
    side: {
        width: '50%',
        boxSizing: 'border-box',
        '&:first-child': {
            paddingRight: '50px',
        }
    },
    input: {
        width: '100%',
        marginBottom: '20px'
    },
    marginRight: {
        marginRight: '20px'
    },
    datePicker: {
        marginBottom: '20px'
    },
    marginBottom20: {
        marginBottom: '20px'
    },
    textItem: {
        marginBottom: '10px'
    },
    fullWidth: {
        width: '100%'
    },
    selectorWrap: {
        width: '100%',
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6.5px) scale(0.75) !important',
        },
        '& .MuiOutlinedInput-notchedOutline legend': {
            width: '100px !important'
        }
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
    radioGroup: {
        flexDirection: 'row'
    }
});