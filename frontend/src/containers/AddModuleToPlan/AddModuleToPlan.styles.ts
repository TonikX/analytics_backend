import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    addModulesModal: {
        padding: '20px'
    },
    marginTop: {
        marginTop: '20px'
    },
    marginBottom: {
        marginBottom: '20px'
    },
    textItem: {
        marginBottom: '10px'
    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff'
    },
    content: {
        display: 'flex',
        gap: '60px',
        height: 'calc(100% - 130px)'
    },
    contentLeft: {
        flexGrow: 1,
    },
    contentRight: {
        flexGrow: 1,
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px'
    },
    tableWrap: {
        height: 'auto'
    },
    table: {
        height: 'calc(100% - 30px)'
    },
    plansControls: {
        display: 'flex',
        gap: '20px'
    },
}));
