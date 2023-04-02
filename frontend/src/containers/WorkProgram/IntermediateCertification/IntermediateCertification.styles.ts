import {createStyles, Theme} from "@mui/material";

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
        marginBottom: '20px',
    },
    item: {
        borderBottom: '1px solid #ccc',
    },
    eyeIcon: {
        cursor: "pointer",
        marginLeft: 'auto'
    },
    row: {
        "@media (max-width: 900px)": {
            minWidth: '600px',
        },
        display: 'flex',
        minHeight: '50px',
        alignItems: 'center',
        padding: '0px 10px',
        minWidth: '680px',
        '& p': {
            fontSize: '14px'
        }
    },
    list: {
        "@media (max-width: 900px)": {
            minWidth: '600px',
        },
        height: '100%',
        minWidth: '680px',
    },
    totalList: {
        marginBottom: '10px'
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
        "@media (max-width: 900px)": {
            width: '20%',
        },
        width: '30%',
        flex: 'none',
        overflowWrap: 'anywhere',
    },
    type: {
        "@media (max-width: 900px)": {
            width: '15%',
        },
        width: '30%',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        flex: 'none',
        overflowWrap: 'anywhere',
    },
    min: {
        width: '100px',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    max: {
        width: '100px',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    semester: {
        paddingLeft: '10px',
        width: '50px',
        textAlign: 'center',
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
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
    },
    lastInfo: {
        marginTop: '20px'
    }
});