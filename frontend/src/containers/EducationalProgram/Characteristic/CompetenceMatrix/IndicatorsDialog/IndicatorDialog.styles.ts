import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    dialog: {
        padding: 20,
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    marginBottom10: {
        marginBottom: '10px'
    },
    actions: {
        marginTop: '30px'
    },
    title: {
        padding: 0,
        marginBottom: '30px'
    },
    chipsList: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    chip: {
        marginRight: '10px !important',
        marginBottom: '10px !important',
        '& span': {
            whiteSpace: 'initial !important'
        }
    }
}))
