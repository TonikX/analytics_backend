import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
    emailModal: {
        padding: '20px'
    },
    marginTop: {
        marginTop: '20px'
    },
    recipients: {
        marginTop: '10px'
    },
    chip: {
        margin: '5px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
    }
}));
