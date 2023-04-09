import {Theme} from "@mui/material";
import createStyles from "@mui/styles/createStyles";

export default (theme: Theme) => createStyles({
    root: {
        padding: '20px 50px 20px 50px',
        boxShadow: 'none',
        borderRadius: '0px',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    },
    titleWrap: {
        marginBottom: '10px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: '24px !important',
        marginRight: '10px !important',
    },
    switch: {
        marginRight: 'auto !important',
    },
    tableWrap: {
        height: 'calc(100% - 60px)'
    },
    addIcon: {
        marginLeft: 'auto !important',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    headerCell: {
        background: `${theme.palette.primary.main} !important`,
        color: '#fff !important'
    },
    actions: {
        width: '100px'
    }
});
