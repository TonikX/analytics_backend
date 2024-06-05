import createStyles from "@mui/styles/createStyles";

export default () => createStyles({
    root: {
        height: 'inherit',
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
        marginBottom: '20px',
    },
    list: {},
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
    header: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },
    helpIcon: {
        marginLeft: '5px',
    }
});
