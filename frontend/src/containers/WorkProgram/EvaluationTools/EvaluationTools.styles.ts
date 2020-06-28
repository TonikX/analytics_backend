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
    },
    row: {
        display: 'flex',
        minHeight: '50px',
        alignItems: 'center',
        padding: '0px 10px'
    },
    sectionsRow: {
        background: '#f6f6f6',
        flexWrap: "wrap"
    },
    sectionsList: {
        display: "flex",
    },
    sectionChip: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5
    },
    actions: {
        display: 'flex',
        height: 'fit-content',
        marginLeft: 'auto',
        padding: '0px 20px'
    },
    title: {
        width: '30%',
        flex: 'none'
    },
    type: {
        width: '20%',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        flex: 'none'
    },
    min: {
        width: '50px',
        paddingLeft: '10px',
        boxSizing: 'border-box',
    },
    max: {
        width: '60px',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    deadline: {
        width: '10%',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    checkpoint: {
        paddingLeft: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
        width: '110px'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        padding: '10px'
    },
    sectionsTitle: {
        fontWeight: 500,
    },
    // @ts-ignore
    popper: {
        // @ts-ignore
        zIndex: '10000 !important',
    },
    menuPaper: {
        boxShadow: '0px 0px 20px -2px rgba(160, 159, 159, 0.42)'
    },
    menuIcon: {
        marginRight: '10px',
        fill: 'rgba(0, 0, 0, 0.54)'
    }
});