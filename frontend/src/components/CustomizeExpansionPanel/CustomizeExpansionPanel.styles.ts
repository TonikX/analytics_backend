import {createStyles, makeStyles} from "@mui/styles";

export const useStyles = makeStyles(() => createStyles({
    expansionPanelRoot: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        border: '1px solid rgba(0, 0, 0, .125)',
        borderBottom: 0,
        boxShadow: 'none !important',
        margin: '0px !important',
        '&:before': {
            display: 'none',
        },
    },
}))