import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto',
        flex: 'none',
    },
    list: {
        height: '100%',
    },
    item: {
        borderBottom: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    title: {
        display: "flex",
        alignItems: 'center'
    },
});