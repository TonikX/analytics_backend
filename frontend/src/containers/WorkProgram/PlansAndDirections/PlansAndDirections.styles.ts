import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 400,
        height: '45px'
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
    }
});