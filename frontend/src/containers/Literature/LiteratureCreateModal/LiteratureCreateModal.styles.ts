import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    // @ts-ignore
    root: {
        zIndex: '13000 !important',
    },
    input: {
        width: '550px',
        marginBottom: '30px',
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
});