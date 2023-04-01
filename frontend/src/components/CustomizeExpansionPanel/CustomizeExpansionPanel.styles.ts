import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    expansionPanelRoot: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        border: '1px solid rgba(0, 0, 0, .125)',
        borderBottom: 0,
        boxShadow: 'none',
        margin: '0px !important',
        '&:before': {
            display: 'none',
        },
    },
    expansionPanel: {
        boxShadow: 'none',
        border: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
    },
}))