import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

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
        flexBasis: '45%'
    },
    contentRight: {
        flexGrow: 1,
        flexBasis: '55%'
    },
    selectAll: {
        height: '40px',
    },
    blockSelector: {
        width: '40%'
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
        gap: '20px',
        alignItems: 'center',
    },
    chip: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        maxHeight: '74px',
        overflowY: 'auto'
    },
    planSelect: {
        flexGrow: 1,
        height: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center'
    },
    upperContent: {
        display: 'flex',
        gap: '60px',
    },
    upperContentLeft: {
        flexGrow: 1,
        flexBasis: '45%'
    },
    upperContentRight: {
        flexGrow: 1,
        flexBasis: '55%'
    }
}));
