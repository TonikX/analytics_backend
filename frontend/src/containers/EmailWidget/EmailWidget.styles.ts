import {createStyles, makeStyles} from "@mui/material";

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
