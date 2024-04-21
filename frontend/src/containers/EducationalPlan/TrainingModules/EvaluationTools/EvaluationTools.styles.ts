import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    addIcon: {
        marginTop: '10px !important',
        marginLeft: 'auto !important',
        flex: 'none',
        marginBottom: '20px',
    },
    list: {
        "@media (max-width: 900px)": {
            minWidth: '700px',
        },
        height: '100%',
        minWidth: '800px',
    },
    totalList: {
        marginBottom: '10px'
    },
    item: {
        borderBottom: '1px solid #ccc',
    },
    row: {
        "@media (max-width: 900px)": {
            minWidth: '700px',
        },
        display: 'flex',
        minHeight: '50px',
        alignItems: 'center',
        padding: '0px 10px',
        minWidth: '800px',
        '& p': {
            fontSize: '14px'
        }
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
        flex: 'none'
    },
    type: {
        "@media (max-width: 900px)": {
            width: '15%',
        },
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
    eyeIcon: {
        cursor: 'pointer',
        marginLeft: 'auto'
    },
    extraPoint: {
        justifyContent: 'flex-end',
        marginLeft: '0px'
    }
});
