import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        background: '#fff',
        minHeight: 'calc(100% - 44px)',
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px !important',
        display: 'flex',
        justifyContent: 'space-between',
    },
    notificationItem: {
        marginBottom: '10px !important',
        padding: '15px',
        border: '1px solid #ccc',
    },
    notificationItemLink: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    },
    roundItem: {
        display: 'flex',
        marginBottom: '10px !important',
        alignItems: 'center'
    },
    round: {
        display: 'block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '5px !important'
    },
    roundText: {
        marginRight: '15px !important'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
}));
