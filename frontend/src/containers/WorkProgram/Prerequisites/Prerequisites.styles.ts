import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto !important',
        flex: 'none',
        marginBottom: '20px',
        width: 'fit-content'
    },
    list: {
        height: '100%',
    },
    item: {
        borderBottom: '1px solid #ccc',
        padding: '0px 10px',
        display: 'flex',
        alignItems: 'center'
    },
    disableItem: {
        padding: '12px 10px',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    title: {
        width: '50%'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        padding: '10px'
    }
});
