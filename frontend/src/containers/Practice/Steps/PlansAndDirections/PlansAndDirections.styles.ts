import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    header: {
        background: `${theme.palette.primary.main} !important`,
        color: '#fff !important',
        fontWeight: '400 !important',
        height: '45px !important'
    },
    cellLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    root: {
        height: '100%'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    content: {
        height: '600px',
    },
    h1: {
        marginBottom: '30px !important'
    }
});
