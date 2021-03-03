import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        height: 'inherit',
        //minHeight: '500px',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column'
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    addIcon: {
        marginTop: '10px',
        marginLeft: 'auto',
        flex: 'none',
        height: '40px',
        width: '40px',
        marginBottom: '20px',
    },
    list: {
        //height: '100%',
        // height: '500px',
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