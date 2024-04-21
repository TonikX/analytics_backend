import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    dialogTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '30px',
        width: '550px'
    },
    marginBottom30: {
        marginBottom: '30px'
    },
    link: {
        marginRight: 'auto',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    }
});
