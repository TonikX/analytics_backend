import {createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    tableHeading: {
        background: theme.palette.primary.main,
        color: 'white',
    },
    rowWithPadding: {
        paddingLeft: '50px !important',
    },
    competenceHeader: {
        display: 'flex',
        justifyContent: 'space-between',

    },
    competenceHeaderCell: {
        flexGrow: 1,
    }
}));
