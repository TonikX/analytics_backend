import {createStyles, Theme} from "@material-ui/core";

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
        height: '450px'
    },
    filtersLine: {
        display: 'flex',
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
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});