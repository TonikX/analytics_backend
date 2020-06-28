import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    container: {
        display: 'flex'
    },
    side: {
        width: '50%',
        paddingRight: '50px',
        boxSizing: 'border-box'
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
    }
});