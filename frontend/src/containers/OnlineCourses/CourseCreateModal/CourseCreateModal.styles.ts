import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    input: {
        width: '490px',
        marginBottom: '30px',
        marginLeft: '30px',
        marginRight: '30px',
    },
    lastInput: {
        width: '550px',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        width: '900px',
        padding: 20,
    },
    addIcon: {
        position: 'absolute',
        top: '5px',
        left: '536px',
    },
    inputAddWrapper: {
        position: 'relative',
    }
});