import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    //@ts-ignore
    root: {
        //@ts-ignore
        zIndex: '10000 !important'
    },
    dialog: {
        boxSizing: 'border-box',
    },
    actions: {
        padding: '15px 24px 20px'
    },
    marginBottom30: {
        marginBottom: '30px',
        width: '100%'
    },
    searchRow: {
        display: 'flex',
        marginTop: '20px',
    },
    searchInputCode: {
        maxWidth: '110px',
        marginRight: '20px !important'
    },
    searchInputText: {
        flex: 1,
    },
    searchButton: {
        marginLeft: '20px !important'
    }
});