import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    list: {
        height: '300px',
        paddingRight: '20px',
        marginTop: '50px',
    },
    selectedItem: {
        display: 'flex',
        alignItems: 'center'
    },
    dialogContent: {
        height: '450px',
        padding: '10px 24px 20px 24px !important',
    },
    filtersLine: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    searchButton: {
        marginLeft: 'auto',
    },
    input: {
        width: '100%',
        marginRight: 20,
    },
    actions: {
        padding: '15px 24px 20px'
    },
    dialog: {
        padding: 20,
    },
    select: {
        width: '45%',
        marginLeft: 20,
    }
});