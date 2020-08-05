import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 400
    },
    cellLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
});