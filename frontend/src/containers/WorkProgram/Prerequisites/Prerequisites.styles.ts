import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    addIcon: {
        marginTop: '10px',
        flex: 'none',
        marginBottom: '20px',
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
    },
    buttonsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '10px'
    }
});
