import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export default makeStyles((theme: Theme): any => createStyles({
    //@ts-ignore
    root: {
        zIndex: '10000 !important'
    },
    dialog: {
        boxSizing: 'border-box',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px',
        width: '100%'
    },
}));