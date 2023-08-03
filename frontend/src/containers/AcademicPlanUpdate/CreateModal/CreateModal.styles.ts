import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    input: {
        width: '550px',
        marginBottom: '30px !important',
    },
    dialogContent: {
        padding: '10px 24px 20px 24px !important',
    },
    specializationSelector: {
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
    label: {
        fontSize: '14px',
        marginBottom: 10
    },
    datePicker: {
        width: '100%',
        marginBottom: '30px',
    },
    marginBottom20: {
        marginBottom: '20px',
    }
});