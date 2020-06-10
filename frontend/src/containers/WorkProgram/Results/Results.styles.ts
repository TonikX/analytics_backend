import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    addIcon: {
        marginTop: '30px',
        marginLeft: 'auto',
        flex: 'none',
    },
    list: {
        height: '100%',
    },
    item: {
        borderBottom: '1px solid #ccc',
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
    level: {

    },
    header: {
        background: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        padding: '10px'
    },
    row: {
        display: 'flex',
        minHeight: '50px',
        alignItems: 'center',
        padding: '0px 10px'
    },
    evaluationToolRow: {
        background: '#f6f6f6',
        flexWrap: "wrap"
    },
    evaluationToolTitle: {
        fontWeight: 500,
    },
    evaluationToolChip: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5
    },
});