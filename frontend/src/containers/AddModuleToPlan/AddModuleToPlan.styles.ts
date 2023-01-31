import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    addModulesModal: {
        padding: '20px'
    },
    marginTop: {
        marginTop: '20px'
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
        gap: '20px',
        height: 'calc(100% - 62px)'
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
    selectModule: {
        // background: 'red'
    },
    tableWrap: {
        height: 'auto'
    },
}));
