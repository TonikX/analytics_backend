import {createStyles, Theme} from "@material-ui/core";

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
        fontSize: '24px',
        marginRight: '10px',
    },
    switch: {
        marginRight: 'auto',
    },
    tableWrap: {
        height: 'calc(100% - 60px)'
    },
    addIcon: {
        marginLeft: 'auto',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff'
    },
    actions: {
        width: '100px'
    }
});
