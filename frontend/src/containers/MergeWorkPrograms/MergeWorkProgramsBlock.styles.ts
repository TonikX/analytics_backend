import {createStyles, makeStyles} from "@mui/material";

export const useStyles = makeStyles(() => createStyles({
    root: {
        display: 'flex',
        gap: '0 10px',
    },
    controls: {
        width: '80%',
        display: 'flex',
        gap: '0 15px',
    },
    itemTitle: {
        fontSize: '16px',
        marginBottom: '6px'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        background: 'white',
        padding: '24px',
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    }
}));
