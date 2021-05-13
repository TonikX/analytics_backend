import {createStyles, Theme, makeStyles} from "@material-ui/core";

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