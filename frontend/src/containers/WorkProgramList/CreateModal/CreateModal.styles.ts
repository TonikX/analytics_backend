import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    input: {
        width: '550px',
        marginBottom: '30px',
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
    }
});