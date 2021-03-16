import {createStyles, makeStyles, Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        '& svg': {
            fontSize: '1rem',
        },
    },
    doneIcon: {
        color: '#43a047',
        padding: '2px',
    },
    rejectIcon: {
        color: '#c62828',
        padding: '2px',
    },
    buttonDoneContainer: {
        borderRight: '1px solid #E8E8E8',
        width: '28px',
    },
    buttonCloseContainer: {
        paddingLeft: '1px',
    }
}));
